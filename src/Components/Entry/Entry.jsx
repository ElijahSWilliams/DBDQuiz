import { useEffect, useState, useRef, useContext } from "react";
import lullaby from "../../assets/huntressLullaby.mp3";
import drLaugh from "../../assets/drLaugh.mp3";
import skillCheck from "../../assets/dbdSkillCheck.mp3";
import dbdTheme from "../../assets/dbdTheme.mp3";
import "./Entry.css";
import Quiz from "../Quiz/Quiz";
import QuizContext from "../../Context/QuizContext";

const Entry = () => {
  const { isStarted, setIsStarted } = useContext(QuizContext); //subscribe to quiz context
  const [isPlaying, setIsPlaying] = useState(false); //state for audio, set to false initially

  const audioRef = useRef(null); // audioRef is used to hold a reference to the <audio> object audioRef.current is the actual DOM node
  //so you can control it (play, pause, etc.) directly without causing re-renders of the component.
  const startBtnAudioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(dbdTheme); //create audio object and assign it to audioRef.current

    startBtnAudioRef.current = new Audio(
      skillCheck
    ); /*  create audio object and assn it to startBtnAudioRef.current*/
  }, []);

  //cleanup on unmount
  const handlePlay = () => {
    //check if audio exists
    if (audioRef.current) {
      //if audioref.current exists
      if (!isPlaying) {
        //if audio not playing
        audioRef.current.volume = 0.05;
        audioRef.current.currentTime = 0; //start the auio at 10 sec
        audioRef.current.loop = true; //enable audio looping
        audioRef.current
          .play() //play audio
          .then(() => {
            setIsPlaying(true);
            //set isPlaying to true (update state)
          })
          .catch((err) => {
            console.error(err); //catch errors
          });
      } else {
        //if audio is playing
        audioRef.current.pause();
        audioRef.current.currentTime = 10;
        setIsPlaying(false);
      }
    }
  };

  const handleStartAudio = () => {
    //check if audio exists
    if (startBtnAudioRef.current) {
      startBtnAudioRef.current.currentTime = 0.2;

      startBtnAudioRef.current
        .play()
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleStartQuiz = () => {
    handleStartAudio(); //call audio function

    //start quiz
    setIsStarted(true);
  };

  const resetQuiz = () => {
    console.log("Resetting");
    setIsStarted(false);
  };

  return (
    <div className="entry">
      {!isStarted && ( //if quiz not started, render header
        <h1 className="entry__header">The Dead By Daylight Quiz</h1>
      )}

      <button onClick={handlePlay} /* disabled={isPlaying} */>
        {" "}
        {/* set btn text based on isPlaying value */}
        {isPlaying ? "Mute" : "🎶"}
      </button>

      {!isStarted ? ( //if not started, render btn
        <button onClick={handleStartQuiz} className="entry__play-btn">
          Start
        </button>
      ) : (
        //if started, render quiz
        <Quiz />
      )}
    </div>
  );
};

export default Entry;
