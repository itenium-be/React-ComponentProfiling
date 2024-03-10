Local Install
=============

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

## MongoDB

The backend also needs a running mongo, your options:

- Check `/confac/deploy/deploy.sh` for a docker-compose (run without arguments to see help)
- Configure your own mongo in `confac/backend/src/config.ts`
- Startup a mongo with docker, see `confac/README.md`

Use `confac/backend/src/faker` to generate random data `npm run faker`
