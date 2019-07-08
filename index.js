#!/usr/bin/env node
var sandbox = require('@architect/sandbox')
var chalk = require('chalk')
var repl = require('repl')

/**
 * create a repl to @tables defined in .arc
 */
module.exports = function arcRepl(/*opts*/) {

  // starts the repl
  function start() {
    let server = repl.start({
      prompt: chalk.green('#!/data> ')
    })
    // eslint-disable-next-line
    server.context.data = require('@architect/data')
    return server
  }

  let runInSandbox = process.env.NODE_ENV === 'testing'
  if (runInSandbox) {
    let db = sandbox.db.start(function done() {
      start().on('exit', db.close)
    })
  }
  else {
    start()
  }
}
