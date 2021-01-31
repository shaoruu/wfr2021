import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Shop from '../assets/shop.svg';
import {
  device,
  GENERAL_TRANSITION,
  THEME_COLOR_0,
  THEME_COLOR_2,
  THEME_COLOR_3,
  THEME_COLOR_4,
  THEME_COLOR_B,
} from '../config';
import StyledSection from './StyledSection';

const Wrapper = styled(StyledSection)`
  /* flex: 1; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${THEME_COLOR_B} !important;
  border-radius: 15px;
  border-bottom: none;

  & img {
    width: 100%;
    margin-top: 1em;

    @media ${device.tablet} {
      margin: 0;
    }
  }

  @media ${device.tablet} {
    width: 22em;
  }
`;

const Title = styled.h1`
  color: ${THEME_COLOR_4};
`;

const SubTitle = styled.p`
  color: ${THEME_COLOR_0};
  margin-top: 1em;

  @media ${device.tablet} {
    margin-top: none;
  }
`;

const GetOneNow = styled(NavLink)`
  color: white;
  align-self: flex-start;
  background: ${THEME_COLOR_2};
  padding: 1em;
  border-radius: 2em;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  width: 100%;
  text-align: center;
  box-shadow: ${THEME_COLOR_0}55 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  transition: all ${GENERAL_TRANSITION};
  text-decoration: none;
  width: 100%;
  margin: 1em 0;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(-1px);
    background: ${THEME_COLOR_3};
  }

  @media ${device.tablet} {
    width: auto;
    margin: unset;
  }
`;

const TShirtAd = () => {
  return (
    <Wrapper>
      <Title>Want a Walk For Refugees t-shirt?</Title>
      <SubTitle>All profit made are going to #BLM!!</SubTitle>
      <GetOneNow to="/products">Get one now!</GetOneNow>
      <img src={Shop} alt="shop" />
    </Wrapper>
  );
};

export default TShirtAd;
