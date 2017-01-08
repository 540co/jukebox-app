#!/bin/bash

CLOUDFRONT_DISTRIBUTION_ID=$CLOUDFRONT_DISTRIBUTION_ID_TEST

if [ "$TRAVIS_BRANCH" = "develop" ]; then
  CLOUDFRONT_DISTRIBUTION_ID=$CLOUDFRONT_DISTRIBUTION_ID_DEV
elif [ "$TRAVIS_BRANCH" = "master" ]; then
  CLOUDFRONT_DISTRIBUTION_ID=$CLOUDFRONT_DISTRIBUTION_ID_PROD
fi

# Allow `awscli` to make requests to CloudFront.
aws configure set preview.cloudfront true

# Invalidate every object in the targeted distribution.
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
