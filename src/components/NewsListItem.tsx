import React, {useRef} from 'react';
import {Headlines} from '../types/headlines';
import {FlexRow} from '../utils/FlexUtil';
import {TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';
// @ts-ignore
import Swipeable from 'react-native-swipeable';

const Container = styled(FlexRow)`
  margin-bottom: 10px;
  background-color: white;
  margin-right: 10px;
  margin-left: 10px;
  padding: 8px;
  elevation: 1;
  border-radius: 8px;
`;

const PinButton = styled(TouchableHighlight)`
  height: 100px;
  width: 100px;
  background-color: lightblue;
  justify-content: center;
  align-items: center;
`;

const PinText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 22px;
`;

const ThumbnailContainer = styled.View`
  border-radius: 10px;
  overflow: hidden;
  flex: 1;
`;

const ThumbNailImage = styled.Image`
  height: 100px;
  width: 100px;
`;

const PinIconImage = styled.Image`
  height: 25px;
  width: 25px;
  flex: 1;
`;

const HeadlineText = styled.Text`
  flex: 3;
  margin-left: 10px;
`;
const NewsListItem = ({
  headline,
  icon,
  id,
  pinned,
  pin,
  index,
}: Headlines & {pin: any; index: number}) => {
  const swiperRef = useRef<any>();
  const pinPressHandler = async () => {
    await pin(id, index);
    swiperRef.current.recenter();
  };

  const rightButtons = [
    <PinButton
      onPress={async () => {
        pinPressHandler();
      }}>
      <PinText>Pin</PinText>
    </PinButton>,
  ];

  return (
    <Swipeable
      onRef={(ref: any) => {
        swiperRef.current = ref;
      }}
      rightButtons={rightButtons}>
      <Container justify={'flex-start'} align={'center'}>
        <ThumbnailContainer>
          <ThumbNailImage resizeMode={'cover'} source={{uri: icon}} />
        </ThumbnailContainer>

        <HeadlineText>{headline}</HeadlineText>
        {pinned ? (
          <PinIconImage
            resizeMode={'contain'}
            source={require('../icons/pin.png')}
          />
        ) : null}
      </Container>
    </Swipeable>
  );
};

export default NewsListItem;
