React Component Profiling
=========================


## Chrome React Profiler

[Download now 😃](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

**Before you begin**:

Check the Settings of the profiler. There aren't many options but they are interesting.


## Open Specific Months
 
```tsr
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

## Original confac version

```sh
npx http-server confac-initial
```

Surf to: `localhost:8080/index.html`




## Starting the Profiling tour

See `Storybook.md`!


6fd444a6  2023-03-03  performance: exercise for at home? (tag: v2023-03-04)
76617f39  2023-03-03  performance: removed the profilers
0ce64269  2023-03-03  performance: turning badges/pills/icons components into regular html tags
f19d58f0  2023-03-03  performance: start <Profiler>
c302947a  2023-03-03  performance: edge case; de laatste stuiptrekking (?)
e16fc211  2023-03-03  performance: the final (?) resurection of the holidays calc!
d45c9156  2023-03-03  performance: Profiling with <Profiler />
054fc3d0  2023-03-03  performance: the final vanquish of the holidays calculation ;)
9d61ba09  2023-03-02  performance: more caching for the ConsultantCountFooter
a6030d4a  2023-03-02  performance: createSelector for fixing the filters on the projectsMonth
b7c28094  2023-03-02  performance: React.memo for the ProjectMonthListCollapsed
44bee309  2023-03-02  performance: original functionality restored  (tag: v2023-03-02)
e1789b28  2023-03-02  performance: fix top toolbar again
ea698212  2023-03-01  performance: createSelectors for badges/opened list months.
232c6ee1  2023-02-28  performance: further optimization CollapsedProjectMonth
d3320858  2023-02-28  performance: avoid more use of useProjectMonths


a4f5d372  2023-02-28  performance: projectMonths considerably faster... --> in stash rn





!! Make a backup of the db so it can be run locally if needed!!



War Story on React performance optimalizations in [confac](https://github.com/itenium-be/confac)


Setup
-----

### Profiling Start

```sh
git checkout profiling-0-start
```

`/invoices` listing is slow.
