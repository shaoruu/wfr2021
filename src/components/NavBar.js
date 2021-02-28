import {
  IoCashOutline,
  IoPersonOutline,
  IoShirtOutline,
  IoStatsChartOutline,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import LOGO from '../assets/logo.png';
import { device, NAVBAR_MOBILE, NAVBAR_WIDTH, THEME_COLOR_2 } from '../config';
import { useAuth } from '../contexts/authContext';

import NavButton from './NavButton';

const Wrapper = styled.div`
  z-index: 10000;
  background: white;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${NAVBAR_MOBILE};
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */

  @media ${device.tablet} {
    bottom: auto;
    top: 0;
    height: 100vh;
    flex-direction: column;
    width: ${NAVBAR_WIDTH};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${THEME_COLOR_2};
  margin-right: 1em;

  @media ${device.tablet} {
    margin: 0;
    flex-direction: column;
    margin-bottom: 4em;
  }
`;

const TitleLogo = styled.img`
  border-radius: 50%;
  width: 2em;
  height: 2em;
  margin-right: 0.5em;

  @media ${device.tablet} {
    width: 2.8em;
    height: 2.8em;
    margin: 0;
    margin-bottom: 0.5em;
  }
`;

const Title = styled.h1`
  font-size: 1.1em;

  @media ${device.tablet} {
    font-size: 1.6em;
  }
`;

const ButtonWrappers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.tablet} {
    overflow: auto;
    flex-direction: column;
  }
`;

const NavBar = () => {
  const { data } = useAuth();

  return (
    !!data && (
      <Wrapper>
        <TitleWrapper>
          <Link to="/">
            <TitleLogo src={LOGO} alt="logo" />
          </Link>
          <Title>W4R</Title>
        </TitleWrapper>
        <ButtonWrappers>
          <NavButton
            to="/dashboard"
            text="Dashboard"
            icon={<IoStatsChartOutline className="nav-button-icon" />}
          ></NavButton>
          <NavButton
            to="/pledge"
            text="Pledge"
            icon={<IoCashOutline className="nav-button-icon" />}
          ></NavButton>
          <NavButton
            to="/products"
            text="Products"
            icon={<IoShirtOutline className="nav-button-icon" />}
          ></NavButton>
          <NavButton
            to="/runner"
            text="Runner"
            icon={<IoPersonOutline className="nav-button-icon" />}
          ></NavButton>
        </ButtonWrappers>
      </Wrapper>
    )
  );
};

export default NavBar;
