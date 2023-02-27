import { useEffect, useMemo } from "react";
import { runningState, timeChange } from "../reducers/countDown";
import { STATES, UPDATE_SPEED, MAX_ALLOWED_TIME_MS } from "../constants";

export default function AnimationInput({
  state,
  onTimeFinish,
  time,
  paused,
  dispatch,
}) {
  const timeToDisplay = useMemo(() => timeFormat(time), [time]);

  const handleStartKey = (e) => {
    if (e.keyCode === 13) {
      dispatch(
        runningState({
          paused: false,
        })
      );
    }
  };

  useEffect(() => {
    if (state === STATES.running && !paused) {
      let prevPerf = performance.now();
      const id = setTimeout(() => {
        const diff = performance.now() - prevPerf;
        const timePassed = time - diff;
        dispatch(
          runningState({
            state: STATES.running,
            time: timePassed < 0 ? 0 : timePassed,
            paused: false,
          })
        );
      }, UPDATE_SPEED);
      return () => {
        clearTimeout(id);
      };
    }
  }, [state, time, paused, dispatch]);

  useEffect(() => {
    if (time === 0 && typeof onTimeFinish === "function") {
      onTimeFinish();
    }
  }, [time, onTimeFinish]);

  const onTimeChange = (e) => {
    const minutes = parseInt(e.target.value.slice(0, 2));
    const seconds = parseInt(e.target.value.slice(3));
    dispatch(
      timeChange({
        minutes,
        seconds,
      })
    );
  };
  return (
    <>
      {state === STATES.initial ? (
        <input
          className="time-input"
          type="time"
          onChange={(e) => onTimeChange(e)}
          onKeyUp={(e) => {
            handleStartKey(e);
          }}
        />
      ) : (
        <span className="time">{timeToDisplay}</span>
      )}
    </>
  );
}

export function timeToObject(timeMs) {
  if (timeMs > MAX_ALLOWED_TIME_MS || timeMs < 0) return null;
  // 3599876
  // 3599,876
  const milliseconds = timeMs % 1000; // 876
  const millisecondsToDisplay = Math.floor(milliseconds / 100); // 8
  let _rest = (timeMs - milliseconds) / 1000; // 3599
  const seconds = _rest % 60; // 59;
  const minutes = (_rest - seconds) / 60; // 59
  return {
    minutes,
    seconds,
    milliseconds: millisecondsToDisplay,
  };
}

export function toDisplayVal(time) {
  return time < 10 ? `0${time}` : time;
}

function timeFormat(timeMs) {
  const o = timeToObject(timeMs);
  if (!o) {
    return "N/A";
  }
  return `${toDisplayVal(o.minutes)}:${toDisplayVal(o.seconds)}.${
    o.milliseconds
  }`;
}
