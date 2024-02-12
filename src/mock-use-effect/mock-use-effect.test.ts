import mockUseEffect from './mock-use-effect';
import { vi, describe, test, expect } from 'vitest';

describe('mock-use-effect', () => {
  test('calls `effect` multiple times if no dependencies', () => {
    const fn = vi.fn();

    const useEffect = mockUseEffect();

    useEffect(fn);
    useEffect(fn);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  test('calls `effect` once if dependencies do not change', () => {
    const fn = vi.fn();

    const useEffect = mockUseEffect();

    const dep = true;

    useEffect(fn, [dep]);
    useEffect(fn, [dep]);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('calls `effect` once if dependencies are an empty array', () => {
    const fn = vi.fn();

    const useEffect = mockUseEffect();

    useEffect(fn, []);
    useEffect(fn, []);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('calls `effect` again if dependencies change', () => {
    const fn = vi.fn();

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

  test('calls cleanup function before another calling the same effect again function', () => {
    const useEffect = mockUseEffect();

    const cleanupFn = vi.fn();

    useEffect(() => cleanupFn);
    useEffect(() => cleanupFn);

    expect(cleanupFn).toHaveBeenCalledTimes(1);
  });

  test('does not call cleanup function if no other `useEffect()` function is called', () => {
    const useEffect = mockUseEffect();

    const cleanupFn = vi.fn();

    useEffect(() => cleanupFn);

    expect(cleanupFn).toHaveBeenCalledTimes(0);
  });

  test('does not call cleanup function before calling another effect', () => {
    const useEffect = mockUseEffect();

    const cleanupFn = vi.fn();

    const firstEffect = () => cleanupFn;
    const secondEffect = () => { vi.fn() };

    useEffect(firstEffect);
    useEffect(secondEffect);

    expect(cleanupFn).toHaveBeenCalledTimes(0);
  });
});
