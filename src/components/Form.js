import styled from 'styled-components';

import { THEME_COLOR_0, THEME_COLOR_1 } from '../config';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 1em;

  & > small {
    margin-top: 1em;
    color: ${THEME_COLOR_1};

    & a {
      color: ${THEME_COLOR_0};
    }
  }

  & div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    margin: 0.4em 0;
  }

  & .agreement {
    & div {
      flex-direction: row;
      align-items: center;

      & input {
        width: 20%;
        margin: 0;
        cursor: pointer;
      }

      & label {
        width: 80%;
      }
    }

    & small {
      display: block;
      text-align: center;
      width: 100%;
    }
  }

  & div.isEventWide {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    vertical-align: middle;

    input {
      width: fit-content;
      margin-left: 10px;
      cursor: pointer;
    }
  }

  & section {
    display: flex;
  }

  & div label {
    color: ${THEME_COLOR_0};
    font-size: 0.8em;
    margin-left: 0.4em;
  }

  & div small {
    color: red;
  }

  & select {
    position: relative;
    background: transparent;

    & option {
      padding: 1em;
    }
  }

  & input,
  & select {
    width: 100%;
    padding: 1em;
    border-radius: 5px;
    outline: none;
    margin: 0.5em 0;
    border: 1px solid gray;
  }
`;

export default Form;
