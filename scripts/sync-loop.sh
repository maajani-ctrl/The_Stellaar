#!/bin/bash

# Simple loop to run sync every hour (3600 seconds)
while true; do
  npx tsx scripts/sync.ts
  sleep 3600
done
