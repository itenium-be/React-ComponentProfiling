React Component Profiling
=========================

Node v16.10.0


War Story on React performance optimalizations on [confac](https://github.com/itenium-be/confac)


## Installation

### Frontend

```sh
git clone --recurse-submodules --remote-submodules https://github.com/itenium-be/React-ComponentProfiling
cd React-ComponentProfiling/confac
git checkout profiling-0-start
npm install
npm start
```

If there is no backend running on `localhost:9000` follow
the instructions below or change `src/config-front.js`
to connect to the backend details posted on Slack.


### Backend

Best to run separately since we will be switching branches etc.

```sh
git clone https://github.com/itenium-be/confac
cd confac/backend
npm install
npm start
```

The backend also needs a running mongo, your options:

- Check `/deploy/deploy.sh` for a docker-compose (run without arguments to see help)
- Configure your own mongo in `backend/src/config.ts`
- Startup a mongo with docker, see `README.md`
- Use `backend/src/faker` to generate random data `npm run faker`

You can also connect to the same dataset I'm using for the demos,
the credentials will be posted on Slack. (don't mess with the data
set please!!)


## Chrome React Profiler

[Download now 😃](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

**Before you begin**:

Check the Settings of the profiler. There aren't many options but some are quite interesting.



## Original confac version

```sh
npx http-server confac-initial
```

Surf to: `localhost:8080/index.html`




## Starting the Profiling tour

See `Storybook.md`!



## Resources


- [Profiler Chrome Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [reselect](https://github.com/reduxjs/reselect) part of [@reduxjs/toolkit](https://redux-toolkit.js.org/)
- [React v18](https://reactjs.org/blog/2022/03/29/react-v18.html)
- [React Hooks](https://reactjs.org/docs/hooks-overview.html)
- [useMemo](https://beta.reactjs.org/reference/react/useMemo)
- [memo](https://beta.reactjs.org/reference/react/memo)
- [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
- [Profiler](https://reactjs.org/docs/profiler.html)
- [The Definitive Guide to Profiling React Applications](https://blog.openreplay.com/the-definitive-guide-to-profiling-react-applications/)
