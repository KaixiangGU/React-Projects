import React from "react";
import { ACTIONS } from "./App";

export default function Buttons({ dispatch, digit, spanTwo }) {
  return (
    <button
      className={`buttons digit ${spanTwo}`}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
