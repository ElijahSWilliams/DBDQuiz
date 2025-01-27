import "./Quiz.css";
import quizData from "../../../questions.json";
import { useEffect, useState } from "react";

const Quiz = () => {
  const [question, setQuestion] = useState([]); //set quiz to empty array
  const [currentQuestion, setCurrentQuestion] = useState(0); //set current question to 0

  //set quiz questions on load
  useEffect(() => {
    //randomize questions
    if (quizData && quizData.length > 0) {
      //check if quizData exists and isn't empty
      let randomNumber = Math.floor(Math.random() * quizData.length); //logic to randomize questions
      setQuestion(quizData[randomNumber]); //set question to a randomly picked question
    }
  }, [quizData]);
  console.log(quizData);

  return (
    <div className="quiz">
      <h2 className="quiz__question-counter">{currentQuestion + 1}</h2>
      <h3 className="quiz__question">
        {question ? question.question : "Loading..."}
      </h3>
      <ul className="quiz__options">
        {question && question.options ? (
          question.options.map((option, key) => {
            return <li className="quiz__option">{option}</li>;
          })
        ) : (
          <li className="quiz__loading">Loading Options...</li>
        )}
      </ul>
    </div>
  );
};

export default Quiz;
