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

### HTTP特性

HTTP常见版本有HTTP/1.1,HTTP/2.0,HTTP/3.0

HTTP/1.1的有点是简单、灵活、易于扩展，HTTPS就是在HTTP和TCP之间增加了SSL/TLS安全传输层，HTTP/1.1和HTTP/2.0传输协议用的是TCP，而HTTP/3.0改成了UDP。

HTTP/1.1 的缺点。

分别是无状态、明文传输、同时一大缺点是不安全。

为了解决无状态问题，比较简单的是采用cookie技术。

HTTPS采用的是混合加密模式，对称加密+非对称加密结合。

通信建立前，采用的非对称加密交换会话密钥，通信过程中全是对称加密。

一般传输实际内容不使用非对称加密，主要是因为会耗费很多性能。

- 公钥加密、私钥解密的话，可以保证内容的安全，因为只有私钥才能解密内容。
- 私钥加密、公钥解密的话，可以保证来源的安全，因为解密成功，说明对方有私钥，而私钥是保密的。

又为了防止伪造一对公私密钥，又采用了数字证书的方式。那么自己在用私钥签名时，同时会给对方数字证书。服务器会验证证书的合法性。

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/22-%E6%95%B0%E5%AD%97%E8%AF%81%E4%B9%A6%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B.png)

#### 数字证书的工作流程

如上图，第一步就是服务器主动向CA机构申请数字证书，CA机构用自己的私钥、签名一份含有服务器信息+服务器公钥+数字签名的一份数字证书签发给服务器。

服务器会给客户端提供服务器的公钥+CA的数字签名。客户端拿到数字证书之后，使用CA公钥确认这份数字证书是否合法。如果解密成功，那么就用服务器的公钥来进行加密。

### HTTPS是如何建立连接的？其间交互了什么？

SSL/TLS 协议基本流程：

客户端向服务器索要并验证服务器的公钥，双方协商产生会话密钥，双方采用会话密钥进行加密通信。

前两部就是SSL/TLS握手阶段，握手之后就是SSL/TLS加密通信阶段。

`SSL：Secure Sockets Layer`，安全套接层协议。 TLS：`Transport Layer Security`，传输层安全协议。

SSL是存在已知漏洞的，所以被废弃不用了，现在都用TLS，它是在SSL的基础上标准化的。

TLS的握手阶段涉及四次通信，使用不同的密钥交换算法。

#### 数字证书

整数的验证过程中存在整数信任链问题。我们向CA申请的整数一般不是根证书签发的，而是中间证书签发的，比如百度。
客户端收到百度的证书之后，发现证书签发者不算根证书，无法根据本地已有的根证书的公钥去验证百度证书是否可信。所以客户端根据百度证书签发者，找到证书的颁发机构是XXX，然后向CA请求该中间证书。直到所引导根证书，发现中间证书被根证书引用，然后一直到最下面一直信任下来。

#### HTTPS的应用数据是如何保证完整性的？

TLS在实现上分为握手协议和记录协议两层。

- TLS握手协议就是上面说的四次握手的过程，负责协商加密算法和生成对称密钥。
- TLS记录协议负责保护应用程序数据并验证完整性和来源，所以对数据加密是用的记录协议。

#### HTTPS一定安全可靠吗？

客户端通过浏览器发起HTTPS请求的时候，被假的基站转发到了中间人服务器，客户端和中间人服务器完成了TLS握手，然后中间人服务器再和真正的服务端完成TLS握手。

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/http/https%E4%B8%AD%E9%97%B4%E4%BA%BA.drawio.png)

#### HTTP/1.1相比HTTP/1.0的改进？

- 使用长连接方式改善了1.0版本短连接造成的性能开销。多个请求公用一个TCP连接，但是要排队。
- 支持管道网络传输，第一个请求发出去，不需要等待回来，就可以发第二个请求了，减少整体的响应时间。

#### 缺点
- 请求/响应头没有压缩，只压缩body的部分。
- 服务器基于请求顺序响应，服务端卡住，导致客户端一直拿不到数据，产生队头阻塞。
- 没有请求优先级控制
- 请求只能客户端->服务器

