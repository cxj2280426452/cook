-- 完成用户登录表创建
CREATE DATABASE xz;
-- #1:进入xz库
USE xz;
-- #2:创建xz_login表
CREATE TABLE xz_login(
  id INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(50),
  upwd  VARCHAR(32)
);
-- #3:添加二条测试数据[合法]
INSERT INTO xz_login VALUES(null,'tom',md5('123'));
INSERT INTO xz_login VALUES(null,'jerry',md5('123'));



