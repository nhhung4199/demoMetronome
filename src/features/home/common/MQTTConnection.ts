import {AsyncStorage} from 'react-native';
import Paho from 'react-native-paho-mqtt';
import uuid from 'react-native-uuid';
import init from 'react_native_mqtt';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const defaultConnectOption = {
  reconnect: false,
  cleanSession: true,
  mqttVersion: 3,
  keepAliveInterval: 60,
  timeout: 60,
};

export default class MQTTConnection {
  mqtt: any;
  QOS: any;
  RETAIN: any;
  onMQTTMessageDelivered: any;
  onMQTTMessageArrived: any;
  onMQTTLost: any;
  onMQTTConnect: any;
  constructor() {
    this.QOS = 0;
    this.mqtt = null;
    this.RETAIN = true;
  }
  connect(host, port, options?: any) {
    if (options) {
      this.QOS = options.qos;
      this.RETAIN = options.retain;
    }
    let currentTime = +new Date();
    let clientID = currentTime + uuid.v1().toString();
    clientID = clientID.slice(0, 23);
    console.log('clientID', clientID);
    this.mqtt = new Paho.Client({
      uri: 'ws://iot.eclipse.org:80/ws',
      clientId: clientID,
    });
    this.mqtt.onConnectionLost = res => {
      this.onMQTTLost;
    };
    this.mqtt.onMessageArrived = message => {
      this.onMQTTMessageArrived(message);
    };
    this.mqtt.onMessageDelivered = message => {
      this.onMQTTMessageDelivered(message);
    };
    const connectOptions = options ? options : defaultConnectOption;
    this.mqtt.connect({
      onSuccess: this.onMQTTConnect,
      onFailure: this.onMQTTLost,
      ...connectOptions,
    });
  }
  onMQTTSuccess = () => {
    this.onMQTTConnect();
  };
  onMQTTFailure = () => {
    this.onMQTTLost();
  };
  subscribeChannel(channel) {
    if (!this.mqtt || !this.mqtt.isConnected()) {
      return;
    }
    this.mqtt.subscribe(channel, this.QOS);
  }
  unsubscribeChannel(channel) {
    if (!this.mqtt || !this.mqtt.isConnected()) {
      return;
    }
    this.mqtt.unsubscribe(channel);
  }
  send(channel: string, payload) {
    if (!this.mqtt || !this.mqtt.isConnected()) {
      return;
    }
    if (!channel || !payload) {
      return false;
    }
    this.mqtt.publish(channel, payload, this.QOS, this.RETAIN);
  }
  close() {
    this.mqtt && this.mqtt.disconnect();
    this.mqtt = null;
  }
}
MQTTConnection.prototype.onMQTTConnect = null;
MQTTConnection.prototype.onMQTTLost = null;
MQTTConnection.prototype.onMQTTMessageArrived = null;
MQTTConnection.prototype.onMQTTMessageDelivered = null;
