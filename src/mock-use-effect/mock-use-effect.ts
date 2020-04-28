type UseEffectSignature = (fn: () => void, triggers?: unknown[]) => void;
type FunctionBody = string;
type CleanupFunction = () => void;

const noDepsOrDifferent = (previousDependencies: unknown[], currentDependencies: unknown[]): boolean => {
  return previousDependencies === undefined ||
      (currentDependencies && previousDependencies.length !== currentDependencies.length) ||
    previousDependencies.some((prevDep, index) => prevDep !== currentDependencies[index]);
}

const mockUseEffect = (): UseEffectSignature => {
  const previousCalls = new Map<FunctionBody, unknown[]>();
  // let cleanupFunctions: CleanupFunction[] = [];
  const cleanupFunctions = new Map<string, CleanupFunction>();

  beforeEach(() => {
    previousCalls.clear();
    // cleanupFunctions = [];
    cleanupFunctions.clear();
  });

  return (effect: () => CleanupFunction | void, dependencies?: unknown[]): void => {
    const effectBody = effect.toString();

    const shouldCall = previousCalls.has(effectBody) ?
      noDepsOrDifferent(previousCalls.get(effectBody), dependencies) :
      true;

    if (shouldCall) {
      previousCalls.set(effectBody, dependencies);

      if (cleanupFunctions.has(effectBody)) {
        cleanupFunctions.get(effectBody)();
      }

      const cleanupFunction = effect();

      if (typeof cleanupFunction === 'function') {
        cleanupFunctions.set(effectBody, cleanupFunction);
      }
    }
  }
};

export default mockUseEffect;
