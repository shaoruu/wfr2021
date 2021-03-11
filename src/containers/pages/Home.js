import { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Background from '../../assets/background1.jpg';
import Background2 from '../../assets/background2.jpg';
import Background3 from '../../assets/background3.jpg';
import Logo from '../../assets/logo.png';
import Shape1 from '../../assets/shape1.svg';
import Shape2 from '../../assets/shape2.svg';
import ActionButton from '../../components/ActionButton';
import HomeDonateForm from '../../components/HomeDonateForm';
import {
  THEME_COLOR_1,
  THEME_COLOR_2,
  THEME_COLOR_3,
  THEME_COLOR_4,
  THEME_COLOR_B,
} from '../../config';
import { useAuth } from '../../contexts/authContext';

const NAV_HEIGHT = '4em';

const Wrapper = styled.div``;

const NavBar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: ${THEME_COLOR_1};
  height: ${NAV_HEIGHT};
  z-index: 100000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  & h1 {
    margin: 0 2em;
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
      width: 1.6em;
      margin-right: 0.4em;
    }
  }

  & .flexer {
    flex: 1;
  }

  & div {
    display: flex;
    align-items: center;
  }

  & .hypers {
    @media (max-width: 750px) {
      display: none;
    }
  }

  & a:first-of-type {
    text-decoration: none;
    color: black;
  }

  & a:last-of-type {
    margin-right: 2em;
  }
`;

const IntroSection = styled.section`
  height: calc(100vh - ${NAV_HEIGHT});
  background: ${THEME_COLOR_B};
`;

const ImageHolder = styled.div`
  margin-top: ${NAV_HEIGHT};
  width: 100%;
  height: 70%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 5em;
  position: relative;

  & div {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${THEME_COLOR_3}99;
    padding: 1em;
    color: ${THEME_COLOR_B};
    font-family: Roboto;
    font-style: normal;
    font-weight: 800;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & span {
      color: black;
      background: white;
    }

    & h1 {
      font-size: 2em;

      @media (min-width: 1300px) {
        font-size: 3em;
      }
    }

    & p {
      font-size: 3em;
      text-align: center;

      @media (min-width: 1300px) {
        font-size: 4em;
        margin: 0.3em 0;
      }
    }

    & button {
      font-size: 2em;
      margin: 0;
      margin-top: 1em;
      border: none;
    }
  }
`;

const ReadyToRun = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30%;
  padding: 1em 2em;

  & .shortcuts {
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 1300px) {
      flex-direction: column;
    }
  }

  & div {
    @media (min-width: 1300px) {
      margin: 0 6em;
    }

    & h1 {
      font-size: 2em;
      line-height: 2em;

      @media (min-width: 1300px) {
        font-size: 2em;
        line-height: 2.3em;
      }
    }

    & h3 {
      font-size: 1.6em;
      line-height: 1.6em;

      @media (min-width: 1300px) {
        font-size: 3em;
        font-weight: 100;
      }
    }

    & button {
      text-decoration: none;
      width: 100px;
      margin: 0.4em;

      @media (min-width: 1300px) {
        font-size: 1.3em;
        width: 240px;
        padding: 1em 3em;
      }
    }
  }

  & div:last-of-type {
    display: flex;
    flex-wrap: wrap;
  }
`;

const RegularNavButton = styled.a`
  margin: 0 0.6em;
  text-decoration: none;
  color: ${THEME_COLOR_3};
  cursor: pointer;

  &:hover {
    color: ${THEME_COLOR_4};
    text-decoration: underline;
  }
`;

const WhiteActionButton = styled(ActionButton)`
  background: ${THEME_COLOR_1};
  border: 1px solid black;
  color: ${THEME_COLOR_4};

  &:hover {
    color: ${THEME_COLOR_3};
    text-decoration: underline;
  }
`;

const AboutUsSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4em;
  position: relative;

  @media (max-width: 1300px) {
    flex-direction: column;
  }

  & div {
    & h1 {
      margin-bottom: 0.4em;
      font-size: 3em;
      color: black;

      & span {
        color: ${THEME_COLOR_4};
      }
    }

    & p {
      color: black;
      font-size: 1.2em;
    }
  }

  & div:first-of-type {
    @media (min-width: 1300px) {
      width: 70%;
    }
  }

  & div:last-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 2em;

    & img {
      width: 60vw;
      height: auto;
    }

    @media (min-width: 1300px) {
      margin: 0;
      justify-content: flex-end;
      width: 30%;

      & img {
        width: auto;
        height: 200px;
      }
    }
  }

  & img.shape {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
    max-width: 100vw;
    height: 80%;
  }
`;

const Theme2021 = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4em;
  position: relative;

  @media (max-width: 1300px) {
    flex-direction: column-reverse;
  }

  & div {
    @media (min-width: 1300px) {
      text-align: right;
    }

    & h1 {
      margin-bottom: 0.4em;
      font-size: 3em;
      color: black;

      & span {
        text-decoration: underline;
      }
    }

    & p {
      color: black;
      font-size: 1.2em;
    }

    & img {
      height: 200px;
    }
  }

  & div:first-of-type {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2em;
    width: 100%;

    & img {
      width: 60vw;
      height: auto;
    }

    @media (min-width: 1300px) {
      margin: 0;
      justify-content: flex-start;
      width: 30%;

      & img {
        width: auto;
        height: 200px;
      }
    }
  }

  & div:last-of-type {
    @media (min-width: 1300px) {
      width: 70%;
    }
  }

  & img.shape {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: -1;
    max-width: 100vw;
    height: 80%;
  }
`;

