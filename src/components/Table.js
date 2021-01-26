import styled from 'styled-components';
import { THEME_COLOR_0, THEME_COLOR_3, THEME_COLOR_4 } from '../config';

export const TableTitle = styled.h3`
  color: ${THEME_COLOR_4};
  margin-bottom: 1em;
  display: flex;
  align-items: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  text-align: center;
  display: block;
  overflow-y: scroll;
  max-height: 28em;
  position: relative;

  & thead {
    color: ${THEME_COLOR_3};
  }

  & thead th {
    position: sticky;
    top: 0;
    background: white;
  }

  & tbody {
    height: 20em;
    overflow: auto;
  }

  & th tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }

  & th,
  & td {
    padding: 1em 1.2em;
  }

  & tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  & tbody tr:nth-of-type(even) {
    background-color: #f8f8f8;
  }

  & tbody tr.active-row {
    font-weight: bold;
    color: #009879;
  }

  & tbody tr .pencil-edit {
    width: fit-content;
    cursor: pointer;
    color: ${THEME_COLOR_0};
  }

  & tbody tr .pencil-edit:hover {
    color: black;
  }
`;

export default Table;