#!/usr/bin/env node
let arc = require('@architect/functions')
let sandbox = require('@architect/sandbox')
let {updater} = require('@architect/utils')
let chalk = require('chalk')
let repl = require('repl')

async function start() {
  let server = repl.start({
    prompt: chalk.green('#!/data> ')
  })
  server.context.data = await arc.tables()
  return server
}

function cmd(/*opts*/) {
  let update = updater('REPL')
  if (process.env.ARC_AWS_CREDS === 'dummy') {
    update.warn('Missing or invalid AWS credentials or credentials file, using dummy credentials (this is probably ok)')
  }

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
