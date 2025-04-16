# springboot面试篇

## Bean的作用域？
bean有多种作用域，默认就是单例。

- singleton：默认的作用域，每个spring容器中一个bean实例。
- prototype：每次请求(就是调用getBean)创建一个实例。
- request：每个HTTP请求创建一个实例(仅限Web应用)
- session：每个HTTP会话创建一个实例(仅限web应用)
- application：整个Web应用共享一个实例。

## MyBatis和MyBatis-Plus的区别
  
**MyBatis：**

手动编写SQL语句，CRUD操作要手动实现，分页也要手写。

**MyBatis-plus：**

基础的SQL会自己生成，内置通用的BaseMapper，支持快速CRUD。分页插件也是内置的
