import React, { useReducer } from "react";
import "../css/App.css";
import Buttons from "./Buttons";
import Operations from "./Operations";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CLEAR: "clear",
  DELETE: "delete",
  CHOOSE_OPERATIONS: "choose_operations",
  EQUAL: "equal",
};

//action: {type, payload}
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "." && state.currOperand == null) {
        return state;
      }
      if (payload.digit === "." && state.currOperand.includes(".")) {
        return state;
      }
      if (payload.digit === "0" && state.currOperand === "0") {
        return state;
      }
      if (state.currOperand === "0") {
        return {
          ...state,
          currOperand: payload.digit,
          clear: "C",
        };
      }
      return {
        ...state,
        currOperand: `${state.currOperand || ""}${payload.digit}`,
        clear: "C",
      };

    case ACTIONS.CHOOSE_OPERATIONS:
      if (state.currOperand == null && state.prevOperand == null) return state;
      if (state.currOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      //if prevOperand == null no need to compute
      if (state.prevOperand == null) {
        return {
          ...state,
          prevOperand: state.currOperand,
          currOperand: null,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        prevOperand: compute(state),
        currOperand: null,
        operation: payload.operation,
      };

    case ACTIONS.EQUAL:
      if (state.currOperand == null || state.prevOperand == null || state.operation == null)
        return state;
      return {
        ...state,
        prevOperand: null,
        currOperand: compute(state),
        operation: null,
        overwrite: true,
      };

    case ACTIONS.DELETE:
      if (state.currOperand == null) return state;
      if (state.currOperand.length === 1) {
        return {
          ...state,
          currOperand: "0",
        };
      }
      return {
        ...state,
        currOperand: state.currOperand.slice(0, -1),
      };

    case ACTIONS.CLEAR:
      if (state.clear === "C") {
        return {
          ...state,
          currOperand: "0",
          clear: "AC",
        };
      }
      return { clear: "AC", currOperand: "0" };

    default:
      return state;
  }
}

function compute({ currOperand, prevOperand, operation }) {
  const current = parseFloat(currOperand);
  const prev = parseFloat(prevOperand);
  if (prevOperand == null && currOperand == null) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;

    default:
      return computation;
  }
  return computation.toString();
}

function App() {
  const [{ prevOperand, currOperand, operation, clear }, dispatch] = useReducer(reducer, {
    clear: "AC",
    currOperand: "0",
  });
  return (
    <>
      <div className="app-container">
        <div className="display-container">
          <div className="input prev">
            {prevOperand}
            {operation}
          </div>
          <div className="input curr">{currOperand}</div>
        </div>
        <div className="buttons-container">
          <div className="buttons-grid">
            <button className="buttons span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
              {clear}
            </button>
            <button className="buttons" onClick={() => dispatch({ type: ACTIONS.DELETE })}>
              Del
            </button>
            <Operations operation="+" dispatch={dispatch} />
            <Buttons digit="1" dispatch={dispatch} />
            <Buttons digit="2" dispatch={dispatch} />
            <Buttons digit="3" dispatch={dispatch} />
            <Operations operation="-" dispatch={dispatch} />
            <Buttons digit="4" dispatch={dispatch} />
            <Buttons digit="5" dispatch={dispatch} />
            <Buttons digit="6" dispatch={dispatch} />
            <Operations operation="*" dispatch={dispatch} />
            <Buttons digit="7" dispatch={dispatch} />
            <Buttons digit="8" dispatch={dispatch} />
            <Buttons digit="9" dispatch={dispatch} />
            <Operations operation="/" dispatch={dispatch} />
            <Buttons spanTwo="span-two" digit="0" dispatch={dispatch} />
            <Buttons digit="." dispatch={dispatch} />
            <button className="buttons orange" onClick={() => dispatch({ type: ACTIONS.EQUAL })}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
