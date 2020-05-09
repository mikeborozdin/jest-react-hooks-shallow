import * as React from 'react';
import * as ReactDOM from 'react-dom';
import UseEffectComponent from './use-effect/use-effect-component';

ReactDOM.render(
  <UseEffectComponent />,
  document.getElementById('app'),
);

module.hot.accept();
