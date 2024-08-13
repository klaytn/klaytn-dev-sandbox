#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

case "$(uname -sr)" in
  CYGWIN*|MINGW*|MINGW32*|MSYS*)
     DIR=`pwd -W`
     ;;
esac

pushd $DIR

cd "$DIR/.."

# Build frontend/deployed
pnpm run --filter "./contracts/" compile
pnpm run --filter "./contracts/" deploy:kasBaobab

# Start frontend
pnpm run --filter "./frontend/" build
pnpm run --filter "./frontend/" start

popd
