import React from 'react';
import {FlexAlignType, View, ViewProps} from 'react-native';

export type Merge<FirstType, SecondType> = Omit<FirstType, keyof SecondType> &
  SecondType;

export const FlexRow = ({
  align,
  justify,
  children,
  style,
  ...rest
}: Merge<
  {
    align?: FlexAlignType;
    justify?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | undefined;
    children: React.ReactNode;
  },
  ViewProps
>) => (
  <View
    style={[
      {
        alignItems: align,
        justifyContent: justify,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      style,
    ]}
    {...rest}>
    {children}
  </View>
);

FlexRow.defaultProps = {
  align: 'flex-start',
  justify: 'flex-start',
};

export const FlexCol = ({
  align,
  justify,
  children,
  style,
  ...rest
}: Merge<
  {
    align?: FlexAlignType;
    justify?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | undefined;
    children: React.ReactNode;
  },
  ViewProps
>) => (
  <View style={[{alignItems: align, justifyContent: justify}, style]} {...rest}>
    {children}
  </View>
);

FlexCol.defaultProps = {
  align: 'flex-start',
  justify: 'center',
};
