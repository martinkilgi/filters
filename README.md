# Filters

## Database
PostgreSQL is used as a database and can be started locally by navigating into `/docker` folder, starting Docker daemon and running `docker compose up -d`.
PS! If you are running it on Windows and have PostgreSQL Server installed, it could create a conflict between Postgre Docker container and local server.
Since they are running on same port (5432), it could cause authentication problems.
To fix this, you can simply stop your local PostgreSQL server.

## Backend
Backend can be started by running `./gradlew bootRun`. Default port is 8080.

## Frontend
Frontend can be started by executing `npm install` and then `ng serve`. By default it will run on `localhost:4200`.

## Used technology and versions
* Java - 21 <br />
* Spring Boot - 3.3.3 <br />
* Angular - 17 <br />
