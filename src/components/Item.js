import React from "react";
import styled from "styled-components";

const Item = ({ item, purchasedItems, handleClick }) => {
  const itemInfo =
    item.name === "megaCursor" ? "cookies/click" : "cookie(s)/second";
  return (
    <ItemBtn onClick={handleClick} id={item.id}>
      <div>
        <h4>{item.name}</h4>
        <p>
          Cost: {item.cost} cookies. Produces {item.value} {itemInfo}.
        </p>
      </div>
      <CountItem>{purchasedItems[item.name.toLowerCase()]}</CountItem>
    </ItemBtn>
  );
};

const ItemBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  border-bottom: solid white 1px;
  padding: 10px;
  background-color: inherit;
  color: white;

  div {
    pointer-events: none;
  }
  h4 {
    font-size: 1.5em;
    text-align: left;
  }

  p {
    font-size: 1em;
    color: lightgrey;
  }
`;

const CountItem = styled.span`
  font-size: 28px;
`;

export default Item;
