import { View } from 'react-native';
import styled from 'styled-components';

const Avatar = styled(View)`
  width: ${props => props.width};
  height: ${props => props.height};
  borderRadius: ${props => props.borderRadius};
  backgroundColor: ${props => props.backgroundColor};
  justify-content: center;
  align-items: center;
`;

export default Avatar;
