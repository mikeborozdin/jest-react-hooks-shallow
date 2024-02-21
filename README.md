vitest-react-hooks-shallow
====
Short Story
====

This package makes React Hooks (namely, `useEffect()` and `useLayoutEffect()`) work with shallow rendering. In other words, you can use enzyme. Yay!

This is a fork of [jest-react-hooks-shallow](https://github.com/mikeborozdin/jest-react-hooks-shallow/blob/master/README.md), with minor adjustments to support vitest instead of jest. It was created for the specific scenario where you're still relying on shallow testing with the outdated enzyme, but are using the more modern, vitest, as your testing framework.

Installation
====

Just install this package with

```
npm install --save-dev vitest-react-hooks-shallow
# or
yarn add --dev vitest-react-hooks-shallow
```

 and add these lines to your vitest setup file (specified by `setupFiles`):

```js
import enableHooks from 'vitest-react-hooks-shallow';
import { vi } from 'vitest'; // or use globals

// pass the vi instance vi to `enableHooks()`
await enableHooks(vi);
```

And voilà - `useEffect()` and `useLayoutEffect()` will work with shallow rendering. From this moment on your test don't need to know anything about `useEffect()`. After all, it's a mere implementation detail.

For full documentation, refer to the [jest-react-hooks-shallow repository](https://github.com/mikeborozdin/jest-react-hooks-shallow/blob/master/README.md).

