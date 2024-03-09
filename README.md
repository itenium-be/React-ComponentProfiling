React Component Profiling
=========================

Node v16.10.0


War Story on React performance optimalizations on [confac](https://github.com/itenium-be/confac)


## Installation

```sh
git clone --recurse-submodules --remote-submodules https://github.com/itenium-be/React-ComponentProfiling
cd React-ComponentProfiling
cd confac
git checkout MITechCon

cd backend
npm install
npm start

cd frontend
npm install
npm start
```

### MongoDB

The backend also needs a running mongo, your options:

- Check `/deploy/deploy.sh` for a docker-compose (run without arguments to see help)
- Configure your own mongo in `backend/src/config.ts`
- Startup a mongo with docker, see `confac/README.md`

Use `backend/src/faker` to generate random data `npm run faker`


## Chrome React Profiler

[Download now 😃](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)

**Before you begin**:

Check the Settings of the profiler. There aren't many options but some are quite interesting.



## Starting the Profiling tour

- `snippets`: Examples of the different techniques used
- `date-holidays`: The enormity of the 3rd party package -- see `code\projects\confac\perf-talks`
- `TechTalks/itenium`: The workshop at itenium (3h) - DEPRECATED (use one of the following two instead)
- `TechTalks/LightningTalk`: The workshop condensed to a 15min powerpoint
- `TechTalks/LiveCoding`: Re-implement the different implementations (`cd confac` & `git checkout MITechCon`)


## Resources

See `RESOURCES.md`!
