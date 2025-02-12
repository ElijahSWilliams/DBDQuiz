import "./Quiz.css";
import quizData from "../../../questions.json";
import { useContext, useEffect, useRef, useState } from "react";
import QuizContext from "../../Context/QuizContext";
import greatSkillCheck from "../../assets/greatSkillCheck.mp3";

const Quiz = () => {
  const [question, setQuestion] = useState([]); //set quiz to empty array
  const [currentQuestion, setCurrentQuestion] = useState(0); //set current question to 0
  const [visible, setVisible] = useState(false);
  const [answer, setAnswer] = useState();
  const [score, setScore] = useState(0);
  const { isStarted } = useContext(QuizContext);

  //audio code
  const correctAnswerAudioRef = useRef(null);

  useEffect(() => {
    correctAnswerAudioRef.current = new Audio(greatSkillCheck);
  });

  ////End Audio Code ////////////

  //set quiz questions on load
  useEffect(() => {
    //randomize questions
    if (quizData && quizData.length > 0) {
      //check if quizData exists and isn't empty
      let randomNumber = Math.floor(Math.random() * quizData.length); //logic to randomize questions
      setQuestion(quizData[randomNumber]); //set question to a randomly picked question
    }
  }, [quizData]);

  //fade in animation for quiz start
  useEffect(() => {
    if (isStarted) {
      setTimeout(() => {
        setVisible(true);
      }, 150);
    } else {
      setVisible(false);
    }
  }, [isStarted]);

  const handleCorrectAudio = () => {
    if (correctAnswerAudioRef.current) {
      correctAnswerAudioRef.current.volume = 0.03;
      correctAnswerAudioRef.current.play();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answer);

    //check is correct answer was chosen
    if (answer === question.correctAnswer) {
      handleCorrectAudio();
      setScore((prevScore) => prevScore + 1000); //add a point to previous score
    } else if (answer !== question.correctAnswer) {
      setScore((prevScore) => prevScore - 500);
    }

    //move on to next question
    setCurrentQuestion(currentQuestion + 1);

    //set answer
    setAnswer("");
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <form
      className={`quiz ${visible ? "quiz__visible" : ""}`}
      onSubmit={handleSubmit}
    >
      <h2 className="quiz__question-counter">{currentQuestion + 1}</h2>
      <h3 className="quiz__question">
        {question ? question.question : "Loading..."}
      </h3>

      <ul className="quiz__options">
        {question && question.options ? ( //if quiz and quiz.options has values. Short circuit rendering
          question.options.map(
            //render quiz and option
            (
              option,
              index //map each in item
            ) => (
              <li key={index} className="quiz__option">
                <label>
                  <input
                    type="radio"
                    name="quiz-option" // Ensures only one selection per question
                    value={option} //set value to user selected input
                    className="quiz__custom-radio"
                    onChange={handleAnswerChange}
                  />
                  {option}
                  <span className="quiz__custom-radio"></span>{" "}
                  {/* Custom styling */}
                </label>
              </li>
            )
          )
        ) : (
          //otherwise, render 'loading'
          <li className="quiz__loading">Loading Options...</li>
        )}
      </ul>

      {/* Submit button */}
      <button type="submit" className="quiz__submit-btn">
        Submit Answer
      </button>

      <p>BloodPoints: {score}</p>
    </form>
  );
};

export default Quiz;