假如多个请求访问服务器的不同路径，都是复用一个TCP连接的。

#### HTTP/2的改进？

- 头部压缩
- 二进制格式
- 并发传输
- 服务器主动推送资源

##### 头部压缩

HTTP/2会压缩头，多个请求头相似，协议自动消除重复的部分。这个就叫做`HPACK`算法。会在客户端和服务器同时维护头信息表。后续发索引号，提高速度。

##### 二进制格式

头和数据体都是二进制，统称为帧。

##### 并发传输

HTTP/1.1基于请求-响应模型。同一个连接中，HTTP会等待响应到达再处理下一个事务，服务器卡住就会阻塞。

HTTP/2相比于HTTP/1.1更强的是引出了Stream概念，多个Stream复用同一条TCP连接。这样可以防止HTTP的队头阻塞问题，因为HTTP/2可以并行交错地发送请求和响应。

形象地说，HTTP/1.1是单车道排队，大家是一条车道，但是要排队。HTTP/2则是立体交通网，像飞机的飞行航道，航道只有一条，但是可以交错飞行。一个TCP连接上有很多的Stream流。HTTP/1.1可以不等待响应就发送很多条请求，但是服务器的响应必须是排队的。

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/http2/stream.png)

一个TCP连接包含多个Stream。Stream内包含一个或者多个Message。Message对应请求或者响应。

##### HTTP/2仍然存在的问题

实际上HTTP/2只解决了HTTP/1.1的队头阻塞问题，而在TCP层仍然存在。

HTTP基于TCP，TCP是面向字节流的协议，TCP必须保证收到的数据是完整连续的，这样内核才会把缓冲区的数据返回给HTTP应用。那么假设有一段数据，只有前面的一小段丢失，后面的正常到达。那么后面的数据也需要等待前面的这段到达之后，应用层才能从内核拿到数据。

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/network/quic/http2%E9%98%BB%E5%A1%9E.jpeg)

### 那么HTTP/3做了哪些优化？

前面说到1.1和2都存在队头阻塞的问题。

1.1中的管道虽然解决了请求的队头阻塞，但是没有解决响应的队头阻塞。2虽然通过Stream解决了1.1中的阻塞，但是一旦发生丢包，就会阻塞全部HTTP请求，属于基于TCP层队头阻塞。

为了解决TCP的阻塞问题，HTTP/3把HTTP下层的TCP协议改成了UDP！

UDP发送不管顺序、也不管丢包，所以不会出现HTTP/2那样的队头阻塞问题。UDP是不可靠传输，但是基于UDP的QUIC协议可以实现类似TCP的可靠性传输。

#### QUIC的特点

- 无队头阻塞
- 更快建立连接
- 连接迁移

#### 无队头阻塞

QUIC协议也有HTTP/2的Stream，但是某个流丢包后，只会阻塞这个流，其他流不受影响，因此不存在队头阻塞问题。

所以QUIC的多个流之间是没有依赖的。

#### 连接的建立更快

在HTTP/1和HTTP/2中，TCP和TLS是分层的，分别属于内核实现的传输层，openssl库实现的表示层，难以合并。是先TCP握手，再TLS握手。

但是HTTP/3的QUIC协议是QUIC内部包含TLC，只需要一个RTT可以同时完成建立连接和密钥协商。

#### 连接迁移

基于TCP的HTTP。是通过(源IP、源端口、目的IP、目的端口)四元组确定一条TCP连接。

那么一旦移动设备的网络从流量切换到WIFI，IP地址变化，就必须重新建立连接。QUIC协议通过连接ID标记通信的两个端点，只要仍然有上下文信息，比如连接ID，TLS密钥，就可以无缝衔接。

但是这样的问题是，很多设备不知道QUIC协议，只当成普通的UDP，但是有的网络设备会丢弃UDP。HTTP/3的普及进度非常缓慢。

