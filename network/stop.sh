#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

case "$(uname -sr)" in
   CYGWIN*|MINGW*|MINGW32*|MSYS*)
     DIR="$(pwd -W)$(dirname -- $0 | sed 's/.//')"
     ;;
esac

pushd $DIR/local-klaytn-deploy-dev

./5.stop.sh

popd