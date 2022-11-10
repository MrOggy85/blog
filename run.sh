#!/bin/bash

my_dir="$(dirname "$0")"

deno run \
  --watch \
  --allow-net \
  --allow-read \
  --allow-env=NODE_DEBUG,PORT,BASE_URL \
  $my_dir/src/main.ts
