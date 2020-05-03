import mockUseEffect from "./mock-use-effect/mock-use-effect";

interface Jest {
  requireActual: (module: string) => object;
  mock: (module: string, mock: object) => void;
}

interface React {
  useEffect: (...args: unknown[]) => unknown;
  useLayoutEffect: (...args: unknown[]) => unknown;
}

let originalUseEffect: (...args: unknown[]) => unknown;
let originalUseLayoutEffect: (...args: unknown[]) => unknown;

const useEffectMock = jest.fn().mockImplementation(mockUseEffect());
const useLayoutEffectMock = jest.fn().mockImplementation(mockUseEffect());

const enableHooks = (jestInstance: Jest): void => {
  const react = jestInstance.requireActual('react') as React;

  originalUseEffect = react.useEffect;
  originalUseLayoutEffect = react.useLayoutEffect;

  jestInstance.mock('react', () => ({
    ...react,
    useEffect: useEffectMock,
    useLayoutEffect: useLayoutEffectMock,
  }));
};

const disableHooks = (): void => {
  if (!originalUseEffect) {
    throw new Error('Cannot call `disableHooks()` if `enableHooks()` has not been invoked')
  }

  useEffectMock.mockImplementation(originalUseEffect);
  useLayoutEffectMock.mockImplementation(originalUseLayoutEffect);
};

const reenableHooks = (): void => {
  useEffectMock.mockImplementation(mockUseEffect());
  useLayoutEffectMock.mockImplementation(mockUseEffect());
};

export default enableHooks;

export { disableHooks, reenableHooks };
