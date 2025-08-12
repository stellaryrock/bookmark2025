use bookmarkdb;
show tables;

drop table if exists Member;
create table Member (
  id int unsigned auto_increment primary key,
  createdAt timestamp default current_timestamp,
  updatedAt timestamp default current_timestamp on update current_timestamp,
  nickname varchar(21) not null,
  email varchar(128) not null,
  passwd varchar(255) null,
  image varchar(255) null,
  emailAuth varchar(256) null comment 'email 인증 키',
  outdt varchar(10) null,
  descript varchar(512) null,
  UNIQUE KEY `uniq_Member_email` (`email`)
);

drop table if exists Book;
create table Book (
    id int unsigned auto_increment primary key,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    member int unsigned not null,
    title varchar(15) not null,
    withdel boolean not null default false,
    ispublic boolean not null default false,
    remark varchar(512) null,
    constraint fk_Book_member foreign key (member) references Member(id)
      on delete cascade on update cascade
);

drop table if exists Mark;
create table Mark (
    id int unsigned auto_increment primary key,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    book int unsigned not null,
    title varchar(15) not null,
    link varchar(512) not null,
    image varchar(255) null,
    maker int unsigned null,
    remark varchar(512) null,
    constraint fk_Mark_book foreign key (book) references Book(id)
        on delete cascade on update cascade,
    constraint fk_Mark_maker_Member foreign key (maker) references Member(id)
        on delete set null on update cascade
);

create table Likes (
    id int unsigned auto_increment primary key,
    createdAt timestamp default current_timestamp,
    mark int unsigned not null,
    member int unsigned null,
    constraint fk_Likes_mark foreign key (mark) references Mark(id)
        on delete cascade on update cascade,
    constraint fk_Likes_member foreign key (member) references Member(id)
        on delete set null on update cascade
);

create table FollowBook (
    id int unsigned auto_increment primary key,
    createdAt timestamp default current_timestamp,
    book int unsigned not null,
    member int unsigned null,
    constraint fk_FollowBook_book foreign key (book) references Book(id)
        on delete cascade on update cascade,
    constraint fk_FollowBook_member foreign key (member) references Member(id)
        on delete set null on update cascade
);

create table Talk (
    id int unsigned auto_increment primary key,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    mark int unsigned not null,
    member int unsigned null,
    msg varchar(511) not null,
    constraint fk_Talk_mark foreign key (mark) references Mark(id)
        on delete cascade on update cascade,
    constraint fk_Talk_member foreign key (member) references Member(id)
        on delete set null on update cascade
);

create table Report (
    id int unsigned auto_increment primary key,
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp,
    mark int unsigned not null,
    member int unsigned not null,
    constraint fk_Report_mark foreign key (mark) references Mark(id)
        on delete cascade on update cascade,
    constraint fk_Report_member foreign key (member) references Member(id)
        on delete cascade on update cascade
);