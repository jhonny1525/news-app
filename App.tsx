import * as React from 'react';
import ApplicationWrappers from './ApplicationWrappers';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

function App() {
  return <ApplicationWrappers />;
}

export default App;
