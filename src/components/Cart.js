import React, { useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { Cont, Footer, Button } from "./Comp";
import CartEmpty from "./CartEmpty";
const ContM = styled(Cont)`
  margin-top: 2%;
  height: 80vh;
`;
export default function Cart(props) {
  const [tmp, setTmp] = useState(false);
  const data = props.items
    ? props.items.filter((item, i) => {
        return localStorage.getItem(item.id) &&
          Object.values(JSON.parse(localStorage.getItem(item.id))).filter(
            (x) => x === 0
          ).length
          ? true
          : false;
      })
    : null;

  const remLocalStorage = (count, rid) => {
    if (
      localStorage.getItem(rid) &&
      Object.values(count).filter((x) => x === 0).length === 5
    ) {
      localStorage.removeItem(rid);
      setTmp(!tmp);
    }
  };
  return (
    <div>
      <ContM>
        {data && data.length ? (
          data.map((it) => (
            <Card
              key={it.id}
              id={it.id}
              item={it}
              add={props.add}
              rm={props.rm}
              cart="1"
              remLocalStorage={remLocalStorage}
            />
          ))
        ) : (
          <CartEmpty />
        )}
      </ContM>
      <Footer>
        <Button>Checkout</Button>
      </Footer>
    </div>
  );
}
