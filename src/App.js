import React, { useEffect, useState } from "react";
import useLocalStorage from "./components/useLocalStorage";
import styled from "styled-components";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import "./styles.css";
import About from "./components/About";
import Home from "./components/Home";
import Cart from "./components/Cart";
const myRef = React.createRef();
const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  background: linear-gradient(90.06deg, #181716 0%, #ed4e08 99.97%);
  color: #f1f1f1;
  z-index: 1;
`;
const SLink = styled(NavLink)`
  padding: 10px;
  background: inherit;
  color: inherit;
  text-decoration: none;
`;
const Flex = styled.div`
  display: flex;
  justify-items: start;
  background: transparent;
  color: white;
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  padding: 1%;
  padding-bottom: 0;
  border-bottom: 1px whitesmoke solid;
`;
const Circle = styled.div`
  width: 20px;
  height: 20px;
  color: brown;
  display: grid;
  place-items: center;
  background: white;
  border-radius: 50%;
  margin-left: 3px;
`;
const CartCount = styled.div`
  display: flex;
  align-items: center;
`;
export default function App() {
  const [data, setData] = useState(null);
  const [tags, setTags] = useState(null);
  const [count, setCount] = useLocalStorage("countC", 0);

  var scroll = window.onscroll;

  useEffect(() => {
    var header = myRef.current;
    var sticky = header ? header.offsetTop : "";
    window.onscroll = function () {
      myFunction();
    };
    function myFunction() {
      if (header) {
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    }
  }, [scroll]);
  useEffect(() => {
    axios
      .get(
        "https://cdn.shopify.com/s/files/1/0455/2176/4502/files/products.json"
      )
      .then((response) => {
        setData(JSON.parse(response.data.replace(/,([^,]*)$/, "]")));
        debugger;
        setTags([
          ...new Set(
            JSON.parse(response.data.replace(/,([^,]*)$/, "]")).map(
              (x) => x.tag
            )
          )
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onAdd = () => setCount(count + 1);
  const onRm = () => setCount(count - 1);
  return (
    <div className="App">
      <Router>
        <Header ref={myRef}>
          <Flex>
            <SLink activeClassName="sel" to="/Home">
              Home
            </SLink>
            <SLink activeClassName="sel" to="/About">
              ShopTrade
            </SLink>
            <SLink activeClassName="sel" to="/Cart" visible="false">
              <CartCount>
                {" "}
                Cart{count ? <Circle>{count}</Circle> : null}
              </CartCount>
            </SLink>
          </Flex>
        </Header>
        <Switch>
          <Route render={(props) => <About />} path="/About"></Route>
          <Route
            render={(props) => (
              <Home items={data} add={onAdd} rm={onRm} tags={tags} />
            )}
            path="/Home"
          ></Route>
          <Route
            render={(props) => <Cart items={data} add={onAdd} rm={onRm} />}
            path="/Cart"
          ></Route>
          <Route
            render={(props) => (
              <Home items={data} add={onAdd} rm={onRm} tags={tags} />
            )}
            path="/"
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}
