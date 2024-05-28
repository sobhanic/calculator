function OperationButton({ operation, dispatch }) {
  return (
    <button
      className='operation'
      onClick={() => dispatch({ type: "chooseOperation", payload: operation })}
    >
      {operation}
    </button>
  );
}

export default OperationButton;
