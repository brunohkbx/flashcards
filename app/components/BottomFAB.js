import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FAB from './FAB';
import { View } from 'react-native';

const Container = styled(View)`
  position: absolute;
  right: 16;
  bottom: 16;
`;

const BottomFAB = ({ handlePress }) => {
  return (
    <Container>
      <FAB handlePress={handlePress} />
    </Container>
  );
};

BottomFAB.propTypes = {
  handlePress: PropTypes.func.isRequired
};

export default BottomFAB;
