import mockUseEffect from './mock-use-effect';

describe('mock-use-effect', () => {
  test('calls `effect` multiple times if no dependencies', () => {
    const fn = jest.fn();

    const useEffect = mockUseEffect();

    useEffect(fn);
    useEffect(fn);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('calls `effect` once if dependencies do not change', () => {
    const fn = jest.fn();

    const useEffect = mockUseEffect();

    const dep = true;

    useEffect(fn, [dep]);
    useEffect(fn, [dep]);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('calls `effect` once if dependencies are an empty array', () => {
    const fn = jest.fn();

    const useEffect = mockUseEffect();

    useEffect(fn, []);
    useEffect(fn, []);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('calls `effect` again if dependencies change', () => {
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
  test('calls different `effects` even if they have same dependencies', () => {
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

  test('calls cleanup function before another calling another `useEffect()` function', () => {
    const useEffect = mockUseEffect();

    const cleanupFn = jest.fn();

    useEffect(() => cleanupFn);
    useEffect(() => { jest.fn(); });

    expect(cleanupFn).toHaveBeenCalledTimes(1);
  });

  test('does not call cleanup function if no other `useEffect()` function is called', () => {
    const useEffect = mockUseEffect();

    const cleanupFn = jest.fn();

    useEffect(() => cleanupFn);

    expect(cleanupFn).toHaveBeenCalledTimes(0);
  });

  test('calls cleanup function before another calling another `useEffect()` with different dependencies function', () => {
    const useEffect = mockUseEffect();

    const cleanupFn = jest.fn();

    const firstEffect = (): Function => cleanupFn();
    // second effect function should have a different body
    // that's to avoid the algorithm thinking it's the same function but in different
    // rendering passes
    const secondEffect = (): Function => { jest.fn(); return cleanupFn; };

    useEffect(firstEffect);

    const dep = true;

    useEffect(secondEffect, [dep]);

    expect(cleanupFn).toHaveBeenCalledTimes(1);
  });

  test('calls a cleanup function with no deps on every render pass', () => {
    const useEffect = mockUseEffect();

    const cleanupFn = jest.fn();

    const firstEffect = (): Function => cleanupFn;
    const secondEffect = (): Function => { jest.fn(); return cleanupFn(); };

    // first render pass
    useEffect(firstEffect);
    const dep = true;
    useEffect(secondEffect, [dep]);

    // second render pass
    useEffect(firstEffect);

    expect(cleanupFn).toHaveBeenCalledTimes(3);
  });
});
