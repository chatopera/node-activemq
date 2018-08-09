/**
 * ActiveMQ Connection
 */
const debug = require('debug')('csq:index');
const config = require('./config/environment');
const Stomp = require('stompjs');

var _client = null;

function connect() {
    return new Promise((resolve, reject) => {
        let client = Stomp.overTCP(config.activemq.host, config.activemq.port);
        client.connect(config.activemq.connectHeaders.login,
            config.activemq.connectHeaders.passcode,
            () => {
                _client = client;
                resolve(_client);
            },
            (err) => {
                debug("connect error: %o", err);
            })
    });
}

exports.getClient = function() {
    if (_client) {
        return _client
    } else {
        return connect();
    }
}