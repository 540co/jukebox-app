![Jukebox Logo](.assets/jukebox-logo.png)

This application is a proof-of-concept. This app focuses on the management of songs, albums, artists, playlists, and users.

## Getting started

Run the following commands in the location that you'd like to place the repository:

```bash
get clone https://github.com/540co/jukebox-app.git
cd jukebox-app
```

#### Install dependencies

Run the following commands from the root directory of the repository:

```bash
npm install
bower install
```

#### Configure application
```bash
cp src/app/app.config-example.js src/app/app.config.js
```
Open the app.config.js file and update with the relevant keys.

#### Configure Google Analytics

From within the cloned folder `jukebox-app` run:

Edit the tracking code in `src/assets/scripts/ga.js` and update accordingly.

#### Run the application

Run the following command to serve the application:
```bash
gulp serve
```

#### Gulp tasks

- `gulp` or `gulp build` to build an optimized version of your application in folder dist
- `gulp serve` to start BrowserSync server on your source files with live reload
- `gulp serve:dist` to start BrowserSync server on your optimized application without live reload
- `gulp clean` to remove all files from the build and tmp folders
- `gulp test` to run your unit tests with Karma
- `gulp test:auto` to run your unit tests with Karma in watch mode
