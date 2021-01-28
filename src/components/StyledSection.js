import styled from 'styled-components';
import { THEME_COLOR_1 } from '../config';
import Card from './Card';

const StyledSection = styled(Card)`
  height: 100%;
  border-bottom: 2px solid ${THEME_COLOR_1};
  overflow: hidden;
  margin-right: 2em;
`;

export default StyledSection;
