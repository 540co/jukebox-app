#!/bin/bash

# Update Google Analytics if building for production
GA_TRACKING_ID=$GA_TRACKING_ID_DEV

if [ "$TRAVIS_BRANCH" = "master" ]; then
  GA_TRACKING_ID=$GA_TRACKING_ID_PROD
fi
sed -i -e "s/<INSERT GA TRACKING ID HERE>/$GA_TRACKING_ID/g" src/assets/scripts/ga.js

# Update Config file based on environment
BASE_URL=$BASE_URL_DEV

if [ "$TRAVIS_BRANCH" = "master" ]; then
  BASE_URL=$BASE_URL_PROD
fi

mv src/app/app.config-example.js src/app/app.config.js
sed -i -e "s|<INSERT BASE URL HERE>|$BASE_URL|g" src/app/app.config.js

# Build application
gulp build
