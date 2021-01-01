import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { Cont, Footer, Button as Fbtn } from "./Comp";
import "../styles.css";
const myRef = React.createRef();
const B0 = React.createRef();
const B1 = React.createRef();
const B2 = React.createRef();
const B3 = React.createRef();
const B4 = React.createRef();
const Button = styled.button`
  padding: 0.5%;
  margin: 1% 1% 0% 1%;
  border-radius: 50px;
  border: 1px brown solid;
  width: 100px;
  background: white;
  color: brown;
  outline: none;
`;
const Space = styled.div`
  height: 10vh;
`;
const All = styled.span`
  font-weight: normal;
  color: brown;
`;
export default function Home(props) {
  const [items, setItems] = useState(props.items);

  const arrB = [B0, B1, B2, B3, B4];
  const onFilter = (ref, Tag) => {
    arrB.forEach((btn) =>
      btn.current === ref.current
        ? btn.current.classList.add("selBtn")
        : btn.current.classList.remove("selBtn")
    );
    if (myRef.current) {
      myRef.current.scrollTop = 0;
    }
    return Tag && props.items
      ? setItems(props.items.filter((item) => item.tag === Tag.tag))
      : setItems(props.items);
  };
  return (
    <>
      <h5>
        All Products:
        <All> ({props.items ? props.items.length : 0} Products)</All>
        <Button className="selBtn" ref={B0} onClick={() => onFilter(B0, "")}>
          All Products
        </Button>
        {props.tags
          ? props.tags.map((tag, i) => (
              <Button
                ref={arrB[i + 1]}
                key={i}
                onClick={() => onFilter(arrB[i + 1], { tag })}
              >
                {tag}
              </Button>
            ))
          : null}
      </h5>
      <br />
      <Cont ref={myRef}>
        {items
          ? items.map((item, i) => (
              <Card
                key={item.id}
                id={item.id}
                item={item}
                add={props.add}
                rm={props.rm}
              />
            ))
          : props.items
          ? props.items.map((item, i) => (
              <Card
                key={item.id}
                id={item.id}
                item={item}
                add={props.add}
                rm={props.rm}
              />
            ))
          : null}
        <Space />
      </Cont>
      <Footer>
        <Fbtn>Checkout</Fbtn>
      </Footer>
    </>
  );
}
