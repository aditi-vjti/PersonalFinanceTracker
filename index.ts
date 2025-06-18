import { AppRegistry } from 'react-native';
import App from './App';  // Import your App component
const { name: appName } = require('./app.json');

AppRegistry.registerComponent(appName, () => App);  // Register your app component with the React Native runtime
