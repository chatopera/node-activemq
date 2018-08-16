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

test.skip("Test activemq # send many", async(t) => {
    const client = await activemq.getClient();
    debug("send ...")

    // send 接口默认发送到 queue 中
    // 比如 下面发送消息 到 queue: /queue/test 下
    client.send("/acknowledge/test", { priority: 4, 'content-length': false }, JSON.stringify({id: "1"}));
    client.send("/acknowledge/test", { priority: 4, 'content-length': false }, JSON.stringify({id: "2"}));
    client.send("/acknowledge/test", { priority: 4, 'content-length': false }, JSON.stringify({id: "3"}));
    client.send("/acknowledge/test", { priority: 4, 'content-length': false }, JSON.stringify({id: "4"}));
    client.send("/acknowledge/test", { priority: 4, 'content-length': false }, JSON.stringify({id: "5"}));
    client.send("/acknowledge/test", { priority: 4, 'content-length': false }, JSON.stringify({id: "6"}));


    // var subscription = client.subscribe("/topic/test", (data) => {
    //     debug('subscribe topic: %j', data);
    // });

    // 下面消息会发送到 topic：test 下
    // client.send("/topic/test", { priority: 9 }, "Hello, STOMP");

    // await wait_for(10000)
    t.pass()
})

test.only("Test activemq # send patten", async(t) => {
    const client = await activemq.getClient();
    debug("send ...")

    // send 接口默认发送到 queue 中
    // 比如 下面发送消息 到 queue: /queue/test 下
    client.send("acknowledge.test1", { priority: 4, 'content-length': false }, JSON.stringify({id: "1"}));
    client.send("acknowledge.test2", { priority: 4, 'content-length': false }, JSON.stringify({id: "2"}));
    client.send("acknowledge.test3", { priority: 4, 'content-length': false }, JSON.stringify({id: "3"}));
    client.send("acknowledge.test4", { priority: 4, 'content-length': false }, JSON.stringify({id: "4"}));
    client.send("acknowledge.test5", { priority: 4, 'content-length': false }, JSON.stringify({id: "5"}));
    client.send("acknowledge.test6", { priority: 4, 'content-length': false }, JSON.stringify({id: "6"}));


    // var subscription = client.subscribe("/topic/test", (data) => {
    //     debug('subscribe topic: %j', data);
    // });

    // 下面消息会发送到 topic：test 下
    // client.send("/topic/test", { priority: 9 }, "Hello, STOMP");

    // await wait_for(10000)
    t.pass()
})

test.skip("Test freeswitch events # test", async(t) => {
    const client = await activemq.getClient();
    debug("send ...")

    var fsBridgeQueue = "/bxzq/freeswitch/bridge";

    var mockData = JSON.stringify({
        from: "158888888",
        to_sip: "1002"
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


/**
 * 外呼通话事件
 * https://github.com/Samurais/chatopera.io/issues/665
 */

test.skip("Test freeswitch events # bridge connect", async(t) => {
    const client = await activemq.getClient();
    debug("send ...")

    var fsBridgeQueue = "/bxzq/freeswitch/bridge/connect";

    var mockData = JSON.stringify({
        // 位数必须是11位的手机号/座机
        from: "15801213198",
        to_sip: "1002",
        type: "callout",
        appId: "1EcJJl",
        caller: "1580000000",
        startTime: "2018-08-09"
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

    t.pass()
})

/**
 * 外呼通话事件
 * https://github.com/Samurais/chatopera.io/issues/665
 */

test.skip("Test freeswitch events # bridge disconnect", async(t) => {
    const client = await activemq.getClient();
    debug("send ...")

    var fsBridgeQueue = "/bxzq/freeswitch/bridge/disconnect";

    var mockData = JSON.stringify({
        // 位数必须是11位的手机号/座机
        from: "15801213198",
        to_sip: "1002",
        type: "callout",
        appId: "1EcJJl",
        caller: "1580000000",
        startTime: "2018-08-09"
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

    t.pass()
})

