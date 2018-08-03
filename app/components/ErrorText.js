import { Paragraph } from 'react-native-paper';
import styled from 'styled-components';
import { errorColor } from '../config/theme';

const ErrorText = styled(Paragraph)`
  color: ${errorColor}
`

export default ErrorText;
