import styled from "styled-components";

export const SearchInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 0;
  padding: 10px;
  width: 200px;
  height: 40px;
  font-size: 16px;
  box-sizing: border-box;
  transition: 0.1s;

  &:hover {
    border: 1px solid #000;
    outline: none;
  }
  &:focus {
    border: 1px solid #000;
    box-shadow: 0 0 2px 2px #bbb;
  }
  &:focus ~ button {
    border: 1px solid #000;
    outline: none;
    color: #000;
  }
  &::placeholder {
    color: #ccc;
  }
`;

export const Select = styled.select`
  /* display: block; */
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 0;
  padding: 10px;
  width: 150px;
  height: 40px;
  font-size: 16px;
  box-sizing: border-box;
  transition: 0.1s;
  appearance: none;
  &:hover {
    border: 1px solid #000;
    outline: none;
  }
  &:focus {
    border: 1px solid #000;
    box-shadow: 0 0 2px 2px #bbb;
  }
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23bbb%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat, repeat;
    /* arrow icon position (1em from the right, 50% vertical) , then gradient position*/
    background-position: right .7em top 50%, 0 0;
    /* icon size, then gradient */
    background-size: .65em auto, 100%;
`