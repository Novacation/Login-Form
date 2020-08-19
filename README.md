# Integrated Login System


A system made basically by using HTML5, CSS3, JS, and a SQL connection, where you can store logins with encrypted passwords and give an access token with an expiring time.


# Get started

First of all, you'll need to download and configure Nodejs for making the local server up and run all the application. 

. Here is a video tutorial for helping you with the Nodejs thing https://youtu.be/JINE4D0Syqw

. Open the CMD, to go to the project root and run npm start command.

Now you have all the project dependencies installed.


# ATTENTION!

Make sure you do have downloaded the .env file and of It's being on the project root.


# MySQL

After correctly installing and configuring the MySQL, run the scripts in the /public/SQL/System_Queries.sql file.

# ATTENTION!

In the .env file, make sure you've set the DB_USER and DB_PASS with the same inputs that you configured the MySQL. For example, if your user and password are respectively "root" and "123456", then you'll have to set DB_USER and DB_PASS as "root" and "123456". Otherwise, the database connection won't work.


# FINALLY

After correctly doing all those steps:

. Open the CMD, to go to the project root and type node app.js.

. Open your browser and set the URL as "http://localhost:8081/Auth/main-page"




![image](https://user-images.githubusercontent.com/47398013/90531426-6e267680-e14c-11ea-9170-f82180358444.png)
