# node-server

上线测试项目


修改密码最大长度
```sql
ALTER TABLE `techat`.`users` 
CHANGE COLUMN `password` `password` VARCHAR(150) NULL DEFAULT NULL;
```