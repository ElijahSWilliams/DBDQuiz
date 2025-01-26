import "./Quiz.css";
import quizData from "../../../questions.json";
import { useEffect, useState } from "react";

const Quiz = () => {
  const [quiz, setQuiz] = useState([]); //set quiz to empty array
  const [currentQuestion, setCurrentQuestion] = useState(0); //set current question to 0

  //set quiz questions on load
  useEffect(() => {
    setQuiz(quizData.bonus);
  }, []);
};

export default Quiz;
