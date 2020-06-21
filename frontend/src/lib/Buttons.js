import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin: 0 10px 0 0;
  font-size: 14px;
  color: #000;
  background: white;
  padding: 0 10px;
  height: 40px;
  min-width: 40px;
  font-size: ${props => props.large ? "20px" : "16px"};
  font-weight: ${props => props.large ? "bold" : "normal"};
  line-height: 1;
  transition: 0.1s;
  
  &:active, :focus, :hover {
    border: 1px solid #000;
    color: #000;
  }
  &:active, :focus {
    box-shadow: 0 0 2px 2px #bbb;
    outline: none;  
  }

`;

export const ButtonBracket = styled.button`
  cursor: pointer;
  margin-left: 5px;
  margin-top: 3px;
  color: #bbb;
  background: none;
  padding: 0;
  border: none;
  height: fit-content;

  &:hover, :active, :focus {
    color: black;
    outline: none;
  }

  &::before {
    content: '[';
  }
  &::after {
    content: ']';
  }
`;




