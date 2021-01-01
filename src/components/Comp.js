import styled from "styled-components";
const Cont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  overflow: scroll;
  height: 70vh;
`;
const Footer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(90.06deg, #181716 0%, #ed4e08 99.97%);
  color: white;
  padding: 5px;
`;
const Button = styled.button`
  padding: 5px;
  background: white;
  color: brown;
  outline: none;
  border: 0;
  border-radius: 2px;
`;
export { Cont, Footer, Button };
