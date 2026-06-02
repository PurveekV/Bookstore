#create database bookstore; #created database
use bookstore; #using bookstore database

create table authors (
author_id int primary key auto_increment,
name varchar(255) );

create table books (
books_id int primary key auto_increment,
author_id int,
title varchar(255),
price decimal(10,2),
category varchar(100),
image varchar(255),
foreign key (author_id) references authors(author_id)
);


select b.title, b.price, b.category, b.image, a.name
from books b
join authors a on b.author_id = a.author_id;





insert into authors (name)
values
('John Smith'),
('David Brown'),
('Sarah Wilson');


insert into books (title,price,category,image,author_id)
values
(
'Node.js Guide',
29.99,
'Programming',
'Images/NodeJS-guide.jpg',
1
),
(
'JavaScript Mastery',
34.99,
'Programming',
'Images/JavaScript-Mastery.jpg',
2
),
(
'CSS Design',
19.99,
'Web Design',
'Images/CSS-Design.jpg',
3
);

update  books
set image = 'Images/CSS-Design.jpg'
where image = 'Images/Book3.jpg';

select * from books;

