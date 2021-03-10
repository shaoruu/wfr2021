import styled from 'styled-components';

import { THEME_COLOR_1, THEME_COLOR_4, THEME_COLOR_B } from '../config';

const ActionButton = styled.button`
  display: block;
  margin: 0 0.6em;
  text-decoration: none;
  cursor: pointer;
  background: ${(p) => p.color || THEME_COLOR_4};
  padding: 0.5em 1em;
  border-radius: 5px;
  border-style: solid;
  color: ${THEME_COLOR_1};
  outline: none;

  &:not(:disabled):hover {
    text-decoration: underline;
    color: ${THEME_COLOR_B};
  }

  &:disabled {
    filter: grayscale(1);
  }
`;

export default ActionButton;
