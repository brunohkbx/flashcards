import { View } from 'react-native';
import styled from 'styled-components';

const BottomRightContainer = styled(View)`
  position: absolute;
  right: ${props => props.right};
  bottom: ${props => props.right}; 
`;

export default BottomRightContainer;