### HTTP/1.1如何优化？

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/http1.1%E4%BC%98%E5%8C%96/%E4%BC%98%E5%8C%96http1.1%E6%8F%90%E7%BA%B2.png)

#### 如何避免发送HTTP请求？
采取缓存的方式。客户端会把第一次请求和响应以键值对保存在本地。下次访问优先读取缓存。

缓存有过期时间，是服务器发回的请求里决定的。到达了过期时间，就会向服务器重新发起请求。实际上这里还是可以优化。万一再发请求，服务器资源没变，重新发回来不是浪费资源？

所以客户端在重新发送请求时，会在请求的Etag头部带上第一次响应头的摘要(唯一标识响应)。服务器收到后，先比较本地资源摘要和发来的摘要，如果一致说明资源没改变。这时候服务器会返回不带有包体的`304 Not Modified`响应。

#### 如何减少HTTP请求次数？
从三方面入手
- 减少重定向请求次数
- 合并请求
- 延迟发送请求

第一种，重定向不是返回给客户端，让客户端再次发送，而是让中间的代理服务器自动转发。
第二种，第二种，把访问多个小文件的请求合并成一个大的请求，减少发送重复的HTTP头部。
HTTP/1.1是请求、响应模型。它的管道模式是默认不使用的。为了防止单个请求的阻塞，一般浏览器会同时发起5-6个请求，每个请求都是不同的TCP连接。如果合并请求，会减少TCP连接的数量，省去了TCP握手和慢启动过程耗费的时间。

有的网页有很多小图片，我们可以考虑CSS Image Sprites技术合并成大图片。这样浏览器就可以用一次请求获得一个大图片，再根据CSS数据，大图片切割成小图片。

服务端使用webpack等打包工具，把js、css等资源合并打包成大文件也是这个原理。

另外，图片二进制数据用base65编码后，以URL的形式嵌入HTML，直接发回去也是一种方法。

延迟发送请求
不要一口气吃成大胖子，一般 HTML 里会含有很多 HTTP 的 URL，当前不需要的资源，
我们没必要
也获取过来，于是可以通过「按需获取」的方式，来减少第一时间的 HTTP 请求次数。
请求网页的时候，没必要把全部资源都获取到，而是只获取当前用户所看到的页面资源，
当用户向 下滑动页面的时候，再向服务器获取接下来的资源，这样就达到了延迟发送请求的效果。

怎么减少HTTP响应大小？

考虑对返回的资源进行压缩。

一般有无损压缩和有损压缩两种。

##### 无损压缩
常见于把代码里面的空格、注释等去掉。

请求中，客户端发起请求时，请求头中有`Accept-Encoding`字段。表明客户端接收的编码形式，它可以是`gzip,br`等压缩算法。达到压缩的效果。

##### 有损压缩。

常用于音频、图片、视频等容忍一定程度数据损失的场景。

## HTTPS RSA握手解析

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/https%E6%8F%90%E7%BA%B2.png)

### TLS握手过程

HTTP是明文传输，有窃听风险、篡改风险、冒充风险。

HTTPS是在HTTP和TCP层之间加入了TLS协议来解决上述的风险。

TLS协议怎么解决HTTP的风险？
- 信息加密：HTTP交互信息是被加密的，第三方无法窃取。
- 校验机制：校验信息传输过程中被篡改会有警告。
- 身份证书：证明网站可靠性。

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/tls%E6%8F%A1%E6%89%8B.png)

从图中可以发现，通常只需要四个消息就可以完成TLS握手，也就是两个RTT的时延。

在加密应用消息的时候，用的是对称加密密钥，而这个密钥泄露了就完蛋了，所以传输这个对称密钥的时候要用非对称加密的方式来保护。

### RSA握手过程

传统的TLS握手基本是使用RSA算法来实现密钥交换的，在把TLS证书部署到服务端时，证书文件其实就是服务端的公钥，会在TLS握手阶段传递给客户端，而服务端的私钥一直留在服务端，确保私钥不能被窃取。

在RSA密钥协商算法中，客户端会生成随机密钥，用服务端的公钥加密之后再传给服务端。
![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/https_rsa.png)

