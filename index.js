/*eslint no-sync: 0*/

// this whole thing is sync since it's a utility

const fs = require('fs')
const path = require('path')
const sortInsensitive = require('@conjurelabs/utils/Array/sort-insensitive')

const { SOURCE_READMES_DIR, DESTINATION_README_PATH } = process.env

if (!SOURCE_READMES_DIR) {
  throw new Error('dir-of-readmes requires you set env var SOURCE_READMES_DIR')
}
if (!DESTINATION_README_PATH) {
  throw new Error('dir-of-readmes requires you set env var DESTINATION_README_PATH')
}

const readmePaths = crawlForReadmes(SOURCE_READMES_DIR)
sortInsensitive(readmePaths)
concatReadmesToDestination(readmePaths, DESTINATION_README_PATH)

function crawlForReadmes(dirpath, result = []) {
  const list = fs.readdirSync(dirpath)

  for (const resource of list) {
    const resourcePath = path.resolve(dirpath, resource)

    if (resource.toLowerCase() === 'readme.md') {
      result.push(resourcePath)
      continue
    }

    const stat = fs.statSync(resourcePath)

    if (stat.isDirectory()) {
      crawlForReadmes(resourcePath, result)
    }
  }

  return result
}

function concatReadmesToDestination(allReadmePaths, destinationPath) {
  const allContents = []

  for (const readmePath of allReadmePaths) {
    allContents.push(fs.readFileSync(readmePath))
  }

  fs.writeFileSync(destinationPath, Buffer.concat(allContents))
}
