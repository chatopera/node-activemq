'use strict'

var path = require('path')
var _ = require('lodash')
var rootdir = path.normalize(path.join(__dirname, '..', '..'));
var env = process.env.NODE_ENV || 'development'
env = env.toLowerCase()

var all = {
    env: env,
    node: {
        port: 8038,
        uploads: path.join(rootdir, 'uploads')
    },
    root: rootdir,
    activemq: {
        'host': 'corsair',
        'port': 61613,
        'connectHeaders': {
            'host': '/',
            'login': null,
            'passcode': null,
            heartbeat: {
                outgoing: 20000,
                incoming: 0
            }
        }
    }
}

var config = all;

try {
    config = _.merge(all, require('./' + env + '.js') || {})
} catch (e) {
    console.log("WARN: ignore ", e);
}

module.exports = config;