#### TLS第一次握手

客户端发送一个`Client Hello`消息，内含客户端的TLS版本号、支持的密码套件列表、生成的随机数(被服务端保留来生成对称加密密钥)。
![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/clienthello.png)

#### TLS第二次握手

服务端收到客户端的hello消息之后，会确认TLS版本号是否支持、选择客户端发来的可接收密码套件列表中选择一个，以及生成随机数。

接着返回`Server Hello`消息，消息里面有服务器确认的TLS版本号，也给出服务端的随机数，并选择密码套件。

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/serverhello.png)

然后，服务端为了验证自己的身份会发送`Server Certificate`给客户端，包含了数字证书。

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/certificate.png)

最后服务端发回`Server Hello Done`消息，本次打招呼完毕。

#### 客户端验证证书

收到服务端的证书后，客户端就要验证证书是否合法。

##### 数字证书的内容
- 公钥
- 持有者信息
- 证书认证机构CA的信息
- CA对文件的数字签名，以及使用的算法
- 证书有效期
- 其他额外信息

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/%E8%AF%81%E4%B9%A6%E7%9A%84%E6%A0%A1%E9%AA%8C.png)

##### CA签发证书流程

- CA会把持有者的公钥、用途、颁发者、有效时间等信息打包，做哈希验算得到一个哈希值。
- CA用自己的私钥对哈希值加密，生成`Certificate Signature`，也就是签名做了签名。
- 最后签名添加在文件证书上，形成数字证书。

##### 客户端校验证书流程

- 客户端从数字证书能知道CA用的哪种哈希算法，用同样的算法计算证书得到一个哈希值H1。
- 浏览器和操作系统会内置CA公钥信息，尝试用公钥去解密证书签名，得到哈希值H2。
- 最后比较H1和H2、值相同说明是可信赖的证书。

#### TLS第三次握手

此时，客户端已经完成了证书的校验了。

客户端生成一个新的随机数(pre-master)，用服务器的RSA公钥加密这个随机数，通过`Client Key Exchange`消息传给服务端。

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/clietnkeyexchange.png)

服务端收到之后，用RSA私钥解密，得到客户端发来的随机数pre-master.

至此，客户端和服务端共享了三个随机数。 `Client Random`、`Server Random`、 `pre-master`。

于是，双方根据已经得到的三个随机数，生成会话密钥(Master Secret)，它是对称密钥，用于对后续的HTTP请求/响应的数据加解密。

生成完毕之后，客户端发一个`Change Cipher Spec`告诉服务端开始使用加密方式发送消息。

然后客户端再发一个`Encrypted Handshake Message (Finished)`消息，把之前所有发送的数据做个摘要，再用会话密钥加密一下，让服务器做校验，验证加密通信是否可用以及之前的握手信息是否被中途篡改过。

可以发现在`Change Cipher Spec`之前传输的TLS握手数据都是明文、之后都是对称密钥加密的密文。

#### TLS第四次握手

服务器也是同样的操作，发`Change Cipher Spec`和`Encrypted Handshake Message`。如果双方都验证加密和解密没问题，那么握手就完成了。

### RSA算法的缺陷

用RSA算法的最大缺陷是不支持前向保密。

因为RSA算法的安全性是基于长期使用的服务端私钥的。

假如有个攻击者一直收集着几年来的某个网站的所有通信信息，然后在某一天服务端的RSA密钥泄露了，那么攻击者就可以根据泄露的密钥解密之前几年内搜集到的所有通信信息了。

所以更现代的算法是`ECDHE`密钥协商算法。

## HTTPS ECDHE 握手解析

ECDHE算法是由DH算法演化来的。基于离散对数。

DH算法两种实现，一种叫static DH，已经废弃，另一种DHE，现在常用的。

DHE算法中的E是ephemeral，临时性的。可以保证前向安全。

DHE算法要大量乘法，性能不高，所以推出了ECDHE算法。在DHE的基础上用了ECC椭圆曲线的特性，可以用更少的计算量算出公钥和最终的会话密钥。

