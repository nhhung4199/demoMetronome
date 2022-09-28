import ImagePicker from 'react-native-image-crop-picker';
import {checkCamera, checkPhoto} from './permistion';
const MAX_WIDTH = 800;
const MAX_HEIGHT = 500;
const ImageUploaded = {
  pickImage: async index => {
    try {
      let localPath;
      if (index === 2) {
        const cameraPermission = await checkCamera();
        if (cameraPermission) {
          localPath = await ImageUploaded.chooseImageFromCamera();
        }
      } else if (index === 1) {
        const photoPermission = await checkPhoto();
        if (photoPermission) {
          localPath = await ImageUploaded.chooseImageFromGallery();
        }
      }

      if (localPath) {
        const uri = await ImageUploaded.uploader(localPath);
        return uri;
      }
    } catch (err) {
      return null;
    }
  },

  chooseImageFromCamera: () =>
    ImagePicker.openCamera({
      width: MAX_WIDTH,
      height: MAX_HEIGHT,
      compressImageMaxWidth: MAX_WIDTH,
      compressImageMaxHeight: MAX_HEIGHT,
      waitAnimationEnd: true,
      freeStyleCropEnabled: true,
      // includeBase64: true,
      // forceJpg: true,
      cropping: true,
    }),

  chooseImageFromGallery: () =>
    ImagePicker.openPicker({
      width: MAX_WIDTH,
      height: MAX_HEIGHT,
      compressImageMaxWidth: MAX_WIDTH,
      compressImageMaxHeight: MAX_HEIGHT,
      // compressImageQuality: 100,
      waitAnimationEnd: true,
      // includeBase64: true,
      // forceJpg: true,
      cropping: true,
      mediaType: 'photo',
    }),

  uploader: async localPath => {
    const timeStamp = new Date().getTime();
    const formatImage: any = {
      uri: localPath.path,
      name: `${timeStamp}.${'image/jpeg'}`,
      type: 'image/jpeg',
    };
    const formData = new FormData();
    formData.append('file', formatImage);
    //     const uri: any = await uploadImage(formData);
    //     if (!uri) {
    //       return null;
    //     }

    return localPath.path;
  },
};
export default ImageUploaded;
