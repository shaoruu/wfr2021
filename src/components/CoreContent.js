import styled from 'styled-components';

import { device, NAVBAR_MOBILE, NAVBAR_WIDTH, THEME_COLOR_1 } from '../config';

export default styled.div`
  z-index: 0;
  background-color: ${THEME_COLOR_1};
  overflow-x: hidden;
  padding-bottom: ${NAVBAR_MOBILE};

  @media ${device.tablet} {
    padding: 0;
    margin-left: ${NAVBAR_WIDTH};
    min-height: 100vh;
  }
`;
