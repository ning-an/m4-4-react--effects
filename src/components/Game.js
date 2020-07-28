import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import { useKeydown } from "./useKeydown";
import { useDocumentTitle } from "./useDocumentTitle";

const Game = () => {
  const [numCookies, setNumCookies] = useState(100);
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
    megacursor: 0,
  });
  const [items, setItems] = useState([
    { id: "cursor", name: "Cursor", cost: 10, value: 1 },
    { id: "grandma", name: "Grandma", cost: 100, value: 10 },
    { id: "farm", name: "Farm", cost: 1000, value: 80 },
    { id: "megacursor", name: "megaCursor", cost: 100, value: 5 },
  ]);

  //increase num of cookies per click
  let numCookiesPerClick = 1 + purchasedItems.megacursor * 5;

  //space bar - cookie click
  useKeydown("Space", () => setNumCookies(numCookies + numCookiesPerClick));
  //update document title on every render
  useDocumentTitle(numCookies, () => (document.title = ""));

  //item focus
  const refFocus = useRef(null);
  useEffect(() => {
    refFocus.current.childNodes[1].focus();
  }, []);

  //purchase items
  const handleClick = (e) => {
    const itemWant = items.find((item) => item.id === e.target.id);
    const itemIndex = items.indexOf(itemWant);
    const { id, cost } = itemWant;
    if (cost <= numCookies) {
      setNumCookies(numCookies - cost);
      setPurchasedItems({ ...purchasedItems, [id]: purchasedItems[id] + 1 });
      //increase price
      const newArr = [...items];
      newArr[itemIndex].cost = Math.ceil(cost * 1.2);
      setItems(newArr);
    } else {
      window.alert("Sorry you cannot afford it");
    }
  };

  //calculate cookies per tick
  const refCookiePerSecond = useRef(0);
  const calculateCookiesPerTick = (purchasedItems) => {
    return (
      purchasedItems.cursor +
      purchasedItems.grandma * 10 +
      purchasedItems.farm * 80
    );
  };

  useEffect(() => {
    refCookiePerSecond.current = calculateCookiesPerTick(purchasedItems);
  }, [purchasedItems]);

  useInterval(() => {
    setNumCookies(numCookies + refCookiePerSecond.current);
  }, 1000);
  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{refCookiePerSecond.current}</strong> cookies per second
        </Indicator>
        <Button>
          <Cookie
            src={cookieSrc}
            onClick={() => setNumCookies(numCookies + numCookiesPerClick)}
          />
        </Button>
      </GameArea>

      <ItemArea ref={refFocus}>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            purchasedItems={purchasedItems}
            handleClick={handleClick}
          />
        ))}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