### 握手流程

### TLS第一次握手
内容跟RSA握手一样，不过支持的密码套件肯定要有ECDHE。

### 第二次握手
跟RSA的区别在于，发送完证书之后，会发送`Server Key Exchange`消息。

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https/ech_serverkey.png)
这个过程做了三件事
- 选择椭圆曲线，相当于定了基点G，都公开给客户端。
- 生成随机数作为服务端椭圆曲线私钥，保留到本地。
- 根据基点G和私钥生成公钥，公开给客户端。
为了保证椭圆曲线公钥不被第三方篡改，服务端会用RSA给椭圆曲线公钥做签名。

最后就是`Server Hello Done。`

至此，TLS 两次握手就已经完成了，目前客户端和服务端通过明文共享了这几个信息:Client Random、
Server Random、使用的椭圆曲线、椭圆曲线基点 G、服务端椭圆曲线的公钥，这几个信息很重要，是
后续生成会话密钥的材料。

### 第三次握手

客户端也生成随机数作为椭圆曲线私钥，根据服务端之前提供的信息生成公钥，用`Client Key Exchange`发给服务端。

至此，双方都有对方的椭圆曲线公钥、自己的私钥、椭圆曲线基点G。双方都计算出点(x,y)，其中x值双方都一样。但是实际上这个x还不是最终的会话密钥

最终的会话密钥是`客户端随机数+服务端随机数+x`。这么设计是因为TLS设计者不信任客户端或服务端的伪随机数的可靠性，三个混合起来，更安全。

算好会话密钥后，客户端会发一个「Change Cipher spec」消息，告诉服务端后续改用对称算法加密通信。

之后都差不多了。

### 第四次握手

跟之前RSA的都一样的。

## HTTPS如何优化？

