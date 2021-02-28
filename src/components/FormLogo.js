import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../assets/logo.png';

const LOGO_DIMENSION = '60px';

const LogoWrapper = styled(Link)`
  margin-bottom: 1em;

  & img {
    width: ${LOGO_DIMENSION};
    height: ${LOGO_DIMENSION};
  }
`;

const FormLogo = () => (
  <LogoWrapper to="/">
    <img src={Logo} alt="Logo" />
  </LogoWrapper>
);

export default FormLogo;
