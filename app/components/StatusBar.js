import React from 'react';
import { StatusBar as _StatusBar, View } from 'react-native';
import styled from 'styled-components';
import { Constants } from 'expo';
import { primaryColor } from '../config/theme';

const StatusBarContainer = styled(View)`
  background-color: ${primaryColor}
  height: ${Constants.statusBarHeight}
`;

const StatusBar = () => {
  return (
    <StatusBarContainer>
      <_StatusBar
        translucent
        backgroundColor={primaryColor}
        barStyle="light-content"
      />
    </StatusBarContainer>
  );
};

export default StatusBar;
