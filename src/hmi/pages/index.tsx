import { useState, /*useRef,*/ ChangeEvent } from "react";
import { crash, postMq } from "../services/apiService";

export default function Home() {

  const [buttonText, setButtonText] = useState('Start');

  const handleClick = () => {
    if (buttonText === 'Start') {
      setButtonText('Stop');
      postMq({messageId: '', message: 'start_production'});
    } else {
      setButtonText('Start');
    }
  };

  const handleSimulateError = () => {
    crash();
  };

  const productChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(`${event.target.value}`);
  }

  return (
    <div>
      <select onChange={event => productChanged(event)}>
        <option>Product A</option>
        <option>Product B</option>
      </select>
      <button type="button"
        onClick={handleClick}>{buttonText}
      </button>
      <button onClick={handleSimulateError} type="button">
        Simulate error
      </button>
    </div>
  );
}
