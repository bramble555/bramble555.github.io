

## view 

视图主要负责筛选，有意隐藏敏感数据与结构



创建 view:

create view view_name as   select  ...

如果创建的时候,加上 WITH CHECK OPTION;

那么插入和更新某一行的时候,会检查是否满足`创建的时候的条件`

删除 view:

DROP VIEW if exists view_name

更新 view:

CREATE OR REPLACE VIEW view_name AS select ...

删除 row:

DELETE FROM view_name  where ...

更新 column:

UPDATE view_name
SET ...