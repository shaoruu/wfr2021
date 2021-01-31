import styled from 'styled-components';
import { device, THEME_COLOR_1 } from '../config';
import Card from './Card';

const StyledSection = styled(Card)`
  border-bottom: 2px solid ${THEME_COLOR_1};
  overflow: hidden;
  margin-bottom: 2em;

  @media ${device.tablet} {
    height: 100%;
    margin: 0;
    margin-right: 2em;
  }
`;

export default StyledSection;
