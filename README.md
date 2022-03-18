# simple-express-mongodb-restapi
Simple NodeJs backend with MongoDb with public and private routes hosted on Heroku

## Introduction
This is s a simple RESTFUL API build with NodeJs and MongoDb hosted on Herokuarticles

[Docs](https://documenter.getpostman.com/view/4389977/UVsPNPWZ#9f0e387c-f0e7-47ec-8dfc-53d8973e7c8d)

## GETTING STARTED
Login in to MongoDb and create a cluster then white list your ip. Save the database connect credntials and set them in the .env as follows

DB_CLUSTER
DB_NAME
DB_USER
DB_PASSWORDI

## USERS
Get All users and single user from the database over a protected route, follow and unfolow users.

## AUTH
Register and login providing only username and password

## POSTS
Create, update and delete articles, like and unlike posts, post comments

fetch all posts on a public route anda protected single post on aprotected route
