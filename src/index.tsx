import React, { useState } from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { StarRating } from "@jswf/react-star-rating";

const Root = styled.div`
  &{
    display: inline-block;
    border: solid 1px;
  }
  > div {
    display: flex;
    > div {
      width: 5em;
      text-align: center;
    }
    > button {
      width: 3em;
    }
  }
`;

export function RatingTest() {
  const [max, setMax] = useState(5);
  const [value, setValue] = useState(2.5);

  return (
    <>
      <StarRating max={max} value={value} />
      <StarRating max={max} value={value} star="▲" />
      <StarRating
        style={{ fontSize: "150%" }}
        max={max}
        value={value}
        star="星"
        backStyle={{ color: "black" }}
        foreStyle={{ color: "red" }}
        onValue={v => {
          setValue(v);
        }}
      />
      <Root>
        <div>
          <div>max</div>
          <button onClick={() => {setMax(max - 2);}}>-2</button>
          <button onClick={() => {setMax(max - 1);}}>-1</button>
          <div>{max}</div>
          <button onClick={() => {setMax(max + 1);}}>+1</button>
          <button onClick={() => {setMax(max + 2);}}>+2</button>
        </div>
        <div>
          <div>value</div>
          <button onClick={() => {setValue(value - 1);}}>-1</button>
          <button onClick={() => {setValue(value - 0.1);}}>-0.1</button>
          <div>{value.toFixed(1)}</div>
          <button onClick={() => {setValue(value + 0.1);}}>+0.1</button>
          <button onClick={() => {setValue(value + 1);}}>+1</button>
        </div>
      </Root>
    </>
  );
}

ReactDOM.render(<RatingTest />, document.getElementById("root") as HTMLElement);
