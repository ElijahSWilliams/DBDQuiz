import { useEffect, useState, useRef } from "react";
import lullaby from "../../assets/huntressLullaby.mp3";
import "./Entry.css";

const Entry = () => {
  const [isPlaying, setIsPlaying] = useState(false); //state for audio, set to false initially
  const audioRef = useRef(null); // audioRef is used to hold a reference to the <audio> object
  //so you can control it (play, pause, etc.) directly without causing re-renders of the component.

  useEffect(() => {
    audioRef.current = new Audio(lullaby); //create audio object and assign it to audioRef.current
  }, []);

  const handlePlay = () => {
    //check if audio exists
    if (audioRef.current) {
      //if audioref.current exists
      audioRef.current.currentTime = 10; //start the auio at 10 sec
      audioRef.current
        .play() //play audio
        .then(() => {
          setIsPlaying(true); //set isPlaying to true (update state)
        })
        .catch((err) => {
          console.error(err); //catch errors
        });
    }
  };

  return (
    <div className="entry">
      <h1 className="entry__header">Welcome to the DBD Quiz</h1>
      <button onClick={handlePlay} disabled={isPlaying}>
        {isPlaying ? "La La La La" : "Muted"}
      </button>
      <button className="entry__play-btn">Enter</button>
    </div>
  );
};

export default Entry;
