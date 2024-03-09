useDebug
========

[Docs](https://react.dev/reference/react/useDebugValue)


```tsx
import { useDebugValue } from 'react';

function useOnlineStatus() {
  // ...
  useDebugValue(isOnline ? 'Online' : 'Offline');
  // ...
}
```

See `useDebug.png` for how it would look like in Dev Tools "Components" tab.
