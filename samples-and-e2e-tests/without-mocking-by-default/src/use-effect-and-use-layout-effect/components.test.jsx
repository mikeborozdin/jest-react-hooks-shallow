import React from 'react';
import { shallow, mount } from 'enzyme';
import UseEffectComponent from './use-effect-component';
import UseLayoutEffectComponent from './use-layout-effect-component';
import callback from './callback';
import cleanup from './cleanup';
import { withHooks } from 'vitest-react-hooks-shallow';

vi.mock('./callback', () => ({ default: vi.fn() }));
vi.mock('./cleanup', () => ({ default: vi.fn() }));

const tests = (Component) => {
  test('effect is not called when not using withHooks', () => {
    const component = shallow(<Component />);

    expect(component.text()).toContain('Press me');
    expect(callback).not.toHaveBeenCalled();
  });

  test('effect is called on first render and then on a button press', async () => {
    await withHooks(() => {
      const component = shallow(<Component />);

      expect(component.text()).toContain('false');
      component.find('button').simulate('click');
      expect(component.text()).toContain('true');
    });
  });

  test('effect is mockable', async () => {
    await withHooks(() => {
      const component = shallow(<Component />);

      expect(component.text()).toContain('false');

      expect(callback).toHaveBeenCalledTimes(1);

      component.find('button').simulate('click');

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  test('effects mockable when used with mount() and without withHooks', () => {
    const component = mount(<Component />);

    expect(component.text()).toContain('false');

    expect(callback).toHaveBeenCalledTimes(1);

    component.find('button').simulate('click');

    expect(callback).toHaveBeenCalledTimes(2);

  });

  test('cleanup function', async () => {
    await withHooks(() => {
      expect(cleanup).toHaveBeenCalledTimes(0);

      const component = shallow(<Component />);

      component.find('button').simulate('click');

      expect(cleanup).toHaveBeenCalledTimes(1);
    });
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
