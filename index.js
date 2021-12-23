const audioClips = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  const [volume, setVolume] = React.useState(0.5);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(0.5);
  const [showType, setShowType] = React.useState("none");
  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split("");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, speed * 600);
    setTimeout(
      () => clearInterval(interval),
      600 * speed * recordArray.length - 1
    );
  };
  return (
    <div className="bg-secondary bg-gradient min-vh-100" id="drum-machine">
      <div className="text-center border border-secondary">
        <h2>Drum Machine</h2>
        {audioClips.map((clip) => (
          <Pad
            key={clip.id}
            clip={clip}
            volume={volume}
            setRecording={setRecording}
            setShowType={setShowType}
          />
        ))}
        ;
        <br />
        <h3>Volume</h3>
        <button onClick={(r) => setVolume(0)}>
          <i className="bi bi-volume-mute-fill"></i>
        </button>
        <input
          type="range"
          step="0.01"
          onChange={(r) => setVolume(r.target.value)}
          value={volume}
          max="1"
          min="0"
          className="w-50"
        />
        <br />
        <div className="card">
          <div className="card-body">
            <h3 id="display" className="text-center">
              {showType}
            </h3>
          </div>
        </div>
        <br />
        <h4>{recording}</h4>
        {recording && (
          <>
            <button className="btn btn-success" onClick={playRecording}>
              Re-Play
            </button>
            <button
              className="btn btn-warning"
              onClick={() => setRecording("")}
            >
              Clear
            </button>
            <br />
            <h4>Interval</h4>
            <input
              type="range"
              step="0.01"
              onChange={(r) => setSpeed(r.target.value)}
              value={speed}
              max="1.2"
              min="0.1"
              className="w-50"
            />
          </>
        )}
        <footer className="text-center">
          <h5>Made by Tegar D Pradana, credit to Landon Schlangen</h5>
        </footer>
      </div>
    </div>
  );
}

//Pad function is the main properties how to use this app,

function Pad({ clip, volume, setRecording, setShowType }) {
  //function playSound will took elementby ID from database , on this case we took triggerKey as the trigger to play Sound which can be accesed by pressing key on the keyboard or clicked by mouse
  const [active, setActive] = React.useState(false);
  function playSound() {
    const audioTag = document.getElementById(clip.keyTrigger);

    //for every mapped database, which get triggered by keyTrigger then it will procceded by curenttime and play
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audioTag.currentTime = 0;
    audioTag.volume = volume;
    audioTag.play();
    setShowType(clip.id);
    setRecording((prev) => prev + clip.keyTrigger + "");
  }

  //handlePressKey has a function to activate playsound when you press triggerkey on the keyboard
  function handleKeyPress(r) {
    if (r.keyCode === clip.keyCode) {
      playSound();
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <button
      onClick={playSound}
      className="drum-pad btn btn-dark p-4 m-3"
      id={clip.id}
    >
      <audio className="clip" id={clip.keyTrigger} src={clip.url}></audio>
      {clip.keyTrigger}
    </button>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
