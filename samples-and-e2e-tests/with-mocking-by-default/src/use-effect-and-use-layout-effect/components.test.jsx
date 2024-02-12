import React from 'react';
import { shallow, mount } from 'enzyme';
import UseEffectComponent from './use-effect-component';
import UseLayoutEffectComponent from './use-layout-effect-component';
import callback from './callback';
import cleanup from './cleanup';
import { withoutHooks } from 'vitest-react-hooks-shallow';
import { vi, test, describe, beforeEach, expect } from 'vitest';

vi.mock('./callback', () => ({ default: vi.fn() }));
vi.mock('./cleanup', () => ({ default: vi.fn() }));

const tests = (Component) => {
  test('effect is called on first render and then on a button press', () => {
    const component = shallow(<Component />);

    expect(component.text()).toContain('false');
    component.find('button').simulate('click');
    expect(component.text()).toContain('true');
  });

  test('effect is mockable', () => {
    const component = shallow(<Component />);

    expect(component.text()).toContain('false');

    expect(callback).toHaveBeenCalledTimes(1);

    component.find('button').simulate('click');

    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('effects mockable when used with mount() and withoutHooks', async () => {
    await withoutHooks(() => {
      const component = mount(<Component />);

      expect(component.text()).toContain('false');

      expect(callback).toHaveBeenCalledTimes(1);

      component.find('button').simulate('click');

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  test('cleanup function', () => {
    expect(cleanup).toHaveBeenCalledTimes(0);

    const component = shallow(<Component />);

    component.find('button').simulate('click');

    expect(cleanup).toHaveBeenCalledTimes(1);
  });
}

describe('useEffect', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  tests(UseEffectComponent);
});

describe('useLayoutEffect', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  tests(UseLayoutEffectComponent);
});
