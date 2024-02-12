import mockUseEffect from "./mock-use-effect/mock-use-effect";
import { vi, beforeEach, type VitestUtils } from 'vitest';

interface React {
  useEffect: (...args: unknown[]) => unknown;
  useLayoutEffect: (...args: unknown[]) => unknown;
}

interface EnableHooksOptions {
  dontMockByDefault: boolean;
}

const mocksPromise = vi.hoisted(async () => {
  const react = await vi.importActual<React>('react');
  return {
    useEffect: vi.fn().mockImplementation(react.useEffect),
    useLayoutEffect: vi.fn().mockImplementation(react.useLayoutEffect),
  };
});

vi.mock('react', async (importOriginal) => {
  const [mocks, originalReact] = await Promise.all([
    mocksPromise,
    importOriginal<React>(),
  ]);
  return {
    ...originalReact,
    useEffect: mocks.useEffect,
    useLayoutEffect: mocks.useLayoutEffect,
  };
});


let originalUseEffect: (...args: unknown[]) => unknown;
let originalUseLayoutEffect: (...args: unknown[]) => unknown;

const enableHooks = async (viInstance: VitestUtils, { dontMockByDefault }: EnableHooksOptions = { dontMockByDefault: false }) => {
  const react = await viInstance.importActual('react') as React;
  originalUseEffect = react.useEffect;
  originalUseLayoutEffect = react.useLayoutEffect;

  beforeEach(async () => {
    const mocks = await mocksPromise;
    if (!dontMockByDefault) {
      mocks.useEffect.mockImplementation(mockUseEffect());
      mocks.useLayoutEffect.mockImplementation(mockUseEffect());
    }
  });
};

const withHooks = async (testFn: () => void) => {
  const mocks = await mocksPromise;
  mocks.useEffect.mockImplementation(mockUseEffect());
  mocks.useLayoutEffect.mockImplementation(mockUseEffect());

  try {
    testFn();
  } finally {
    mocks.useEffect.mockImplementation(originalUseEffect);
    mocks.useLayoutEffect.mockImplementation(originalUseLayoutEffect);
  }
};

const withoutHooks = async (testFn: () => void) => {
  if (!originalUseEffect) {
    throw new Error('Cannot call `disableHooks()` if `enableHooks()` has not been invoked')
  }

  const mocks = await mocksPromise;
  mocks.useEffect.mockImplementation(originalUseEffect);
  mocks.useEffect.mockImplementation(originalUseLayoutEffect);

  try {
    testFn();
  } finally {
    mocks.useEffect.mockImplementation(mockUseEffect());
    mocks.useEffect.mockImplementation(mockUseEffect());
  }
};

export default enableHooks;

export { withHooks, withoutHooks };
