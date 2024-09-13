import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens'; // Импортируем screens

enableScreens(); // Активируем screens для оптимизации

AppRegistry.registerComponent(appName, () => App);
