create database bookstore; #created database
use bookstore; #using bookstore database

# creating a table in database

create table books (
books_id int primary key auto_increment,
title varchar(255),
author varchar(255),
price decimal (10,2),
category varchar(100),
image varchar(500)
);

#insert data

insert into books (title,author,price,category,image)
values
(
'Node.js Guide',
'John Smith',
29.99,
'Programming',
'hƩps://picsum.photos/200/300'
),
(
'JavaScript Mastery',
'David Brown',
34.99,
'Programming',
'hƩps://picsum.photos/200/301'
),
(
'CSS Design',
'Sarah Wilson',
19.99,
'Web Design',
'hƩps://picsum.photos/200/302'
);

