import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { Cont, Footer, Button as Fbtn } from "./Comp";
import "../styles.css";
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
  this.myRef = React.createRef();
  this.B0 = React.createRef();
  this.B1 = React.createRef();
  this.B2 = React.createRef();
  this.B3 = React.createRef();
  this.B4 = React.createRef();
  const arrB = [this.B0, this.B1, this.B2, this.B3, this.B4];
  const onFilter = (ref, Tag) => {
    arrB.forEach((btn) =>
      btn.current === ref.current
        ? btn.current.classList.add("selBtn")
        : btn.current.classList.remove("selBtn")
    );
    if (this.myRef.current) {
      this.myRef.current.scrollTop = 0;
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
        <Button
          className="selBtn"
          ref={this.B0}
          onClick={() => onFilter(this.B0, "")}
        >
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
      <Cont ref={this.myRef}>
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
