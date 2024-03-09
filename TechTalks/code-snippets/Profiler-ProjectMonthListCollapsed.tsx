// <Profiler />
// Aggregate function for timing the collapsed ProjectMonth badges

// Also in sha 16f1994
// File: ProjectMonthListCollapsed.tsx

// Typings
type ITiming = {
    renders: number;
    totalTime: number;
    averageTime?: number;
}

let timings: {[key: string]: ITiming} = {}





// in the render

function callback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    // console.log(`${id}: ${phase} in ${actualDuration}`);
    if (id.startsWith('Badge')) {
      id = 'NotVerifiedBadges'
    }

    if (!timings[id]) {
      timings[id] = {renders: 1, totalTime: actualDuration};
    } else {
      const oldTimings = timings[id];
      timings[id] = {renders: oldTimings.renders + 1, totalTime: oldTimings.totalTime + actualDuration};
    }

    timings[id].averageTime = timings[id].totalTime / timings[id].renders;
  }


  console.log(timings);
