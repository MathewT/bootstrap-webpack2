#! /bin/bash

docker run -p 8000:8000 --rm \
  --name "bootstrap-webpack" \
  -v "$(pwd)"/dist:/usr/src/app/dist \
  -v "$(pwd)"/src:/usr/src/app  mthomas/bootstrap-webpack

#  -v $HOME/.aws:/root/.aws -v $HOME/.ssh:/root/.ssh \

# docker run -p 8000:8000 --rm  --name "bootstrap-webpack"   -v "$(pwd)"/dist:/usr/src/app/dist   -v "$(pwd)"/:/usr/src/app -ti  mthomas/bootstrap-webpack /bin/sh -li
