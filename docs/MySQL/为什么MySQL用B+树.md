# 为什么MySQL喜欢用B+树？

来一张小林的图

![image](https://mmbiz.qpic.cn/mmbiz_png/J0g14CUwaZcz9O5KfqlqMpm7icDcyaekMB26Bias6DiaeL66Wt7mwpQE2cQAkLfbFHOtMgrSaa4NYibkhGnQUGLMlg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

[文章来源](https://mp.weixin.qq.com/s/w1ZFOug8-Sa7ThtMnlaUtQ)

二叉树为什么不能做数据库索引的实现？

只要是二叉树，就避免不了因为数据增多而导致的树高度增加，这带来的IO次数是数据库所不能接受的。

那么为什么用B+树而不是B树？

因为B树把所有的数据直接存储在节点上，即使是非叶子节点也有数据，这会导致如果只是简单地查找单个数据，在从树顶到目标数据途中经过的节点上的数据都是无用的。浪费空间

B+树存在冗余节点，插入和删除时没有复杂的树变形，效率很快。

而且，B+树的所有叶子节点之间还有一个链表进行连接，这种设计对范围查找是很高效的，有了链表，就可以直接在叶子节点之间直接查询了。

聚集索引和二级索引的区别：聚集索引的叶子节点是存放的直接数据，二级索引存放的是主键值。

