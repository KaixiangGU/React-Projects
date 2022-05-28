import React from "react";
import { ACTIONS } from "./App";

export default function Operations({ dispatch, operation }) {
  return (
    <button
      className="buttons operation orange"
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATIONS, payload: { operation } })}
    >
      {operation}
    </button>
  );
}
