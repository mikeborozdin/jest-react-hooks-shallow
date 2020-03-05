type UseEffectSignature = (fn: () => void, triggers?: unknown[]) => void;
type FunctionBody = string;

const noDepsOrDifferent = (previousDependencies: unknown[], currentDependencies: unknown[]): boolean => {
  return previousDependencies === undefined ||
    previousDependencies.some((prevDep, index) => prevDep !== currentDependencies[index]);
}

const mockUseEffect = (): UseEffectSignature => {
  const previousCalls = new Map<FunctionBody, unknown[]>();

  return (fn: () => void, dependencies?: unknown[]): void => {
    const fnBody = fn.toString();

    const shouldCall = previousCalls.has(fnBody) ?
      noDepsOrDifferent(previousCalls.get(fnBody), dependencies) :
      true;

    if (shouldCall) {
      previousCalls.set(fnBody, dependencies);

      fn();
    }
  }
};

export default mockUseEffect;
