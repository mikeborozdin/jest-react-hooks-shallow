interface Jest {
    requireActual: (module: string) => object;
    mock: (module: string, factory?: () => unknown, options?: {
        virtual?: boolean;
    }) => unknown;
}
interface EnableHooksOptions {
    dontMockByDefault: boolean;
}
declare const enableHooks: (jestInstance: Jest, { dontMockByDefault }?: EnableHooksOptions) => void;
declare const withHooks: (testFn: () => void) => void;
declare const withoutHooks: (testFn: () => void) => void;
/**
 * @deprecated
 */
declare const disableHooks: () => void;
declare const reenableHooks: () => void;
export default enableHooks;
export { disableHooks, reenableHooks, withHooks, withoutHooks };