![image](https://cdn.xiaolincoding.com/gh/xiaolincoder/ImageHost4@main/%E7%BD%91%E7%BB%9C/https%E4%BC%98%E5%8C%96/%E4%BC%98%E5%8C%96https%E6%8F%90%E7%BA%B2.png)

### 会话复用
TLS的目的就是协商会话密钥，就是对称加密密钥。可以缓存首次TLS的密钥，下次建立HTTPS连接时直接复用。

会话复用分为两种
- 第一种是session ID
- 第二种是session ticket

#### Session ID

Session ID 的工作原理是，客户端和服务器首次 TLS 握手连接后，双方会在内存缓存会话密钥，并用唯一
的 Session ID 来标识，Session ID 和会话密钥相当于 key-value 的关系。

#### 两个缺点
- 服务器要保存每个客户端会话密钥，多起来占用内存
- 网站一般有多个后端实现负载均衡，客户端再次连接不一定会命中上次访问过的服务器，还要走完整的TLS握手过程。

#### Session Ticket

为了解决session ID的问题，出现了session ticket。跟默认的ticket差不多，服务器加密会话密钥作为ticket发给客户端，客户端再次连接服务器的时候就发送ticket，验证有效期，没问题就可以开始通信了。

session ID和session ticket都不具备前向安全性。

为了避免重放攻击，要给会话密钥设置一个合理的过期时间。

### Pre-shared Key

前面的session id和session ticket都需要1RTT才能恢复会话。

对于重连，TLS1.3只需要0RTT。原理是发送ticket的时候连带上客户端请求。这个方式就叫pre-shared key.

### HTTP/2优点

用HPACK算法压缩头部。客户端和服务器两端都会建立和维护 「字典」 编码压缩数据， 用长度较小的索引号表示重复的字符串，再用 Huffman编码压缩数据。可达到 50%~90% 的高压缩率。

![image](https://cdn.xiaolincoding.com//picgo/image-20240105143355912.png)

### HTTP/3强势来袭

### 既然有了HTTP，为什么还要有RPC？

RPC(Remote Procedure Call) 远程过程调用。它本身不是具体协议，而是一种调用方式。

举个例子，调用本地方法就像： `res = localFunc(req)`

如果现在这个不是本地方法，而是远程服务器暴露出来的一个方法remoteFunc，如果可以像调用本地方法一样调用它，就很方便。

`res = remoteFunc(req)`

基于这个思路，大佬们造出了多款RPC协议，出名的有gRPC、thrift.

### HTTP 和 RPC的区别？

#### 服务发现
首先要向某个服务器发起请求，要建立连接，知道IP和端口。这个过程就叫服务发现。
HTTP中，只要知道服务域名，就可以通过DNS服务解析IP。

在RPC中，一般有专门的中间服务去保存服务名和IP信息，访问某个服务要访问中间服务。

#### 底层连接形式

以主流的 HTTP/1.1协议为例，其默认在建立底层 TCP 连接之后会一直保持这个连接(Keep Alive)，之 后的请求和响应都会复用这条连接。
而 RPC 协议，也跟 HTTP 类似，也是通过建立 TCP 长链接进行数据交互，但不同的地方在于，RPC 协议 般还会再建个连接池，在请求量大的时候，建立多条连接放在池内，要发数据的时候就从池里取一条连接出来，用完放回去，下次再复用，可以说非常环保。

### 传输内容
HTTP/1.1传输内容很多冗余、RPC的定制化程度高，也不是面向浏览器。HTTP/2的性能可能比很多RPC协议还要好，gRPC底层也是HTTP/2。

### 总结
既然有了HTTP/2，为什么还要有RPC协议？

这个是由于HTTP/2是2015年推出的，基于历史原因，已经有很多公司内部的RPC协议稳定运行了很久，也没必要换了。

### 既然有HTTP，为什么还要WebSocket？

#### 怎么样才能在用户不做任何操作的情况下，网页能收到消息并发生变更?

最常见的就是前端轮询。每隔一两秒请求后端，看有没有请求进来。

#### 长轮询
我们知道，HTTP 请求发出后， 一般会给服务器留一定的时间做响应，比如3秒，规定时间内没返回，就 认为是超时。

如果我们的 HTTP 请求将超时设置的很大，比如 30 秒，在这 30 秒内只要服务器收到了扫码请求，就立马 返回给客户端网页。如果超时，那就立马发起下一次请求。

这样就减少了HTTP请求的个数。

像这样发起一个请求，在较长时间内等待服务器响应的机制就是长轮询。rocketmq，消费者取数据的时候也是这种方式。

但是这种场景主要是用于扫码登陆这种简单场景。网页游戏就不行了。

### WebSocket是什么

TCP连接两端双方可以主动向对方发送数据，叫全双工，目前用得最多的HTTP/1.1，是基于TCP协议的。同一时间里，客户端和服务器只能有一方主动发数据，就是半双工。

也就是说，TCP是全双工的，但是HTP/1.1用成了半双工。

为什么?
这是由于 HTTP 协议设计之初，考虑的是看看网页文本的场景，能做到客户端发起请求再由服务器响应
就够了，根本就没考虑网页游戏这种，客户端和服务器之间都要互相主动发大量数据的场景。

为了解决客户端和服务器之间都要互相主动发送大量数据的场景，新的应用层协议WebSocket就设计出来了。

### 怎么建立WebSocket连接？

为了兼容旧的HTTP协议，浏览器在三次TCP握手之后，都统一使用HTTP协议先进性一次通信。
- 普通HTTP请求，后续就照旧
- 如果是想建立WebSocket连接，就会在HTTP请求里带上特殊的header头。

```
Connection: Upgrade
Upgrade: WebSocket
Sec-Websocket-Key: T2a6wZlAwhgQNqruZ2YUyg==\r\n
```

HTTP状态码101指的是协议切换。

![image](https://cdn.xiaolincoding.com//mysql/other/f4edd3018914fe6eb38fad6aa3fd2d65.png)

WebSocket不是基于HTTP的新协议，它只有在建立的时候才用到了HTTP。升级完毕之后就没有关系了。

WebSocket完美继承了tcp的全双工，还提供了粘包方案。

适用于服务器和客户端频繁交互的大部分场景。

