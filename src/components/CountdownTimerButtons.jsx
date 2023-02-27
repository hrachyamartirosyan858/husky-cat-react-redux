import { reset, runningState } from "../reducers/countDown";
import pauseIcon from "../assets/pauseIcon.png";
import playIcon from "../assets/playIcon.png";
import stopIcon from "../assets/stopIcon.png";
import { STATES } from "../constants";

export default function TimerButtons({ countDownValue, dispatch }) {
  return (
    <div className="timer-buttons">
      {countDownValue.state === STATES.initial ? (
        <button
          className="play-button"
          disabled={countDownValue.initialTime === 0}
          onClick={() =>
            dispatch(
              runningState({
                paused: !countDownValue.paused,
              })
            )
          }
        >
          <img src={playIcon} alt="play button" />
        </button>
      ) : (
        <button
          className="pause-button"
          disabled={countDownValue.time === 0}
          onClick={() =>
            dispatch(
              runningState({
                paused: !countDownValue.paused,
              })
            )
          }
        >
          <img
            src={countDownValue.paused ? playIcon : pauseIcon}
            alt={countDownValue.paused ? "play button" : "pause button"}
          />
        </button>
      )}
      <button
        className="reset-button"
        onClick={() => dispatch(reset())}
        disabled={countDownValue.state === STATES.initial}
      >
        <img src={stopIcon} alt="stop button" />
      </button>
    </div>
  );
}
