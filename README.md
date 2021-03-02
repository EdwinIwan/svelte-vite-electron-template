# Svelte Vite Electron Builder Template

This is a secure template for electron applications. Written following the latest safety requirements, recommendations and best practices.

Under the hood is used [Vite 2.0][vite] — super fast, nextgen bundler, and [electron-builder] for compilation.

By default, the **Svelte framework** is used for the interface.

## Features

### Electron
- Template use the latest electron version with all the latest security patches.
- The architecture of the application is built according to the security [guids](https://www.electronjs.org/docs/tutorial/security) and best practices.
- The latest version of the [electron-builder] is used to compile the application.


### Vite
- [Vite] is used to bundle all source codes. This is an extremely fast packer that has a bunch of great features. You can learn more about how it is arranged in [this](https://youtu.be/xXrhg26VCSc) video.
- Vite [supports](https://vitejs.dev/guide/env-and-mode.html) reading `.env` files. My template has a separate command to generate `.d.ts` file with type definition your environment variables.

Vite provides you with many useful features, such as: `TypeScript`, `CSS/JSON Importing`, `CSS Modules`, `Web Assembly` and much more.

[See all Vite features](https://vitejs.dev/guide/features.html).


### TypeScript
- The Latest TypeScript is used for all source code. 
- **Vite** supports TypeScript out of the box. However, it does not support type checking.
- Type checking is performed in both `.ts` and `.svelte` files thanks to [svelte-check].
- Code formatting rules follow the latest TypeScript recommendations and best practices thanks to [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).


### Svelte 
- By default, web pages are built using the latest version of the [Svelte].
- Code formatting rules follow the latest Svelte recommendations and best practices thanks to [eslint-plugin-svelte3].
- Installed [Svelte.js devtools beta](https://chrome.google.com/webstore/detail/svelte-devtools/ckolcbmkjpjmangdbmnkpjigpkddpogn) with Svelte 3 support.

## How it works
The template required a minimum [dependencies](package.json). Only **Vite** is used for building, nothing more.


### Using electron API in renderer
As per the security requirements, context isolation is enabled in this template.
> Context Isolation is a feature that ensures that both your `preload` scripts and Electron's internal logic run in a separate context to the website you load in a [`webContents`](https://github.com/electron/electron/blob/master/docs/api/web-contents.md).  This is important for security purposes as it helps prevent the website from accessing Electron internals or the powerful APIs your preload script has access to.
>
> This means that the `window` object that your preload script has access to is actually a **different** object than the website would have access to.  For example, if you set `window.hello = 'wave'` in your preload script and context isolation is enabled `window.hello` will be undefined if the website tries to access it.

[Read more about Context Isolation](https://github.com/electron/electron/blob/master/docs/tutorial/context-isolation.md).

Exposing APIs from your `preload script` to the renderer is a common usecase and there is a dedicated module in Electron to help you do this in a painless way.
```ts
// /src/preload/index.ts
const api = {
  data: ['foo', 'bar'],
  doThing: () => ipcRenderer.send('do-a-thing')
}

contextBridge.exposeInMainWorld('electron', api)
```

To access this API use the `useElectron()` function:
```ts
// /src/renderer/App.svelte
import {useElectron} from '/@/use/electron'

const {doThing, data} = useElectron()
```

**Note**: Context isolation disabled for `test` environment. See [#693](https://github.com/electron-userland/spectron/issues/693#issuecomment-747872160).



### Modes and Environment Variables
All environment variables set as part of the `import.meta`, so you can access them as follows: `import.meta.env`. 

You can also build type definitions of your variables by running `bin/buildEnvTypes.js`. This command will create `types/env.d.ts` file with describing all environment variables for all modes.

The mode option is used to specify the value of `import.meta.env.MODE` and the corresponding environment variables files that needs to be loaded.

By default, there are two modes:
  - `production` is used by default
  - `development` is used by `npm run watch` script
  - `test` is used by `npm test` script

When running building, environment variables are loaded from the following files in your project root:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified env mode
.env.[mode].local   # only loaded in specified env mode, ignored by git
```

**Note:** only variables prefixed with `VITE_` are exposed to your code (e.g. `VITE_SOME_KEY=123`) and `SOME_KEY=123` will not.  you can access `VITE_SOME_KEY` using `import.meta.env.VITE_SOME_KEY`. This is because the `.env` files may be used by some users for server-side or build scripts and may contain sensitive information that should not be exposed in code shipped to browsers.



### Project Structure
- [`src`](src)
  Contains all source code.
  - [`src/main`](src/main) 
  Contain entrypoint for Electron [**main script**](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file).
  - [`src/renderer`](src/renderer)
    Contain entrypoint for Electron [**web page**](https://www.electronjs.org/docs/tutorial/quick-start#create-a-web-page). All files in this directory work as a regular Svelte application.
  - [`src/preload`](src/preload)
    Contain entrypoint for custom script. It uses as `preload` script in `BrowserWindow.webPreferences.preload`. See [Checklist: Security Recommendations](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content).
  - [`src/*`](src) It is assumed any entry points will be added here, for custom scripts, web workers, webassembly compilations, etc.
- [`dist`](dist) 
  - [`dist/source`](dist/source)
  Contains all bundled code.
    - [`dist/source/main`](dist/source/main) Bundled *main* entrypoint.
    - [`dist/source/renderer`](dist/source/renderer) Bundled *renderer* entrypoint.
    - [`dist/source/preload`](dist/source/preload) Bundled *preload* entrypoint.
    - [`dist/source/*`](dist/source) Bundled any custom files.
  - [`dist/app`](dist/app)
  Contain packages and ready-to-distribute electron apps for any platform. Files in this directory created using [electron-builder].
- [`config`](config)
  Contains various configuration files for Vite, TypeScript, electron builder, etc.
- [`bin`](bin)
  It is believed any scripts for build the application will be located here.
- [`types`](types) 
  Contains all declaration files to be applied globally to the entire project
- [`tests`](tests)
  Contains all tests



### Development Setup
This project requires Node 14 or later.
1. Fork this repository
1. Run `npm install` to install all dependencies
1. Build compile app for production — `npm run compile`
1. Run development environment with file watching — `npm run watch`
1. Run tests — `npm test`

### Template based on: [vite-electron-builder] https://github.com/cawa-93/vite-electron-builder/

