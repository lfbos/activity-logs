# Activity logs app

## Simple app to display posts, register views, likes and so on.

### Run the application
1. Install docker and docker-compose.
2. Run the frontend and the backend using `docker compose up -d`
3. You also can generate fake data using `docker compose exec backend python manage.py generate_data`
that command will generate 1.000.000 logs, 200 posts and 1000 users.
4. To play with the app you can access to this url `http://localhost:3000`.  