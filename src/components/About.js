import React from "react";
import styled from "styled-components";
import { Footer } from "./Comp";
const Cont = styled.div`
  padding: 5%;
  text-align: start;
  margin: 5%;
  font-size: 20px;
  font-style: italic;
  display: grid;
  place-items: center;
`;
const Div = styled.div`
  padding: 5px;
`;
export default function About(props) {
  return (
    <>
      <Cont>
        We have been solving design & development problems, product
        complications and coffee run emergencies for sometime now. Our team can
        make one go blind with an enormous amount of creative solutions that
        they shine with. We believe in unlocking results and growing parallelly
        along with our clients. We started from scratch, but we aim for the
        moon. While we are on our way there, we believe in establishing a
        growing relationship with our precious clients. We take pride in our
        business and services, just like you do. We strive everyday for
        excellence so that you get to give your customers the experience that
        would leave an impression.
      </Cont>
      <Footer>
        <Div>Welcome to ShopTrade</Div>
      </Footer>
    </>
  );
}
