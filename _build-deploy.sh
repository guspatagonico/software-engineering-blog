#!/usr/bin/env bash

pnpm build
gsupload -f -b frontend "*"
