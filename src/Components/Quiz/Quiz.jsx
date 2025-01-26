import "./Quiz.css";
import quizData from "../../../questions.json";
import { useEffect, useState } from "react";

const Quiz = () => {
  const [question, setQuestion] = useState([]); //set quiz to empty array
  const [currentQuestion, setCurrentQuestion] = useState(0); //set current question to 0

  //set quiz questions on load
  useEffect(() => {
    //randomize questions
    let randomNumber = Math.floor(Math.random() * quizData.length);
    setQuestion(quizData[randomNumber]);
  }, []);

  return (
    <div className="quiz">
      <h2 className="quiz__question-counter">{currentQuestion + 1}</h2>
      <h3 className="quiz__question">
        {question ? question.question : "Loading..."}
      </h3>
      <ul className="quiz__options">{question.options}</ul>
    </div>
  );
};

export default Quiz;
