import React, {useEffect, useState} from 'react';
import {LayoutAnimation, Platform, Text, UIManager} from 'react-native';
import useHeadlines from '../api/useHeadlines';
import {FlashList} from '@shopify/flash-list';
import NewsListItem from '../components/NewsListItem';
import {getDBConnection, pinItem} from '../sqlite/datastore';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Home = () => {
  const {data, isLoading, refetch, isRefetching} = useHeadlines();
  const [sortedData, setSortedData] = useState<any[]>([]);

  const pin = async (id: any, index: number) => {
    const db = await getDBConnection();
    await pinItem(db, id);
    LayoutAnimation.configureNext({
      duration: 1000,
      create: {type: 'linear', property: 'opacity'},
      update: {type: 'linear', property: 'scaleX'},
      delete: {type: 'linear', property: 'opacity'},
    });
    setSortedData((prevData: any) => {
      const d = [...prevData];
      d[index].pinned = 1;
      return d?.sort((a, b) => b.pinned - a.pinned);
    });
  };

  useEffect(() => {
    setSortedData(
      [...(data || []), ...sortedData]?.sort((a, b) => b.pinned - a.pinned) ||
        []
    );
  }, [data]);

  useEffect(() => {
    setSortedData(sortedData?.sort((a, b) => b.pinned - a.pinned) || []);
  }, [sortedData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //refetch();
    }, 10000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [refetch]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <FlashList
      onRefresh={() => refetch()}
      refreshing={isRefetching || isLoading}
      extraData={sortedData}
      renderItem={({item, index}) => {
        return <NewsListItem index={index} pin={pin} {...item} />;
      }}
      estimatedItemSize={100}
      data={sortedData}
    />
  );
};

export default Home;
