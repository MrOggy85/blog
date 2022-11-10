#!/bin/bash

deno run \
  --watch \
  --allow-net \
  --allow-read \
  --allow-env=NODE_DEBUG,PORT,BASE_URL \
  main.ts
