import styled from 'styled-components';

import { GENERAL_TRANSITION } from '../config';

const Backdrop = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000000;
  background: #00000033;
  transition: all ${GENERAL_TRANSITION};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Backdrop;
