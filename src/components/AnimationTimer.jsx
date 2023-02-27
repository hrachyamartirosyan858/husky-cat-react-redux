import { useRef, useEffect } from "react";

export default function AnimationTimer({ initialTime, timedOut, paused }) {
  const animationDivRef = useRef();
  const animationRef = useRef();
  useEffect(() => {
    if (!initialTime) {
      return;
    }
    const keyFrames = new KeyframeEffect(
      animationDivRef.current,
      [{ transform: "translateY(0%)" }, { transform: "translateY(100%)" }],
      { duration: initialTime, fill: "forwards" }
    );

    animationRef.current = new Animation(keyFrames, document.timeline);
  }, [initialTime, animationRef]);

  useEffect(() => {
    if (animationRef.current) {
      if (!paused) {
        animationRef.current.play();
      } else {
        animationRef.current.pause();
      }
    }
  }, [paused]);
  return (
    <>
      <div ref={animationDivRef} className="child-div"></div>
      {timedOut}
    </>
  );
}
