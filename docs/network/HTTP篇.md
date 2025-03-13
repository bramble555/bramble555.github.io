# [HTTP篇](https://xiaolincoding.com/network/2_http/http_interview.html#http-%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)

![image](https://cdn.xiaolincoding.com//mysql/other/6b9bfd38d2684b3f9843ebabf8771212.png)

HTTP,超文本传输协议 Hyper Text Transfer Protocol

HTTP 是一个在计算机世界里专门在「两点」之间「传输」文字、图片、音频、视频
等「超文本」数据的「约定和规范」

### HTTP的常用状态码

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/6-%E4%BA%94%E5%A4%A7%E7%B1%BBHTTP%E7%8A%B6%E6%80%81%E7%A0%81.png)

HTTP是基于TCP进行通信的，会存在“粘包问题”。HTTP以回车、换行符作为header的边界，用Content-length作为body的边界，都是为了解决这个问题。

TCP是面向字节流的，UDP是面向报文的，TCP会根据缓冲区大小进行数据拆分，UDP不会拆分，一个数据包就是一个报文。

当两个消息的某个部分内容被分到同一个TCP报文时，就是常见的TCP粘包问题。如果接收方不知道消息的边界，就无法读取出有效的消息。

**解决粘包问题？**
- 固定长度消息 一点都不方便，很少用
- 定长分隔符 比如HTTP协议，用回车换行符作为分隔符

![i](https://cdn.xiaolincoding.com//mysql/other/a49a6bb8cd38ae1738d9c00aec68b444.png)

### HTTP的常见字段

Host：指定域名

Content-Length：指定回复的数据长度

Connection：一般用于长连接情景，