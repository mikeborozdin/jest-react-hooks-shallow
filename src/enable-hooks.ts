import mockUseEffect from "./mock-use-effect/mock-use-effect";

interface Jest {
  requireActual: (module: string) => object;
  mock: (module: string, mock: object) => void;
}

interface React {
  useEffect: (...args: unknown[]) => unknown;
  useLayoutEffect: (...args: unknown[]) => unknown;
}

interface EnableHooksOptions {
  dontMockByDefault: boolean;
}

let originalUseEffect: (...args: unknown[]) => unknown;
let originalUseLayoutEffect: (...args: unknown[]) => unknown;

const useEffectMock = jest.fn();
const useLayoutEffectMock = jest.fn();

const enableHooks = (jestInstance: Jest, { dontMockByDefault }: EnableHooksOptions = { dontMockByDefault: false }): void => {
  const react = jestInstance.requireActual('react') as React;

  originalUseEffect = react.useEffect;
  originalUseLayoutEffect = react.useLayoutEffect;

  if (dontMockByDefault) {
    useEffectMock.mockImplementation(originalUseEffect);
    useLayoutEffectMock.mockImplementation(originalUseLayoutEffect);
  } else {
    useEffectMock.mockImplementation(mockUseEffect());
    useLayoutEffectMock.mockImplementation(mockUseEffect());
  }

  jestInstance.mock('react', () => ({
    ...react,
    useEffect: useEffectMock,
    useLayoutEffect: useLayoutEffectMock,
  }));
};

const withHooks = (testFn: () => void): void => {
  useEffectMock.mockImplementation(mockUseEffect());
  useLayoutEffectMock.mockImplementation(mockUseEffect());

  try {
    testFn();
  } finally {
    useEffectMock.mockImplementation(originalUseEffect);
    useLayoutEffectMock.mockImplementation(originalUseLayoutEffect);
  }
};

const withoutHooks = (testFn: () => void): void => {
  if (!originalUseEffect) {
    throw new Error('Cannot call `disableHooks()` if `enableHooks()` has not been invoked')
  }

  useEffectMock.mockImplementation(originalUseEffect);
  useLayoutEffectMock.mockImplementation(originalUseLayoutEffect);

  try {
    testFn();
  } finally {
    useEffectMock.mockImplementation(mockUseEffect());
    useLayoutEffectMock.mockImplementation(mockUseEffect());
  }
};

/**
 * @deprecated
 */
const disableHooks = (): void => {
  console.warn('`disableHooks()` is deprecated. Please, use `withoutHooks()` instead');

  if (!originalUseEffect) {
    throw new Error('Cannot call `disableHooks()` if `enableHooks()` has not been invoked')
  }

  useEffectMock.mockImplementation(originalUseEffect);
  useLayoutEffectMock.mockImplementation(originalUseLayoutEffect);
};

const reenableHooks = (): void => {
  console.warn('`reenableHooks()` is deprecated.');

  useEffectMock.mockImplementation(mockUseEffect());
  useLayoutEffectMock.mockImplementation(mockUseEffect());
};

export default enableHooks;

export { disableHooks, reenableHooks, withHooks, withoutHooks };
