select * from Member;

SET FOREIGN_KEY_CHECKS = 0;
truncate table Likes;
truncate table Mark;
truncate table Book;
truncate table Member;
SET FOREIGN_KEY_CHECKS = 1;

select * from Book;