# Open Specific Months

Have some or all projectMonths opened when loading the page:
 
```tsx
export const getProjectMonthsFilters = /* ... */

// Default: open the last month
openMonths = {[lastExistingMonth]: true};

// Open specific months:
// let leMonths = ['2023-01', '2022-12', '2022-11', '2022-10', '2022-09', '2022-08']; // 6 months open
// openMonths = leMonths.reduce((acc, cur) => ({...acc, [cur]: true}), {});

// Open all months:
openMonths = projectMonths
  .map(pm => pm.month.format(ProjectMonthsListFilterOpenMonthsFormat))
  .filter((month, index, arr) => arr.indexOf(month) === index)
  .reduce((acc, cur) => ({...acc, [cur]: true}), {});
```
