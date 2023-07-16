import React from 'react';
import {Headlines} from '../types/headlines';
import {FlexRow} from '../utils/FlexUtil';
import {Image, Text, View} from 'react-native';
import styled from 'styled-components/native';

const Container = styled(FlexRow)`
  margin-bottom: 10px;
  background-color: white;
  margin-right: 10px;
  margin-left: 10px;
  padding: 8px;
  elevation: 1;
  border-radius: 8px;
`;

const NewsListItem = ({headline}: Headlines) => {
  return (
    <Container justify={'flex-start'} align={'center'}>
      <View style={{borderRadius: 10, overflow: 'hidden'}}>
        <Image
          style={{height: 100, width: 100}}
          source={{uri: 'https://picsum.photos/200'}}
        />
      </View>

      <Text style={{marginLeft: 10}}>{headline}</Text>
    </Container>
  );
};

export default NewsListItem;
