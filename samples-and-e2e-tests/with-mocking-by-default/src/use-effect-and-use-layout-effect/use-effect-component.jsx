import React, { useEffect, useState } from 'react';
import callback from './callback';
import cleanup from './cleanup';

const UseEffectComponent = () => {
  const [text, setText] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    console.log('!!!useEffect');
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