const TwoEventsWrapper = styled.section`
  background: ${THEME_COLOR_B};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5em 0;

  @media (max-width: 1300px) {
    flex-direction: column;
  }

  & div {
    width: 80%;
    margin: 1em;
    padding: 2em;
    height: 20em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    background: white;
    border-radius: 15px;

    @media (min-width: 1300px) {
      width: 40%;
    }

    & h1 {
      color: black;
      font-weight: 600;
    }

    & a {
      color: ${THEME_COLOR_2};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Home = () => {
  const [showDonate, setShowDonate] = useState(false);
  const history = useHistory();
  const { data } = useAuth();

  const toggleForm = () => {
    setShowDonate(!showDonate);
  };

  return (
    <Wrapper>
      {showDonate && <HomeDonateForm toggleForm={toggleForm} />}
      <NavBar>
        <Link to="/">
          <h1>
            <img src={Logo} alt="logo" />
            W4R
          </h1>
        </Link>
        <div className="flexer" />
        <div className="hypers">
          <RegularNavButton href="#aboutus">About Us</RegularNavButton>
          <RegularNavButton href="#2021theme">2021 Theme</RegularNavButton>
          <RegularNavButton href="#two-events">Walkathon</RegularNavButton>
          <RegularNavButton href="#two-events">
            Teacher Karaoke
          </RegularNavButton>
        </div>
        <div>
          {data ? (
            <>
              <Link to="/dashboard">
                <ActionButton>Dashboard</ActionButton>
              </Link>
              <Link to="/logout">
                <ActionButton>Logout</ActionButton>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <ActionButton>Login</ActionButton>
              </Link>
              <Link to="/register">
                <ActionButton>Register</ActionButton>
              </Link>
            </>
          )}
        </div>
      </NavBar>
      <IntroSection>
        <ImageHolder className="image-holder">
          <img src={Background} alt="old-background" />
          <div>
            <h1>WALK FOR REFUGEES</h1>
            <p>
              WALKING FOR: <span>BLACK LIVES</span>
            </p>
            <ActionButton
              onClick={() => {
                if (data) {
                  history.push('/dashboard');
                  return;
                }
                toggleForm();
              }}
            >
              Donate Now
            </ActionButton>
          </div>
        </ImageHolder>
        <ReadyToRun>
          <div className="info">
            <h1>Ready to run?</h1>
            <h3>
              {data ? 'Start making pledges!!!' : 'Sign up for 2021 Walkathon'}
            </h3>
          </div>
          <div className="shortcuts">
            {data ? (
              <Link to="/dashboard">
                <ActionButton>Dashboard</ActionButton>
              </Link>
            ) : (
              <Link to="/register">
                <ActionButton>Register</ActionButton>
              </Link>
            )}
            <a
              href="https://www.instagram.com/walk4refugees/"
              target="_blank"
              rel="noreferrer"
            >
              <WhiteActionButton>Learn More</WhiteActionButton>
            </a>
          </div>
        </ReadyToRun>
      </IntroSection>
      <AboutUsSection id="aboutus">
        <div>
          <h1>
            ABOUT <span>WALK FOR REFUGEES</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hac proin
            tortor, malesuada at nisi mi. Quisque risus amet sed morbi. Quis
            tristique vulputate consequat sed id non egestas tellus cursus.
            Mattis tortor, mattis tempus, congue quisque sagittis, interdum
            auctor non. Nibh laoreet porttitor sit risus, in. Vitae, bibendum
            tortor laoreet morbi. Auctor lacinia odio pellentesque condimentum
            enim, id arcu sit. Viverra at lobortis egestas sit consequat nisl
            tortor feugiat lectus. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Hac proin tortor, malesuada at nisi mi. Quisque
            risus amet sed morbi. Quis tristique vulputate consequat sed id non
            egestas tellus cursus. Mattis tortor, mattis tempus, congue quisque
            sagittis, interdum auctor non. Nibh laoreet porttitor sit risus, in.
            Vitae, bibendum tortor laoreet morbi. Auctor lacinia odio
            pellentesque condimentum enim, id arcu sit. Viverra at lobortis
            egestas sit consequat nisl tortor feugiat lectus.
          </p>
        </div>
        <div>
          <img src={Background2} alt="background2" />
        </div>
        <img className="shape" src={Shape1} alt="shape" />
      </AboutUsSection>
      <Theme2021 id="2021theme">
        <div>
          <img src={Background3} alt="background2" />
        </div>
        <div>
          <h1>
            2021 THEME: <span>#BlackLives</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hac proin
            tortor, malesuada at nisi mi. Quisque risus amet sed morbi. Quis
            tristique vulputate consequat sed id non egestas tellus cursus.
            Mattis tortor, mattis tempus, congue quisque sagittis, interdum
            auctor non. Nibh laoreet porttitor sit risus, in. Vitae, bibendum
            tortor laoreet morbi. Auctor lacinia odio pellentesque condimentum
            enim, id arcu sit. Viverra at lobortis egestas sit consequat nisl
            tortor feugiat lectus. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Hac proin tortor, malesuada at nisi mi. Quisque
            risus amet sed morbi. Quis tristique vulputate consequat sed id non
            egestas tellus cursus. Mattis tortor, mattis tempus, congue quisque
            sagittis, interdum auctor non. Nibh laoreet porttitor sit risus, in.
            Vitae, bibendum tortor laoreet morbi. Auctor lacinia odio
            pellentesque condimentum enim, id arcu sit. Viverra at lobortis
            egestas sit consequat nisl tortor feugiat lectus.
          </p>
        </div>
        <img className="shape" src={Shape2} alt="shape" />
      </Theme2021>
      <TwoEventsWrapper id="two-events">
        <div>
          <h1>WALKATHON - APR 19TH</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore...
          </p>
          {data ? (
            <Link to="/pledge">Start pledging!</Link>
          ) : (
            <Link to="/register">Sign Up Now</Link>
          )}
        </div>
        <div>
          <h1>TEACHER KARAOKE - APR 27TH</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore...
          </p>
          <Link to={data ? '/pledge' : '/register'}>Support us!</Link>
        </div>
      </TwoEventsWrapper>
    </Wrapper>
  );
};

export default Home;
