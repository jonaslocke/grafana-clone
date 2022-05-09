# Grafana Clone with Next.js

This repo is a Grafana clone built with [Next.js](https://www.npmjs.com/package/next.js) and [@mui/material](https://www.npmjs.com/package/@mui/material) (Google Material Design based)

### Routes

- `/dashboard`
  - shows a list of `WIDGETS`
- `/alarms`
  - shows a list of `ALARMS` in the system

## How to test

Execute `npm run dev` with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to launch the server:

```bash
npm run dev
# or
yarn dev
```

## Libraries used

- [@mui/material](https://www.npmjs.com/package/@mui/material) - Good ux/ui experience from the start with minimal setup;
- [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) - The same as before;
- [next](https://www.npmjs.com/package/next.js) - This simplifies in-app routing;
- [node-sass](https://www.npmjs.com/package/node-sass) - To be able to import \*.sccs directly into react;
- [uuid](https://www.npmjs.com/package/uuid) - Tool to easily implement unique ids on alarms;
