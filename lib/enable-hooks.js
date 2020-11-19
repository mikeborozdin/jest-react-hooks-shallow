"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_use_effect_1 = require("./mock-use-effect/mock-use-effect");
let originalUseEffect;
let originalUseLayoutEffect;
const useEffectMock = jest.fn();
const useLayoutEffectMock = jest.fn();
const enableHooks = (jestInstance, { dontMockByDefault } = { dontMockByDefault: false }) => {
    const react = jestInstance.requireActual('react');
    originalUseEffect = react.useEffect;
    originalUseLayoutEffect = react.useLayoutEffect;
    beforeEach(() => {
        if (dontMockByDefault) {
            useEffectMock.mockImplementation(originalUseEffect);
            useLayoutEffectMock.mockImplementation(originalUseLayoutEffect);
        }
        else {
            useEffectMock.mockImplementation(mock_use_effect_1.default());
            useLayoutEffectMock.mockImplementation(mock_use_effect_1.default());
        }
    });
    jestInstance.mock('react', () => (Object.assign(Object.assign({}, react), { useEffect: useEffectMock, useLayoutEffect: useLayoutEffectMock })));
};
const withHooks = (testFn) => {
    useEffectMock.mockImplementation(mock_use_effect_1.default());
    useLayoutEffectMock.mockImplementation(mock_use_effect_1.default());
    try {
        testFn();
    }
    finally {
        useEffectMock.mockImplementation(originalUseEffect);
        useLayoutEffectMock.mockImplementation(originalUseLayoutEffect);
    }
};
exports.withHooks = withHooks;
const withoutHooks = (testFn) => {
    if (!originalUseEffect) {
        throw new Error('Cannot call `disableHooks()` if `enableHooks()` has not been invoked');
    }
    useEffectMock.mockImplementation(originalUseEffect);
    useLayoutEffectMock.mockImplementation(originalUseLayoutEffect);
    try {
        testFn();
    }
    finally {
        useEffectMock.mockImplementation(mock_use_effect_1.default());
        useLayoutEffectMock.mockImplementation(mock_use_effect_1.default());
    }
};
exports.withoutHooks = withoutHooks;
/**
 * @deprecated
 */
const disableHooks = () => {
    console.warn('`disableHooks()` is deprecated. Please, use `withoutHooks()` instead');
    if (!originalUseEffect) {
        throw new Error('Cannot call `disableHooks()` if `enableHooks()` has not been invoked');
    }
    useEffectMock.mockImplementation(originalUseEffect);
    useLayoutEffectMock.mockImplementation(originalUseLayoutEffect);
};
exports.disableHooks = disableHooks;
const reenableHooks = () => {
    console.warn('`reenableHooks()` is deprecated.');
    useEffectMock.mockImplementation(mock_use_effect_1.default());
    useLayoutEffectMock.mockImplementation(mock_use_effect_1.default());
};
exports.reenableHooks = reenableHooks;
exports.default = enableHooks;
//# sourceMappingURL=enable-hooks.js.map