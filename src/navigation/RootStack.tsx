import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import React from 'react';
import Home from '../screens/Home';

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{title: 'Home'}} name={'Home'} component={Home} />
    </Stack.Navigator>
  );
};

export default RootStack;
