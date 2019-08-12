#!/usr/bin/env node
let arc = require('@architect/functions')
let sandbox = require('@architect/sandbox')
let chalk = require('chalk')
let repl = require('repl')

async function start() {
  let server = repl.start({
    prompt: chalk.green('#!/data> ')
  })
  server.context.data = await arc.tables()//require('@architect/data')
  return server
}

function cmd(/*opts*/) {
  function fail(e) {throw e}
  let runInSandbox = process.env.NODE_ENV === 'testing'
  if (runInSandbox) {
    let db = sandbox.db.start(function done() {
      start().then(server=> {
        server.on('exit', db.close)
      }).catch(fail)
    })
  }
  else {
    start().catch(fail)
  }
}

module.exports = cmd

// allow direct invoke
if (require.main === module) {
  (async function() {
    await cmd(process.argv)
  })();
}
