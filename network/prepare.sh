#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DATE=$(date +%Y%m%d_%H%M%S)

case "$(uname -sr)" in
   CYGWIN*|MINGW*|MINGW32*|MSYS*)
     DIR="$(pwd -W)$(dirname -- $0 | sed 's/.//')"
     ;;
esac
pushd $DIR

./deploy_local_network.sh &> tee.$DATE.log &
echo "pulling klaytn image and setting up local network, this might take some time.."
sleep 100
./init_accounts.sh

popd
