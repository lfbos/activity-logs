#!/bin/sh

until PGPASSWORD=$POSTGRES_PASSWORD psql -h $POSTGRES_HOST -W $POSTGRES_PASSWORD -U $POSTGRES_USER -c '\q'; do
  echo "Waiting for postgres server"
  sleep 1
done

# DB Migrations
python3 manage.py migrate --noinput

# Run server
python manage.py runserver 0.0.0.0:8000

exec "$@"
