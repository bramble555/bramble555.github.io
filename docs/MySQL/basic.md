## Mosh 学习笔记

**链接**: https://zhuanlan.zhihu.com/p/222865842

 - DDL（data  definition language 数据库定义语言）
 - DML（data manipiation language 数据操纵语言）
 - DCL (data control language 数据控制语言 )
 - DDL：create、alter、drop、show
 - DML: insert、update、delete、select
 - DCL：grant、revoke

## 其余

### connect mysql

`mysql -u root -p`  回车 然后 密码

例如进入docker 中的 mysql

docker exec -it mysql-blog mysql -u root -p,然后回车输入密码

 - `bin`文件用来放命令
 - `include`包含头文件
 - `lib`引用库
 - `share`字符集编码

一般再自己创建一个 data folder

查询编码问题:  show variables like 'character_set_%';

### show databases

 - `information_schema`：信息图式，存储服务器管理数据库的信息
 - `mysql`：存放系统信息，用户名密码等
 - `performance_schema`：性能图式
 - `sys`：系统文件

### operation

####  database

CREATE DATABASE IF NOT EXISTS school;

SHOW CREATE DATABASE school;

DROP DATABASE IF EXISTS school;

ALTER DATABASE school CHARSET = utf8;

USE school;

#### table

SHOW TABLES;

CREATE TABLE IF NOT EXISTS teacher (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键id',
    name VARCHAR(30) NOT NULL COMMENT '老师的名字',
    phone VARCHAR(20) COMMENT '电话号码',
    address VARCHAR(100) DEFAULT '暂时未知' COMMENT '住址'
) ENGINE=INNODB;

DESC teacher;

ALTER TABLE old_table_name RENAME TO new_table_name;

DROP TABLE IF EXISTS teacher;

#### column

ALTER TABLE table_name ADD column_name column_type;

ALTER TABLE table_name ADD column_name column_type AFTER column_name;

ALTER TABLE table_name ADD column_name column_type FIRST;



ALTER TABLE table_name DROP column_name;

ALTER TABLE table_name CHANGE old_column_name new_column_name column_type;

ALTER TABLE table_name MODIFY column_name new_column_type;

#### data

INSERT INTO table_name VALUES (value1, value2, value3, ...);

INSERT INTO table_name VALUES(value1, value2, value3, ...),(value1, value2, value3, ...);

DELETE FROM table_name WHERE column_name = specific_value;

truncate table teacher;

 - #### DELETE vs TRUNCATE (Auto Increment)

   - When using `DELETE` to clear a table:
     - The **AUTO_INCREMENT value does NOT reset to 1**
     - It continues from the last deleted value
   - When using `TRUNCATE` to clear a table:
     - The table is **dropped and recreated**
     - The **AUTO_INCREMENT value resets to 1**
     - It behaves like a brand-new empty table

UPDATE table_name
SET column_name = new_value
WHERE condition_column = specific_value;



#### data type

int, id

float

decimal(定点)对钱管理

varchar,不定长,地址,用户名

char,定长,手机号

text, 文章

bool,1 = true

enum,底层是存储整数,非常节省空间,性别,单选

set,多选题

datetime,不受时区影响

#### primary key(not null & default or AUTO_INCREMENT)

alter table table_name  add primary key column_name；

alter table table_name drop primary key；

alter table 表名 add primary key (column_name1,column_name2);

#### unique

alter table table_name add unique  (column_name1,column_name2);

alter table table_name drop index column_name;

#### foreign key

alter table table_name add foreign key column_name 

references table_name column_name ;

alter table table_name drop foreign key forrign_column_name;

#### (Normal Forms)范式

 Codd第一范式：确保每列原子(不可以再分)

 Codd第二范式：完全依赖 (一个表一个功能,一个表中某一列完全依赖于**整个**主键)

Codd第三范式：消除传递依赖

#### select

select * from table_name;

select *2* * *7* as res from dual; /*计算器*/ (dual是伪表)



条件:

好的，我帮你整理了一份关于 SQL 的笔记，涵盖了你提到的常见操作和函数。你可以用这个笔记来复习 SQL 的基本操作，特别是准备春招时会用到的。

------

### **SQL 常见条件和运算符**

- **`<`、`>`、`=`、`!=`、`<>`**：比较运算符

- **`AND`、`OR`**：逻辑运算符

- **`BETWEEN`**：区间筛选，包含边界

  ```sql
  SELECT * FROM table WHERE column BETWEEN 100 AND 200;
  ```

- **`IN`**：匹配多个值，适用于子查询表较小时

  ```sql
  SELECT * FROM table WHERE column IN (1, 2, 3);
  ```

- **`EXISTS`**：适用于主查询表较小时，判断子查询是否有结果

  ```sql
  SELECT * FROM table WHERE EXISTS (SELECT 1 FROM another_table WHERE condition);
  ```

- **`LIKE`**：模糊查询，`%` 表示任意多个字符，`_` 表示一个字符

- **`IS NULL`**：判断是否为空

### **聚合函数**

- **`SUM()`**：求和

- **`AVG()`**：计算平均值

- **`COUNT(DISTINCT)`**：计数不重复的值

  ```sql
  SELECT COUNT(DISTINCT department_id) FROM employees;
  ```

- **`> ALL()` 和 `> MAX()`**：与最大值对比

  ```sql
  SELECT * FROM employees WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 1);
  ```

- **` >ANY()` 和 `>MIN()`**：与最小值对比

  ```sql
  SELECT * FROM employees WHERE salary > ANY (SELECT salary FROM employees WHERE department_id = 1);
  ```

