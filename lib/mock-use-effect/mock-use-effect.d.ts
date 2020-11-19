declare type UseEffectSignature = (fn: () => void, triggers?: unknown[]) => void;
declare const mockUseEffect: () => UseEffectSignature;
export default mockUseEffect;
