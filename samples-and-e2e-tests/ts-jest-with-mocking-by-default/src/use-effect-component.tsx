import React, { useEffect, useState } from "react";
import callback from "./callback";
import cleanup from "./cleanup";

const UseEffectComponent = () => {
  const [text, setText] = useState<string>("");
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    setText(`Button pressed: ${buttonClicked.toString()}`);

    callback();

    return cleanup;
  }, [buttonClicked]);

  return (
    <div>
      <div>{text}</div>
      <button onClick={() => setButtonClicked(true)}>Press me</button>
    </div>
  );
};

export default UseEffectComponent;
