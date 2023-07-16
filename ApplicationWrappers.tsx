import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryCache = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
    },
  },
});

const ApplicationWrappers = () => {
  return (
    <QueryClientProvider client={queryCache}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default ApplicationWrappers;
