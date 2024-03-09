import { createSelector } from 'reselect'


// -------------------------------------------------------------- BASIC EXAMPLE
const selectShopItems = state => state.shop.items
const selectTaxPercent = state => state.shop.taxPercent

const selectSubtotal = createSelector(
  selectShopItems,
  items => items.reduce((subtotal, item) => subtotal + item.value, 0)
)

const selectTax = createSelector(
  selectSubtotal,
  selectTaxPercent,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
)

const selectTotal = createSelector(
  selectSubtotal,
  selectTax,
  (subtotal, tax) => ({ total: subtotal + tax })
)

const exampleState = {
  shop: {
    taxPercent: 8,
    items: [
      { name: 'apple', value: 1.2 },
      { name: 'orange', value: 0.95 }
    ]
  }
}

console.log(selectSubtotal(exampleState)) // 2.15
console.log(selectTax(exampleState)) // 0.172
console.log(selectTotal(exampleState)) // { total: 2.322 }



// -------------------------------------------------------------- OPTIONS

// Selector behavior can be customized
const customizedSelector = createSelector(
  state => state.a,
  state => state.b,
  (a, b) => a + b,
  {
    memoizeOptions: {
      equalityCheck: (a, b) => a === b, // ex: use deep-equal instead

      // maxSize:
      // the cache size for the selector. If maxSize is greater than 1, the selector will use an LRU cache internally
      maxSize: 10,

      // resultEqualityCheck:if provided, used to compare a newly generated output value against previous values in the cache.
      // If a match is found, the old value is returned. This address the common todos.map(todo => todo.id) use case, where an
      // update to another field in the original data causes a recalculate due to changed references, but the output is still
      // effectively the same.
      // resultEqualityCheck: shallowEqual
    }
  }
)



// -------------------------------------------------------------- PARAMETER


const selectItemsByCategory = createSelector(
  [
    // Usual first input - extract value from `state`
    state => state.items,
    // Take the second arg, `category`, and forward to the output selector
    (state, category) => category
  ],
  // Output selector gets (`items, category)` as args
  (items, category) => items.filter(item => item.category === category)
)




// -------------------------------------------------------------- OTHER

// createSelectorCreator(memoize, ...memoizeOptions)
// ex: const createDeepEqualSelector = createSelectorCreator(defaultMemoize, deepEqual)
