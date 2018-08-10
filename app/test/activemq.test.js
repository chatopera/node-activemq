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

test.skip("Test activemq # send", async(t) => {
    const client = await activemq.getClient();
    debug("send ...")

    // send 接口默认发送到 queue 中
    // 比如 下面发送消息 到 queue: /queue/test 下
    client.send("/queue/test", { priority: 9 }, "Hello, STOMP");

    var subscription = client.subscribe("/topic/test", (data) => {
        debug('subscribe topic: %j', data);
    });

    // 下面消息会发送到 topic：test 下
    client.send("/topic/test", { priority: 9 }, "Hello, STOMP");

    await wait_for(10000)
    t.pass()
})



test.only("Test activemq # mock freeswitch", async(t) => {
    const client = await activemq.getClient();
    debug("send ...")

    var fsBridgeQueue = "/bxzq/freeswitch/bridge";

    var mockData = JSON.stringify({
        from: "",
        toDialUri: "sip://1002@192.xxx"
    });

    // send 接口默认发送到 queue 中
    // 比如 下面发送消息 到 queue: /queue/test 下
    client.send(fsBridgeQueue, {
        priority: 0,
        // must added, fix accept type in Java JmsListener
        // Checkout https://github.com/jmesnil/stomp-websocket/issues/63
        "content-length": false 
    }, mockData);
    debug("Mesage sent: queue [%s], message [%s]", fsBridgeQueue, mockData);

    var subscription = client.subscribe("/topic/test", (data) => {
        debug('subscribe topic: %j', data);
    });

    // 下面消息会发送到 topic：test 下
    client.send("/topic/test", { priority: 9 }, "Hello, STOMP");

    await wait_for(10000)
    t.pass()
})