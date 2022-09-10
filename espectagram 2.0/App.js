import { StatusBar } from 'expo-status-bar';
import { createSwichNavigator, createAppContainer} from "react-navigation";

import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import DashboardScreen from "./screens/DashboardScreen";

import config from './config';
import * as firebase from "firebase";

if (!firebase.apps.lenght) {
  firebase.initialize(config);
} else {
  firebase.app();
}

const AppSwitchNavigator = createSwichNavigator({
  LoginScreen: LoginScreen,
  LoadingScreen: LoadingScreen,
  DashboardScreen: DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function app() {
  return(
    <AppNavigator/>
  )
}
