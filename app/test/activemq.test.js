/**
 * Test
 */

const test = require("ava");
const debug = require("debug")("csq:activemq");
const activemq = require('../index');


var wait_for = (x) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, x)
    })
}

test("Test activemq # send", async(t) => {
    const client = await activemq.getClient();
    debug("send ...")
    client.send("/queue/test", { priority: 9 }, "Hello, STOMP");

    var subscription = client.subscribe("/topic/test", (data) => {
        debug('subscribe topic: %j', data);
    });

    client.send("/topic/test", { priority: 9 }, "Hello, STOMP");

    await wait_for(10000)
    t.pass()
})