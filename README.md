# Node.js ActiveMQ Get Started
在Node.js应用中集成ActiveMQ服务。

[![chatoper banner][co-banner-image]][co-url]

[co-banner-image]: https://user-images.githubusercontent.com/3538629/42383104-da925942-8168-11e8-8195-868d5fcec170.png
[co-url]: https://www.chatopera.com

Java Messaging Service, 在多个服务之间通信，为了增强系统可靠性，经常使用消息总线作为异步通信的方案。

消息总线接通了“生产者(Producer)” 和 “消费者 (Consumer)”。
而且二者在消息总线内是“发布”和“订阅”的关系。生产者发布，消费者订阅。
消息被发送到一个地址，地址有两种类型：queue, topic。

Topic: 在一个地址下，可接受多个消费者，一个消息被生产者发送后，路由到每个消费者。
Queue: 在一个地址下，可接受多个消费者，一个消息被生产者发送后，消息只路由到一个消费者，不同消费者是同等的，竞争的。

ActiveMQ是JMS的一个实现。

## docs

```
cd app
npm install
cd ../admin
./test.sh
```

## api
[http://jmesnil.net/stomp-websocket/doc/](http://jmesnil.net/stomp-websocket/doc/)

## 建立连接

[index.js](https://github.com/Samurais/node-activemq/blob/master/app/index.js)

## 测试

[activemq.test.js](https://github.com/Samurais/node-activemq/blob/master/app/test/activemq.test.js)

## 注意

1. 设置header

发送消息时，必须设置```header```中，必须设置

```
"content-length": false 
```

否则消费者端不能正常识别Body。

 
2. 发送地址

以 ```/topic```开始的地址，会以topic类型发送，并且在ActiveMQ中，会去掉```/topic```。
其他情况是 ```queue```类型。


3. 消息的优先级

header中可以设置```priority```，并且

```
JMS defines a ten-level priority value, with 0 as the lowest priority and 9
as the highest. In addition, clients should consider priorities 0-4 as
gradations of normal priority and priorities 5-9 as gradations of expedited
priority.

JMS does not require that a provider strictly implement priority ordering
of messages; however, it should do its best to deliver expedited messages
ahead of normal messages.
ActiveMQ observes three distinct levels of "Priority":

Default (JMSPriority == 4)
High (JMSPriority > 4 && <= 9)
Low (JMSPriority > 0 && < 4)
```



