#!/bin/bash

# Update Google Analytics if building for production
#if [ "$TRAVIS_BRANCH" = "master" ]; then
#  mv dist/js/ga-example.js dist/js/ga.js
#  sed -i -e "s/<INSERT GA TRACKING ID HERE>/$GA_TRACKING_ID/g" dist/js/ga.js
#fi

# Update Config file based on environment
BASE_URL=$BASE_URL_DEV

if [ "$TRAVIS_BRANCH" = "master" ]; then
  BASE_URL=$BASE_URL_PROD
fi

mv src/app/app.config-example.js src/app/app.config.js
sed -i -e "s|<INSERT BASE URL HERE>|$BASE_URL|g" src/app/app.config.js

# Build application
gulp build
