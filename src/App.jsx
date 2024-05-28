import { useReducer } from "react";
import "./styles.css";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us");

function formatOperand(operand) {
  if (!operand) return;
  const [integer, decimal] = operand.split(".");
  if (!decimal) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

const initialState = {
  currentOperand: "",
  previousOperand: "",
  operation: "",
  overwrite: false,
};

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return "";

  let result;
  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
    default:
      result = "";
  }

  return result.toString();
}

function reducer(state, action) {
  switch (action.type) {
    case "addDigit":
      if (state.overwrite)
        return { ...state, currentOperand: action.payload, overwrite: false };
      if (action.payload === "0" && state.currentOperand === "0")
        return { ...state, currentOperand: "0" };
      if (action.payload === "." && state.currentOperand.includes("."))
        return state;
      if (action.payload === "." && !state.currentOperand)
        return { ...state, currentOperand: "0." };
      return {
        ...state,
        currentOperand: `${state.currentOperand}${action.payload}`,
      };

    case "chooseOperation":
      if (!state.currentOperand && !state.previousOperand) return state;
      if (!state.currentOperand) return { ...state, operation: action.payload };
      if (!state.previousOperand)
        return {
          ...state,
          operation: action.payload,
          previousOperand: state.currentOperand,
          currentOperand: "",
        };
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload,
        currentOperand: "",
      };

    case "clear":
      return initialState;

    case "equalTo":
      if (!state.currentOperand || !state.previousOperand) return state;

      return {
        ...state,
        currentOperand: evaluate(state),
        operation: "",
        previousOperand: "",
        overwrite: true,
      };

    case "deleteDigit":
      if (state.overwrite) return initialState;
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };

    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className='calculator'>
      <div className='output'>
        <div className='previous-operand'>
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className='current-operand'>{formatOperand(currentOperand)}</div>
      </div>
      <button
        className='span-two action'
        onClick={() => dispatch({ type: "clear" })}
      >
        AC
      </button>
      <button
        className='action'
        onClick={() => dispatch({ type: "deleteDigit" })}
      >
        DEL
      </button>
      <OperationButton operation='/' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <OperationButton operation='*' dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <OperationButton operation='-' dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OperationButton operation='+' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <button
        className='span-two operation'
        onClick={() => dispatch({ type: "equalTo" })}
      >
        =
      </button>
    </div>
  );
}

export default App;
