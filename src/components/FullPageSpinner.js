import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import styled, { keyframes } from 'styled-components';

import { THEME_COLOR_3 } from '../config';

const ellipsis = keyframes`
  to {
    width: 20px;    
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  flex: 1;

  & #loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${ellipsis} steps(4,end) 900ms infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
    width: 0px;
  }
`;

const FullPageSpinner = () => (
  <Wrapper>
    <ClimbingBoxLoader
      size={10}
      color={THEME_COLOR_3}
      loading={true}
    ></ClimbingBoxLoader>
    <p id="loading">Loading...</p>
  </Wrapper>
);

export default FullPageSpinner;