### **数学函数**

- **`FLOOR()`**
- **`ABS()`**
- **`CEILING()`**
- **`ROUND()`**
- **`TRUNCATE()`**

### **字符串操作**

- **`CONCAT()`**：横向拼接字符串

  ```sql
  SELECT CONCAT(first_name, ' ', last_name) FROM employees;
  ```

  char_length(): 计算字符长度函数的

  length():

  ****

- **`GROUP_CONCAT()`**：纵向拼接，合并多行数据为一行

  ```sql
  SELECT department_id, GROUP_CONCAT(employee_name) FROM employees GROUP BY department_id;
  ```

- **`DISTINCT`**：去重

  ```sql
  SELECT DISTINCT department_id FROM employees;
  ```

- **`GROUP_CONCAT(DISTINCT column_name)`**：纵向拼接并去重

  ```sql
  SELECT department_id, GROUP_CONCAT(DISTINCT employee_name) FROM employees GROUP BY department_id;
  ```

- **`SEPARATOR`**：指定拼接的分隔符

  ```sql
  SELECT department_id, GROUP_CONCAT(employee_name SEPARATOR ', ') FROM employees GROUP BY department_id;
  ```

### **`HAVING` 和 `WHERE`**

- **`HAVING`**：用于聚合后的过滤

  ```sql
  SELECT department_id, AVG(salary) FROM employees GROUP BY department_id HAVING AVG(salary) > 5000;
  ```

- **`WHERE`**：通常用于普通的行过滤，不能用于聚合函数

  ```sql
  SELECT * FROM employees WHERE salary > 3000;
  ```

### **排序和限制结果**

- **`ORDER BY`**：排序，`ASC` 为升序（默认），`DESC` 为降序
- **`LIMIT`**：

### **`IF` 和 `CASE WHEN THEN` 条件表达式**

- **`IF`**：用于简单的条件判断

  ```sql
  SELECT IF(age >= 25, '25岁及以上', '25岁以下') AS age_cut FROM employees;
  ```

- **`CASE WHEN THEN`**：用于更复杂的多条件判断

  ```sql
  SELECT CASE
             WHEN age IS NULL THEN '其他'
             WHEN age < 20 THEN '20岁以下'
             WHEN age BETWEEN 20 AND 24 THEN '20-24岁'
             WHEN age >= 25 THEN '25岁及以上'
          END AS age_cut
  FROM employees;
  ```

### **日期和正则表达式**

CURDATE()返回的是DATE类型

Now()返回的是DATETIME类型

- **日期加一天**

  ```sql
  SELECT DATE_ADD(CURDATE(), INTERVAL 1 DAY);  -- 当前日期 + 1天
  ```

- **正则表达式**：匹配特定格式的字符串

  ```sql
  SELECT * FROM users WHERE phone_number REGEXP '^[1-9][0-9]{2}-?[0-9]{3}-?[0-9]{4}$';
  ```



```sql
< > = != and or,  只有 and, 没有 &&
between... and ...
in(a,b,c)    主查询表很大，子查询表很小用 in  主查询表很小，子查询表很大 用 where exist
like      %表示0个或者多个字符,_表示任意单个字符
is null   或者  != 'null 
sum avg  count(distinct)  >all() 可以与 >max 等价  any 可以与 min 等价 
									
FLOOR abs CEILING  round   truncate 
order by   desc asc
group by
CONCAT  横向拼接   GROUP_CONCAT   纵向拼接
distinct   group_concat(distinct column_name)
separator 拼接方式
having   having 和 group 合计函数  使用,没有group by 不能用 having; where 不能和 合计函数使用
limit   个数
(先where 后order 后 limit)
(聚合 from 后group 后 having (不能用别名),order by  可以用别名)
on 是俩张表咋链接 应用场景: 日期差一天;where 是 结果已经生成后，单表把不想要的行直接扔掉

IF(age >= 25, '25岁及以上', '25岁以下') AS age_cut
    CASE 
        WHEN age IS NULL THEN '其他'               -- 年龄为空，归类为其他
        WHEN age < 20 THEN '20岁以下'              -- 年龄小于20岁
        WHEN age BETWEEN 20 AND 24 THEN '20-24岁'    -- 年龄在20至24岁之间
        WHEN age >= 25 THEN '25岁及以上'            -- 年龄大于等于25岁
    END AS age_cut

(from 0 join A join B where 条件)
(from 0 join A join B group by  having )

where phone_number regexp '^[1-9][0-9]{2}-?[0-9]{3}-?[0-9]{4}$'
```

union (去重,速度慢)

union all(不去重,速度快) 结果要求不去重的时候 用这个

#### join

`inner join`与 `join` 是相同的

![在这里插入图片描述](https://img-blog.csdnimg.cn/c340c17573794461b0a82661c19c1ad0.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAWWVhdHNfTGlhbw==,size_11,color_FFFFFF,t_70,g_se,x_16)

left join

![在这里插入图片描述](https://img-blog.csdnimg.cn/a03f1c8885464cf0ad8360f1774684be.png)

自然也有 right join

`cross join` 返回笛卡尔积

natural join

using (column_name) = join table_name  on 条件

#### 子查询

先进行后面的查询,作为子表,然后这个作为主表的条件

一般情况下子查询结果返回超过1行用`in`，只有一行可以用`=`



## sql Hot50（基础版）

1581 左连接，筛选出 is null

自连接

197

1661

inner join

1280









