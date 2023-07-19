import * as React from 'react';
import ApplicationWrappers from './ApplicationWrappers';
import SQLite from 'react-native-sqlite-storage';
import BackgroundService from 'react-native-background-actions';
import {useEffect} from 'react';
// @ts-ignore
import BackgroundTimer from 'react-native-background-timer';
import {fetchAndStoreHeadlines} from './src/api/useHeadlines';
SQLite.enablePromise(true);

import {LogBox} from 'react-native';
console.disableYellowBox = true;
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const options = {
  taskName: 'Headlines',
  taskTitle: 'Updating Headlines',
  taskDesc: '',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#facb51',
  linkingURI: '', // See Deep Linking for more info
  parameters: {
    delay: 600000,
  },
};

const veryIntensiveTask = async () => {
  await new Promise(async resolve => {
    await fetchAndStoreHeadlines();
    resolve(true);
  });
};

function App() {
  useEffect(() => {
    const startBackgroundTask = async () => {
      try {
        BackgroundTimer.runBackgroundTimer(async () => {
          await BackgroundService.start(veryIntensiveTask, options);
          await BackgroundService.updateNotification({
            taskDesc: 'Updating Headlines',
          });
          console.log('Background task has been started');
        }, 100000);
      } catch (e) {
        console.log('Error starting background task:', e);
      }
    };
    startBackgroundTask();
  }, []);

  return <ApplicationWrappers />;
}

export default App;
