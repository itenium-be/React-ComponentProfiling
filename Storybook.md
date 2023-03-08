React Profiling Tour
====================

Search for `// PERF:` for hints & solutions.


## Setup

- Open port with mongo with perf data
- Open port to backend running with perf data
- Best to have npm install done on both frontends (ie for profiling & profiling-2 branches)


```sh
git checkout profiling-0-start
npm install
npm start
```


## Demo 1

Performance `/invoices`.

### Part 1: InvoiceWorkedDays

Calculated Belgian holidays while not needed.


```sh
# Hint: InvoiceWorkedDays.tsx
git checkout profiling-0-start

# Solution:
git checkout profiling-0-solution
```


### Part 2 (Skip)

InvoiceDownloadIcons in `AttachmentDownloadIcon`.  
Exactly the same solution as Part 1: don't calculate!

The solution is to avoid the expensive projectMonth mapping
which was done for **all** projectMonths even though it was
only needed for one _id.


```sh
git checkout profiling-1-InvoiceDownloadIcons-start
git checkout profiling-1-InvoiceDownloadIcons-solution
```


### Part 3: WithClaim

Show the `Flamegraph` and `Ranked` Profiler displays here!

AuthService was accessing localStorage for all auth stuff.  
Displaying 1000 icons with a ClaimGuard accessed localStorage
1000 times.

Simple caching implemented.


```sh
# See EnhanceWithClaim
git checkout profiling-2-WithClaim-start

# See authService.ts
git checkout profiling-2-WithClaim-solution
```






## Demo 2 - ProjectMonth Footers

Performance `/monthly-invoicing`.

Caching implemented for the `date-holidays` dependency.


```sh
# See ProjectMonthfooters.tsx
git checkout profiling-3-PM-Footers-start

# See InvoiceModel.ts
git checkout profiling-3-PM-Footers-solution
```




## Break 1 - Switch Branches

Kill the frontend dev node.

```sh
# See OpenedProjectMonthsList.tsx for entry point hint
git checkout profiling-4-start
cd frontend
npm install
npm start
```



## Demo 3 - ProjectMonth Re-Renders

Whenever filters change, especially the `openMonths: string[]`,
the entire ProjectMonth screen is re-rendered.

The wonders of the `IFeature`. It makes it super quick to create a new screen but
maintainability has suffered.

Changed store structure from `openMonths: string[]` to `openMonths: {[month]: bool}`.


```sh
# File 1: getProjectMonthFeature.tsx
git checkout profiling-5-openMonths-start


# ATTN: Demo ONLY the PERF hints
#       Return to the pptx before doing the demos below


#
# Complete Solution in three steps:
#

# Step 1: Delay IFeature construction
# See: ProjectMonthsLists.tsx
# This is a preparation step and can also be just mentioned:
git checkout profiling-5a-openMonths-delay-IFeature


# Step 2: useMemo & createSelector for 
# See: createFullProjectMonthsSelector.ts
git checkout profiling-5b-openMonths-useMemo-createSelector

# Step 3: memo in the mix
# See: OpenedProjectMonthsList.tsx
git checkout profiling-5c-openMonths-memo
```



## Other Demos

### Web Worker

```sh
# WebWorker Holidays
git checkout profiling-other-holidays-webworker-solution1
git checkout profiling-other-holidays-webworker-solution2
```


### <Profiler />

Setup in `ProjectMonthListCollapsed.tsx`


```sh
# Basic setup of the <Profiler />
git checkout profiling-other-profiler-setup

# Aggregated timings to make sense of it
git checkout profiling-other-profiler-aggregated-timings

# Turned the badges & icons into native span/i elements
git checkout profiling-other-profiler-native-html
```


## Next Steps

```sh
git checkout profiling-next-steps
```
