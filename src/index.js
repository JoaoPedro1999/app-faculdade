import React from "react";
import CodePush from "react-native-code-push";
import { Provider } from "react-redux";
import "./config/StatusBarConfig";
import store from "./store";
import App from "./App";
import { Toast } from "react-native-redux-toast";

const Root = () => (
  <Provider store={store}>
    <>
      <Toast />
      <App />
    </>
  </Provider>
);

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(Root);
