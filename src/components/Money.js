import styled from 'styled-components';
import { THEME_COLOR_0 } from '../config';

const Money = styled.p`
  color: ${THEME_COLOR_0};

  & span {
    background: #00000033;
    padding: 5px;
    border-radius: 10px;
  }
`;

export default Money;
