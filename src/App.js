import React, { Fragment, useState, useRef, useEffect } from "react";

function Solution() {
  const [time, setTime] = useState({
    mm: 0,
    ss: 0,
  });
  const [action, setAction] = useState("");
  const Ref = useRef(null);

  const clearCountdown = () => {
    if (Ref.current) clearInterval(Ref.current);
    const interval =
      time.mm > 0 || time.ss > 0
        ? setInterval(() => {
            if (time.ss > 0) {
              setTime({ ...time, ss: time.ss - 1 });
            } else {
              setTime({ ss: 60, mm: time.mm - 1 });
            }
          }, 1000)
        : null;
    Ref.current = interval;
  };

  useEffect(() => clearCountdown(), [time]);

  let mmInput = React.createRef();
  let ssInput = React.createRef();
  const formatTime = (data) => {
    let output = data < 10 ? "0" + data : data;
    return output;
  };

  const parseRawString = (timeInput) => {
    let formattedTime = formatTime(timeInput.mm) + formatTime(timeInput.ss);
    return formattedTime;
  };

  const handleClick = (e) => {
    setAction(e.target.name);
    if (e.target.name === "start") {
      setTime({
        mm: parseInt(mmInput.current.value),
        ss: parseInt(ssInput.current.value),
      });
    } else if (e.target.name === "pause") {
      //If already pause was clicked, perform resume action
      if (action === "pause") {
        clearCountdown();
        setAction("resume");
      } else {
        clearInterval(Ref.current);
      }
    } else {
      setTime({ mm: 0, ss: 0 });
      mmInput.current.value = 0;
      ssInput.current.value = 0;
    }
  };

  let timeString = parseRawString(time);

  return (
    <Fragment>
      <label>
        <input type="number" ref={mmInput} />
        Minutes
      </label>
      <label>
        <input type="number" ref={ssInput} />
        Seconds
      </label>

      <button name="start" onClick={handleClick} disabled={action}>
        START
      </button>
      <button name="pause" onClick={handleClick}>
        PAUSE / RESUME
      </button>
      <button name="reset" onClick={handleClick}>
        RESET
      </button>

      <h1 data-testid="running-clock">
        {timeString.substring(0, 2) + ":" + timeString.substring(2, 4)}
      </h1>
    </Fragment>
  );
}

export default Solution;
