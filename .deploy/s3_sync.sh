#!/bin/bash

SYNC_DIR="test"

if [ "$TRAVIS_BRANCH" = "develop" ]; then
  SYNC_DIR="dev"
elif [ "$TRAVIS_BRANCH" = "master" ]; then
  SYNC_DIR="prod"
fi

aws s3 sync s3://540-jukebox-app/$UPLOAD_DIR s3://540-jukebox-app/$SYNC_DIR --delete
aws s3 rm s3://540-jukebox-app/$UPLOAD_DIR --recursive
