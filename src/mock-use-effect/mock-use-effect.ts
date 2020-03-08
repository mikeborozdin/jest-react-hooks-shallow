type UseEffectSignature = (fn: () => void, triggers?: unknown[]) => void;
type FunctionBody = string;
type CleanupFunction = () => void;

const noDepsOrDifferent = (previousDependencies: unknown[], currentDependencies: unknown[]): boolean => {
  return previousDependencies === undefined ||
    previousDependencies.some((prevDep, index) => prevDep !== currentDependencies[index]);
}

const mockUseEffect = (): UseEffectSignature => {
  const previousCalls = new Map<FunctionBody, unknown[]>();
  const cleanupFunctions: CleanupFunction[] = [];

  return (effect: () => CleanupFunction | void, dependencies?: unknown[]): void => {
    const effectBody = effect.toString();

    const shouldCall = previousCalls.has(effectBody) ?
      noDepsOrDifferent(previousCalls.get(effectBody), dependencies) :
      true;

    if (shouldCall) {
      previousCalls.set(effectBody, dependencies);

      cleanupFunctions.forEach(cleanupFunction => cleanupFunction());

      const cleanupFunction = effect();

      if (typeof cleanupFunction === 'function') {
        cleanupFunctions.push(cleanupFunction);
      }
    }
  }
};

export default mockUseEffect;
