#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

case "$(uname -sr)" in
   CYGWIN*|MINGW*|MINGW32*|MSYS*)
     DIR="$(pwd -W)$(dirname -- $0 | sed 's/.//')"
     ;;
esac

set -e

START_IDX=0

if [ ! -z $1 ]; then
  START_IDX=$1
fi

echo "Staring from $START_IDX"

FILES=($(find -s $DIR -name "*.test.js"))
IDX=1
NUM_FILES=${#FILES[*]}
for i in ${FILES[*]}; do
  if [ $IDX -le $START_IDX ]; then
    echo "$IDX/$NUM_FILES skipping $i..."
  else
    echo "$IDX/$NUM_FILES testing $i..."
    truffle test $i
  fi
  IDX=$((IDX+1))
done
