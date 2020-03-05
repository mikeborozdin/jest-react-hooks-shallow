import mockUseEffect from './mock-use-effect';

describe('mock-use-effect', () => {
  test('calls `function` multiple times if no dependencies', () => {
    const fn = jest.fn();

    const useEffect = mockUseEffect();

    useEffect(fn);
    useEffect(fn);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('calls `function` once if dependencies do not change', () => {
    const fn = jest.fn();

    const useEffect = mockUseEffect();

    const dep = true;

    useEffect(fn, [dep]);
    useEffect(fn, [dep]);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('calls `function` again if dependencies change', () => {
    const fn = jest.fn();

    const useEffect = mockUseEffect();

    let dep = true;

    useEffect(fn, [dep]);

    dep = false;

    useEffect(fn, [dep]);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  /**
   * This also tests that `useEffect()` differentiates between different arrow functions
   */
  test('calls different functions even if they have same dependencies', () => {
    let fn1CalledTimes = 0;
    const fn1 = (): void => { fn1CalledTimes++ };

    let fn2CalledTimes = 0;
    const fn2 = (): void => { fn2CalledTimes++ };

    const useEffect = mockUseEffect();

    const dep = true;

    useEffect(fn1, [dep]);
    useEffect(fn2, [dep]);

    expect(fn1CalledTimes).toBe(1);
    expect(fn2CalledTimes).toBe(1);
  });
});
