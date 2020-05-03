import React from 'react';
import { act } from "react-dom/test-utils";
import { shallow, mount } from 'enzyme';
import UseEffectComponent from './use-effect-component';
import callback from './callback';
import cleanup from './cleanup';
import { disableHooks, reenableHooks } from 'jest-react-hooks-shallow';

jest.mock('./callback', () => jest.fn());
jest.mock('./cleanup', () => jest.fn())

describe('useEffect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('effect is called on first render and then on a button press', () => {
    const component = shallow(<UseEffectComponent />);

    expect(component.text()).toContain('false');
    component.find('button').simulate('click');
    expect(component.text()).toContain('true');
  });

  test('effect is mockable', () => {
    const component = shallow(<UseEffectComponent />);

    expect(component.text()).toContain('false');

    expect(callback).toHaveBeenCalledTimes(1);

    component.find('button').simulate('click');

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('effects mockable when used with mount() and disableHooks()', () => {
    disableHooks();

    const component = mount(<UseEffectComponent />);

    expect(component.text()).toContain('false');

    expect(callback).toHaveBeenCalledTimes(1);

    component.find('button').simulate('click');

    expect(callback).toHaveBeenCalledTimes(2);

  });

  test('cleanup function', () => {
    reenableHooks();

    expect(cleanup).toHaveBeenCalledTimes(0);

    const component = shallow(<UseEffectComponent />);

    component.find('button').simulate('click');

    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
