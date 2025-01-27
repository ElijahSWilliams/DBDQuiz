import { useState } from "react";
import { Context } from "react";
import QuizContext from "./Context/QuizContext";

import "./App.css";
import Entry from "./Components/Entry/Entry";

function App() {
  const [count, setCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const resetQuiz = () => {
    console.log("Resetting");
    setIsStarted(false);
  };

  return (
    <QuizContext.Provider value={{ isStarted, setIsStarted }}>
      <div className="page">
        <button className="reset__btn">Reset</button>
        <Entry />
      </div>
    </QuizContext.Provider>
  );
}

export default App;
