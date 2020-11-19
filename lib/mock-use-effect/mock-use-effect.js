"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const noDepsOrDifferent = (previousDependencies, currentDependencies) => {
    return previousDependencies === undefined ||
        previousDependencies.some((prevDep, index) => prevDep !== currentDependencies[index]);
};
const mockUseEffect = () => {
    const previousCalls = new Map();
    const cleanupFunctions = new Map();
    previousCalls.clear();
    cleanupFunctions.clear();
    return (effect, dependencies) => {
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
    };
};
exports.default = mockUseEffect;
//# sourceMappingURL=mock-use-effect.js.map