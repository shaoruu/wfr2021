import styled from 'styled-components';

import { THEME_COLOR_1 } from '../config';

export default styled.div`
  z-index: 0;
  background-color: ${THEME_COLOR_1};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
