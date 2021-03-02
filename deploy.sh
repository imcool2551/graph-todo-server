#!/bin/bash

tar czf todo.tar.gz config/ models/ routes/ schema/ .gitignore index.js package.json yarn.lock
scp todo.tar.gz 128.199.131.120:~
rm todo.tar.gz

ssh 128.199.131.120 << 'ENDSSH'
pm2 stop todo
rm -rf todo
mkdir todo
tar xf todo.tar.gz -C todo
rm todo.tar.gz
cd todo
yarn install
pm2 start todo
ENDSSH

