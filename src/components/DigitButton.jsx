function DigitButton({ digit, dispatch }) {
  return (
    <button onClick={() => dispatch({ type: "addDigit", payload: digit })}>
      {digit}
    </button>
  );
}

export default DigitButton;
