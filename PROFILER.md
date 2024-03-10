Chrome DevTools React Profiler
==============================

- [Download now 😃](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Hooks lifecycle diagram](https://wavez.github.io/react-hooks-lifecycle/)
- [Blog post 1](https://www.justjeb.com/post/react-profiler)
- [Blog post 2](https://www.zachgollwitzer.com/posts/lifecycle-of-react-component)


## Settings

Some interesting settings of the Profiler.

- General > Theme: Light vs Dark
- General > Highlight updates when components render
- Components > Hide components where: create custom output filters
- Profiler > Hide commits below x (ms)


## Profiler Bar Colors

- **Grey**: a component that did not render during this commit but is part of the rendering path (e.g. App didn't render but it is a parent of FilterableList which did render).
- **Grey gradient stripes** - a component that did not render during this commit and also is not part of the rendering path (e.g. Header didn't render but it also doesn't have any children that did render)



## Render vs Commit

[React Fiber](https://github.com/acdlite/react-fiber-architecture)
reconciliation algorithm (DOM<->VirtualDOM) phases happen after a Trigger:

- **Render Phase**: diff algorithm determines the minimal changes that need to happen
- **Commit Phase**: React inserts, updates, and removes DOM nodes.


### Commit Priority Levels

[Source Code](https://github.com/facebook/react/blob/main/packages/scheduler/src/SchedulerPriorities.js)

```ts
export const NoPriority = 0;
export const ImmediatePriority = 1;
export const UserBlockingPriority = 2;
export const NormalPriority = 3;
export const LowPriority = 4;
export const IdlePriority = 5;
```

From ChatGPT, in howfar is this correct ;)

- **Immediate Priority**: Highest priority for tasks such as handling user input.
- **UserBlocking Priority**: Tasks essential for maintaining a smooth user experience, like rendering updates that must complete before the user can interact with the application.
- **Normal Priority**: Default priority for most tasks that can be deferred without negatively impacting the user experience.
- **Low Priority**: Lower priority for background tasks or optimizations.
- **Idle Priority**: Lowest priority level, indicating tasks that can be performed during idle periods when the browser is not handling more critical work.



## Durations

- `Render`: See above
- `Layout effects`: `useLayoutEffect`
- `Passive effects`: `useEffect`

[More info on effects](https://github.com/reactwg/react-18/discussions/46#discussioncomment-847365)

### useLayoutEffect

[docs](https://react.dev/reference/react/useLayoutEffect)

`useLayoutEffect` is a version of `useEffect` that fires before the browser repaints the screen.

- `useLayoutEffect` blocks the browser from repainting
- `useEffect` does not block the browser


Example: [Measuring layout before the browser repaints the screen](https://react.dev/reference/react/useLayoutEffect#measuring-layout-before-the-browser-repaints-the-screen)

Depending on the content of a tooltip, you want to render it on top/bottom/left/right.

```ts
function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0); // You don't know real height yet

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height); // Re-render now that you know the real height
  }, []);

  // ...use tooltipHeight in the rendering logic below...
}
```
