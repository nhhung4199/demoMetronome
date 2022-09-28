import {CommonActions, StackActions} from '@react-navigation/native';
import React from 'react';
import {APP_ROUTE} from './config/routes';

export const navigationRef: any = React.createRef();
// export const navigationRef2 = createNavigationContainerRef();

// export function navigateRoot(name, params = {}) {
//   navigationRef2.
// }
export function navigate(name: string, params = {}) {
  navigationRef.current.navigate(name, params);
}
export function push(name: string, params?: any) {
  navigationRef.current.dispatch(StackActions.push(name, params));
}
export function goBack(n?: number) {
  if (n) {
    navigationRef.current.dispatch(StackActions.pop(n));
  } else {
    navigationRef.current.goBack();
  }
}

export function navigateReplace(name: string, params: any) {
  navigationRef.current.dispatch(StackActions.replace(name, params));
}

export function reset(name: string) {
  navigationRef.current.dispatch({
    ...CommonActions.reset({
      index: 1,
      routes: [{name: name || APP_ROUTE.MAIN_TAB}],
    }),
  });
}

export function navigateReset(name: string, params?: any) {
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name, params}],
    }),
  );
}
export function popToTop() {
  navigationRef.current.dispatch(StackActions.popToTop());
}
