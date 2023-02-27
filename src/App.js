import "./App.css";
import { selectValue } from "./reducers/countDown";
import { useSelector, useDispatch } from "react-redux";
import AnimationInput from "./components/AnimationInput";
import AnimationTimer from "./components/AnimationTimer";
import CountdownTimerButtons from "./components/CountdownTimerButtons";
import { STATES } from "./constants";

function App() {
  const dispatch = useDispatch();
  const countDownValue = useSelector(selectValue);

  return (
    <div className="App">
      <header className="App-header">
        <div className="parent-div">
          {countDownValue.state === STATES.initial ? null : (
            <AnimationTimer
              initialTime={countDownValue.initialTime}
              paused={countDownValue.paused}
              timedOut={
                countDownValue.time === 0 ? <span>TIMED OUT</span> : null
              }
            />
          )}
        </div>
        <AnimationInput
          state={countDownValue.state}
          paused={countDownValue.paused}
          time={countDownValue.time}
          dispatch={dispatch}
        />
        <CountdownTimerButtons
          countDownValue={countDownValue}
          dispatch={dispatch}
        />
      </header>
    </div>
  );
}

export default App;
