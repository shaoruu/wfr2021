import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import {
  device,
  GENERAL_TRANSITION,
  THEME_COLOR_1,
  THEME_COLOR_2,
  THEME_COLOR_3,
} from '../config';

const activeClassName = 'nav-item-active';

const ButtonWrapper = styled(NavLink).attrs({ activeClassName })`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  margin: 0.8em;

  @media ${device.tablet} {
    margin: 1.2em;
  }

  & p {
    color: ${THEME_COLOR_3};
    margin-top: 1em;
    font-weight: 800;
    border-bottom: none;
    font-size: 0.7em;

    @media ${device.tablet} {
      font-size: 0.9em;
    }
  }

  & .nav-button-icon {
    font-size: 1.2em;

    @media ${device.tablet} {
      font-size: 1.8em;
    }
  }

  & div {
    transition: all ${GENERAL_TRANSITION};
    background: ${THEME_COLOR_1};
    color: ${THEME_COLOR_2};
    border-radius: 20px;
    padding: 0.4em;

    @media ${device.tablet} {
      padding: 0.8em;
    }
  }

  &:hover div {
    color: ${THEME_COLOR_3}cc;
  }

  &.${activeClassName} div {
    background: ${THEME_COLOR_2};
    color: white;
    box-shadow: ${THEME_COLOR_2}55 0px 10px 20px -2px;
  }
`;

const ButtonIcon = styled.div``;

const NavButton = ({ text, to, icon }) => {
  return (
    <ButtonWrapper to={to}>
      <ButtonIcon>{icon}</ButtonIcon>
      <p>{text}</p>
    </ButtonWrapper>
  );
};

export default NavButton;
