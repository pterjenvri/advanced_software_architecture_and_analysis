import { useState, /*useRef,*/ ChangeEvent } from "react";
import { crash, postMq } from "../services/apiService";

export default function Home() {
  const [buttonText, setButtonText] = useState("Start Production");
  const [buttonClass, setButtonClass] = useState("button-green");

  const handleClick = () => {
    if (buttonText === "Start Production") {
      setButtonText("Stop Production");
      setButtonClass("button-danger");
      postMq({ messageId: "", message: "start_production" });
    } else {
      setButtonText("Start Production");
      setButtonClass("button-green");
    }
  };

  const handleSimulateError = () => {
    crash();
  };

  const productChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(`${event.target.value}`);
  };

  return (
    <div>
      <style jsx>{`
        .startContains {
          text-align: center;
        }
        .selectForm {
          height: 34px;
          padding: 6px 12px;
          font-size: 14px;
          line-height: 1.428571429;
          color: #555555;
          vertical-align: middle;
          background-color: #ffffff;
          border: 1px solid #cccccc;
          border-radius: 4px;
        }
        .button-green {
          margin-left: 5px;
          margin-right: 5px;
          padding: 5px;
          background: #3276b1;
          border: 1px solid transparent;
          border-radius: 4px;
          cursor: pointer;
        }
        .button-danger {
          margin-left: 5px;
          margin-right: 5px;
          padding: 5px;
          background: #d2322d;
          border: 1px solid transparent;
          border-radius: 4px;
          cursor: pointer;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <div className="startContains">
        <h2>Select your product for production.</h2>
        <select
          className="selectForm"
          onChange={(event) => productChanged(event)}
        >
          <option>Product A</option>
          <option>Product B</option>
        </select>
        <button className={buttonClass} type="button" onClick={handleClick}>
          {buttonText}
        </button>
        <button
          className="button-danger"
          onClick={handleSimulateError}
          type="button"
        >
          Simulate error
        </button>
      </div>
    </div>
  );
}
