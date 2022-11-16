#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

case "$(uname -sr)" in
  CYGWIN*|MINGW*|MINGW32*|MSYS*)
     DIR=`pwd -W`
     ;;
esac
pushd $DIR

# Unlock the fund account.
FUND_ADDR=$(curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_listAccounts","params":[],"id":1}' http://localhost:8551 | sed "s/.*\[\"//" | sed "s/\"].*//")
echo "FUND_ADDR = $FUND_ADDR"
curl -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"personal_unlockAccount","params":["'$FUND_ADDR'","",99999999],"id":1}' http://localhost:8551

node ./init_accounts.js

popd