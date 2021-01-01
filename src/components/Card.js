import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
const heigth = 300;
const width = 213;
const CardC = styled.div`
  height: 400px;
  width: ${width}px;
  left: 25px;
  top: 317.0001220703125px;
  margin: 0% 2% 2% 0%;
`;
const Img = styled.img`
  height: ${heigth}px;
  width: ${width}px;
`;
const H5 = styled.h5`
  font-weight: bold;
  margin: 2px;
  text-align: start;
`;
const Name = styled(H5)`
  color: #c3c3c3;
`;
const S = styled.s`
  font-weight: lighter;
  color: #c3c3c3;
  margin: 2%;
`;
const Dis = styled.span`
  font-weight: normal;
  color: #ffacac;
`;

const Con = styled.div`
  height: ${heigth}px;
  width: ${width}px;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  background: whitesmoke;
`;
const HoverName = styled(Dis)`
  box-sizing: content-box;
  color: black;
  font-weight: bold;
  border-bottom: 1px black solid;
  width: 100%;
  padding: 3px 0px 3px 0px;
`;
const Desc = styled.div`
  height: 100px;
  width: inherit;
`;
const AddRemove = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px;
  background: transparent;
  width: 100%;
  font-size: 70%;
  margin: 0;
  border-bottom: 1px black solid;
  box-sizing: border-box;
`;
const Button = styled.button`
  background: transparent;
  border: 0px solid;
  color: white;
  &:hover {
    outline: none;
  }
`;
const Flex = styled.div`
  display: flex;
  background: #88b900;
  margin-left: 5%;
  padding: 1%;
  border-radius: 10px;
`;
const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
const SLink = styled(NavLink)`
  padding: 10px;
  background: linear-gradient(90.06deg, #181716 0%, #ed4e08 99.97%);
  width: 100%;
  color: white;
  text-decoration: none;
  box-sizing: border-box;
`;

export default function Card(props) {
  const [Rate] = useState(
    Math.round(100 - (props.item.price * 100) / props.item.compare_at_price)
  );
  const [Hover, setHover] = useState(1);
  const [count, setCount] = useLocalStorage(`${props.id}`, {
    [`${props.id}-0`]: 0,
    [`${props.id}-1`]: 0,
    [`${props.id}-2`]: 0,
    [`${props.id}-3`]: 0,
    [`${props.id}-4`]: 0
  });
  const onHover = (e) => {
    setHover(0);
  };
  const onLeave = (e) => {
    setHover(1);
  };
  useEffect(() => {
    if (props.remLocalStorage) {
      props.remLocalStorage(count, props.id);
    }
  }, [props, count]);
  return (
    <CardC
      onMouseOver={(e) => {
        e.preventDefault();
        onHover(e);
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        onLeave(e);
      }}
    >
      {Hover === 1 ? (
        <Con>
          <Img src={props.item.image_src} />
        </Con>
      ) : (
        <Con>
          <HoverName> Available options</HoverName>
          {props.item.options.map((opt, i) => (
            <AddRemove key={`${props.item.options.id}-${i}`} to="Cart">
              {opt.name}:{opt.value}
              <FlexContainer>
                <Flex>
                  <Button
                    onClick={() => {
                      if (count[`${props.id}-${i}`] > 0) {
                        setCount({
                          ...count,
                          [`${props.id}-${i}`]: count[`${props.id}-${i}`] - 1
                        });
                        props.rm();
                      }
                    }}
                  >
                    -
                  </Button>
                  <Button> {count[`${props.id}-${i}`]}</Button>
                  <Button
                    onClick={() => {
                      setCount({
                        ...count,
                        [`${props.id}-${i}`]: count[`${props.id}-${i}`] + 1
                      });
                      props.add();
                    }}
                  >
                    +
                  </Button>
                </Flex>
              </FlexContainer>
            </AddRemove>
          ))}
          {props.cart !== "1" ? (
            <SLink activeClassName="sel" to="/Cart">
              View Cart
            </SLink>
          ) : null}
        </Con>
      )}
      <Desc>
        <H5>{props.item.vendor}</H5>
        <Name>{props.item.name}</Name>
        <H5>
          {`$${props.item.price}  `}
          <S>${props.item.compare_at_price}</S>
          <Dis>{`(${Rate}%)`}</Dis>
        </H5>
      </Desc>
    </CardC>
  );
}
