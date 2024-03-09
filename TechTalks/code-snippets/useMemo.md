# useMemo

## Skipping expensive recalculations

Signature: `useMemo(calculateValue, dependencies)`


```tsx
import { useMemo } from 'react';

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  return visibleTodos.map(todo => <Todo key={todo.id} todo={todo} />)
}
```


## Skipping re-rendering of components

```tsx
import { memo, useMemo } from 'react';

const List = memo(function List({ items }) {});

export default function TodoList({ todos, tab, theme }) {
  // Tell React to cache your calculation between re-renders...
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...so as long as these dependencies don't change...
  );
  return (
    <div className={theme}>
      {/* ...List will receive the same props and can skip re-rendering */}
      <List items={visibleTodos} />
    </div>
  );
}
```

### Memoize JSX nodes

```tsx
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos]);
return <Container>{children}</Container>;
```



## Memoizing a dependency of another Hook

```tsx
function Dropdown({ allItems, text }) {
  const visibleItems = useMemo(() => {
    const searchOptions = { matchMode: 'whole-word', text };
    return searchItems(allItems, searchOptions);
  }, [allItems, text]); // ✅ Only changes when allItems or text changes
}
```


## Memoizing an event handler

```tsx
export default function Page({ productId, referrer }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + product.id + '/buy', {
      referrer,
      orderDetails
    });
  }, [productId, referrer]);

  return <Form onSubmit={handleSubmit} />;
}
```
