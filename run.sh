#! /bin/bash

docker run -p 8000:8000 --rm \
  --name "bootstrap-webpack2" \
  -v "$(pwd)"/dist:/usr/src/app/dist \
  -v "$(pwd)"/:/usr/src/app/ \
  -v "$(pwd)"/src:/usr/src/app/src  mthomas/bootstrap-webpack2

#  -v $HOME/.aws:/root/.aws -v $HOME/.ssh:/root/.ssh \

# docker run -p 8000:8000 --rm  --name "bootstrap-webpack2"  \
#   -v "$(pwd)"/dist:/usr/src/app/dist \
#   -v "$(pwd)"/src:/usr/src/app/src \
#   -v "$(pwd)"/:/usr/src/app -ti  mthomas/bootstrap-webpack2 /bin/sh -li
