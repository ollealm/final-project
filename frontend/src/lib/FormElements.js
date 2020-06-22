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
`