#!/bin/bash

mkdir $1

# package.json file
echo \ - ./$1/package.json
echo '{
  "type": "module"
}' > $1/package.json

# js file

echo \ - ./$1/index.js
echo "// $1

import { readFileLines } from '../util/read-file-lines.mjs'

//

const input = readFileLines('./test-input.txt')

console.log(input)
" > $1/index.js

# input files

echo \ - ./$1/test-input.txt
echo "test
input" > $1/test-input.txt

echo \ - ./$1/input.txt
echo "real
input" > $1/input.txt
