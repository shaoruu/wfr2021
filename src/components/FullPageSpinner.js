import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import styled from 'styled-components';

import { THEME_COLOR_3 } from '../config';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullPageSpinner = () => (
  <Wrapper>
    <ClimbingBoxLoader
      size={150}
      color={THEME_COLOR_3}
      loading={true}
    ></ClimbingBoxLoader>
  </Wrapper>
);

export default FullPageSpinner;
