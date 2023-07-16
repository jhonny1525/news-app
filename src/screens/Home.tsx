import React from 'react';
import {Text, View} from 'react-native';
import useHeadlines from '../api/useHeadlines';
import {FlashList} from '@shopify/flash-list';
import NewsListItem from '../components/NewsListItem';

const Home = () => {
  const {data, isLoading, refetch, isRefetching} = useHeadlines();
  console.log('Data', isRefetching, isLoading, data);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <FlashList
      onRefresh={() => refetch()}
      refreshing={isRefetching}
      renderItem={({item}) => {
        return <NewsListItem {...item} />;
      }}
      estimatedItemSize={50}
      data={data}
    />
  );
};

export default Home;
