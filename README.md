jest-react-hooks-shallow
====

Short Story
====

This package makes React Hooks (namely, `useEffect()` and `useLayoutEffect()`) work with shallow rendering. In other words, you can use enzyme. Yay! 

Installation
====

Just install this package with

```
npm install --save-dev jest-react-hooks-shallow
# or
yarn add --dev jest-react-hooks-shallow
```

 and add these lines to your Jest setup file (specified by `setupFilesAfterEnv`):

```js 
import enableHooks from 'jest-react-hooks-shallow;

// pass an instance of jest to `enableHooks()`
enableHooks(jest);
```

And voilà - `useEffect()` and `useLayoutEffect()` will work with shallow rendering. From this moment on your test don't need to know anything about `useEffect()`. After all, it's a mere implementation detail.

Testing
====

So if you have a component like this:

```js
const ComponentWithHooks = () => {
  const [text, setText] = useState<>();
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  useEffect(() => setText(
    `Button clicked: ${buttonClicked.toString()}`), 
    [buttonClicked]
  );

  return (
    <div>
      <div>{text}</div>
      <button onClick={() => setButtonClicked(true)}>Click me</button>
    </div>
  );
};
```

You can easily test it with code like this:

```js
test('Renders default message and updates it on clicking a button', () => {
  const component = shallow(<App />);

  expect(component.text()).toContain('Button clicked: false');

  component.find('button').simulate('click');

  expect(component.text()).toContain('Button clicked: true');
});
```

Please note, that those tests didn't have to import anything else. They simply don't know that a component calls `useEffect()`. Yet, it's being called when you invoke `shallow()`.

That said, often you want to test that a specific function has been called on some event. For example, you're calling a Redux action creator or a Mobx action. If you're using React Hooks, chances are you'll pass that function as a callback to `useEffect()`.

No problems! You can easily test it with simple Jest mocks.

Say, we have a component like this:

```js
import someAction from './some-action';

const ComponentWithHooks = () => {
  const [text, setText] = useState<>();
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  useEffect(someAction, [buttonClicked]);

  return (
    <div>
      <div>{text}</div>
      <button onClick={() => setButtonClicked(true)}>Click me</button>
    </div>
  );
};
```

```js
test('Calls `myAction()` on the first render and on clicking the button`', () => {
  const component = shallow(<App />);
  expect(callback).toHaveBeenCalledTimes(1);

  component.find('button').simulate('click');
  expect(callback).toHaveBeenCalledTimes(2);
});
```

Dependencies
====

This library expects that you use Jest as a testing library. 

Frankly speaking, you don't have to use enzyme, as it's not the only library which providers shallow rendering. In fact, it doesn't even implement shadow rendering. See the Long Story for details.

Hooks Support Status
====
|Hook|Support|
|-----|------|
|`useEffect`|✅|
|`useLayoutEffect`|✅|
|`useImperativeHandle`|Coming soon|
|`useDebugValue`|No support plans|

All other hooks (e.g. `useState()`, `useReducer()`) already work with shallow rendering.


Long Story
====

Context
----

In case, you wonder why I have created this package instead of extending enzyme, here's a slightly longer story.

Actually, it's not enzyme's per se fault that `useEffect()` doesn't work in shallow rendering. It relies on `react-test-renderer` for some aspects of shallow rendering. And it is `react-test-renderer` that implements certain hooks, like `useState()` and does not implement the other ones (e.g. `useEffect()`).

Now, `react-test-renderer` is part of the React library. And there is a [PR](https://github.com/facebook/react/pull/16168) that brings `useEffect()` to shallow rendering. However, that PR has been closed by Facebook. 

According to the comments on the same PR, there are plans to spin off `react-test-renderer` as a separate package. And indeed, the `master` branch of React does have it as an NPM dependency. However, all currently released versions of React have `react-test-renderer` built-in.

Once it's a standalone package, I believe it'll be easier to merge the said PR and the need for this library will go away.

How this Library is Implemented
----

If someone wonders how this library is implemented, then we just provide a naïve implementation of `useEffect()`. After all, it's just a function that takes two arguments and executes the first one, if the values of the second argument change (or the function is called for the first time with them or the second argument is undefined).

Okay, the actual implementation of React does have knowledge on whether it's the first render or the second. 

We don't, so we have to rely on mapping callback functions to a list of dependencies (the second argument). If `useEffect()` is called with the same function, but with different dependency values, we will execute that function.
