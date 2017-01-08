#!/bin/bash

# Update Google Analytics if building for production
#if [ "$TRAVIS_BRANCH" = "master" ]; then
#  mv dist/js/ga-example.js dist/js/ga.js
#  sed -i -e "s/<INSERT GA TRACKING ID HERE>/$GA_TRACKING_ID/g" dist/js/ga.js
#fi

gulp build
