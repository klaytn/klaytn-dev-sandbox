#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
# todo add windows path
pushd $DIR/local-klaytn-deploy

./5.stop.sh

popd