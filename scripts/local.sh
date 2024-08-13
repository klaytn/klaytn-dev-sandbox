#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

case "$(uname -sr)" in
  CYGWIN*|MINGW*|MINGW32*|MSYS*)
     DIR=`pwd -W`
     ;;
esac

pushd $DIR

cd "$DIR/.."

# Start Local Klaytn Node
pnpm run --filter "./contracts/" run:local

# Build frontend/deployed
pnpm run --filter "./contracts/" compile
pnpm run --filter "./contracts/" deploy:local

# Start frontend
pnpm run --filter "./frontend/" build
pnpm run --filter "./frontend/" start -p 3001

popd
