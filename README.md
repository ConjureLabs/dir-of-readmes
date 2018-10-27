# Dir of Readmes

This is a simply utility to syncrounously crawl a base directory, find any `README.md` files, concat them, and write the result to a destination `README.md`.

## Install

```sh
npm install --save @conjurelabs/dir-of-readmes
```

## Usage

```sh
SOURCE_READMES_DIR=somedir DESTINATION_README_PATH=somedest node ./
```

If you've installed it in your project, and want to call it, you can do so from a bash script. For example:

```sh
#! /bin/bash
# assuming this file is /script/make-readme
# within root of project directory

BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
APP_DIR=$BASE/..;

set -e;

# assuming you want to concat all API routes in project's /api
# and save it to project's root /README.md
SOURCE_READMES_DIR=$APP_DIR/api DESTINATION_README_PATH=$APP_DIR/README.md node ./node_modules/@conjurelabs/dir-of-readmes
```

You can then set up a simple script hook in your `package.json`

```json
{
  "scripts": {
    "make-readme": "script/make-readme"
  }
}
```

Then you can run `npm run make-readme`

## Lints

```sh
npm run lint
```
