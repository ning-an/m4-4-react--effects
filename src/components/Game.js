import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";
import { useKeydown } from "./useKeydown";
import { useDocumentTitle } from "./useDocumentTitle";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const Game = () => {
  // TODO: Replace this with React state!
  const [numCookies, setNumCookies] = useState(100);
  // const numCookies = 100;
  const [purchasedItems, setPurchasedItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });
  const refFocus = useRef(null);
  let numCookiesPerClick =
    Object.values(purchasedItems).reduce((total, num) => total + num) + 1;
  console.log(numCookiesPerClick);

  useEffect(() => {
    calculateCookiesPerTick(purchasedItems);
  }, [purchasedItems]);

  useKeydown("Space", () => setNumCookies(numCookies + numCookiesPerClick));
  useDocumentTitle(numCookies, () => (document.title = ""));

  useEffect(() => {
    refFocus.current.childNodes[1].focus();
  }, []);

  const handleClick = (e) => {
    const itemWant = items.find((item) => item.id === e.target.id);
    const { id, cost } = itemWant;
    if (cost <= numCookies) {
      setNumCookies(numCookies - cost);
      setPurchasedItems({ ...purchasedItems, [id]: purchasedItems[id] + 1 });
    } else {
      window.alert("Sorry you cannot afford it");
    }
  };

  const calculateCookiesPerTick = (purchasedItems) => {
    return (
      purchasedItems.cursor +
      purchasedItems.grandma * 10 +
      purchasedItems.farm * 80
    );
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/* TODO: Calcuate the cookies per second and show it here: */}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
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
