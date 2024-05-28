import "./styles.css";

function App() {
  return (
    <div className='calculator'>
      <div className='output'>
        <div className='previous-operand'>121 *</div>
        <div className='current-operand'>123</div>
      </div>
      <button className='span-two action'>AC</button>
      <button className='action'>DEL</button>
      <button className='operation'>/</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button className='operation'>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button className='operation'>-</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button className='operation'>+</button>
      <button>.</button>
      <button>0</button>
      <button className='span-two operation'>=</button>
    </div>
  );
}

export default App;