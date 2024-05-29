
## Machine local enviroment 


# Tarea
Pequeña API en TypeScript, usando SQLite que permita agregar:

1. Frutas y sus distintos tipos de Variedades.
2. Cosechas.
3. Agricultores y sus distintos Campos.
4. Clientes.



## docker compose 
docker network create onesta

cd /app
docker build --no-cache --progress=plain -t svelte-app .
cd ..
cd /api
docker build --no-cache --progress=plain -t nestjs-app .
cd ..

docker-compose up --build

docker-compose down



## backend

```
cd api

npm install

npm run start:dev

Swagger: http://localhost:3000/api

```

## frontend

```
cd app

npm install

npm run dev

``