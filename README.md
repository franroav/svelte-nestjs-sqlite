
## Machine local enviroment 


### Information Important

1. [Project structure](#projectstructure)
2. [Frontend](#frontend)
3. [Backend](#backend)
4. [documentación](#documentacion)
4. [tarea](#tarea)
6. [dockerized](#dockerized)
7. [kubernetes](#kubernetes)
8. [local](#local)
11. [test coverage](#unittest)


## Project Structure
<a name="projectstructure"/>

The structure of this project defined by folders with specific purpose

```
    Directorio: C:\laragon\www\fullstack\svelte-nestjs-sqlite


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        28-05-2024     12:24                .db
d-----        29-05-2024      3:29                .github
d-----        02-06-2024     23:22                api
d-----        29-05-2024      0:30                app
d-----        29-05-2024      3:31                scripts
-a----        28-05-2024      9:50             88 .gitignore
-a----        29-05-2024      2:32            642 api-server.yaml
-a----        29-05-2024      0:35           2704 docker-compose.yaml
-a----        29-05-2024      2:03            792 ingress-route.yaml
-a----        29-05-2024      2:03             58 namespace.yaml
-a----        28-05-2024      8:22            981 nginx.conf
-a----        29-05-2024      3:53           1739 README.md
-a----        29-05-2024      2:46            910 sqlite3.yaml
-a----        29-05-2024      2:24            713 svelte-app.yaml
-a----        29-05-2024      2:03            841 traefik.yaml
```


## Frontend
<a name="frontend"/>

The structure of this project defined by folders with specific purpose

```

    Directorio: C:\laragon\www\fullstack\svelte-nestjs-sqlite\app


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        29-05-2024      0:30                .svelte-kit
d-----        28-05-2024      9:24                .vscode
d-----        28-05-2024      9:25                node_modules
d-----        28-05-2024      9:25                src
d-----        28-05-2024      9:25                static
-a----        28-05-2024      7:28             50 .dockerignore
-a----        27-05-2024     20:41            160 .eslintignore
-a----        27-05-2024     20:41            591 .eslintrc.cjs
-a----        27-05-2024     20:37            132 .gitignore
-a----        27-05-2024     20:37             19 .npmrc
-a----        27-05-2024     20:41             81 .prettierignore
-a----        27-05-2024     20:41            205 .prettierrc
-a----        28-05-2024     11:57             67 changelog.md
-a----        29-05-2024      0:17           1649 dockerfile
-a----        28-05-2024      7:24            213 nginx.conf
-a----        28-05-2024      6:27         164638 package-lock.json
-a----        29-05-2024      0:30           1472 package.json
-a----        27-05-2024     20:41             75 postcss.config.cjs
-a----        27-05-2024     20:41            942 README.md
-a----        27-05-2024     20:41            740 svelte.config.js
-a----        27-05-2024     20:41            585 tailwind.config.ts
-a----        27-05-2024     20:41            649 tsconfig.json
-a----        27-05-2024     20:41            213 vite.config.ts
```

## Backend
<a name="backend"/>

The structure of this project defined by folders with specific purpose

```
    Directorio: C:\laragon\www\fullstack\svelte-nestjs-sqlite\api


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        02-06-2024     23:43                .db
d-----        28-05-2024      9:43                .git
d-----        02-06-2024     23:22                dist
d-----        31-05-2024     13:54                node_modules
d-----        29-05-2024     13:19                src
d-----        28-05-2024      9:50                test
d-----        31-05-2024     14:19                uploads
-a----        28-05-2024     12:19             20 .env
-a----        27-05-2024     17:28            688 .eslintrc.js
-a----        27-05-2024     17:29            686 .gitignore
-a----        27-05-2024     17:28             54 .prettierrc
-a----        28-05-2024     11:57             71 changelog.md
-a----        28-05-2024     12:40            905 dockerfile
-a----        27-05-2024     17:28            179 nest-cli.json
-a----        31-05-2024     13:54         434872 package-lock.json
-a----        31-05-2024     13:54           2658 package.json
-a----        27-05-2024     17:34           4186 README.md
-a----        27-05-2024     17:28            101 tsconfig.build.json
-a----        27-05-2024     19:04            628 tsconfig.json
```

## documentación
<a name="documentacion"/>

```
Swagger: http://localhost:3000/api

```



# Tarea
<a name="tarea"/>

```
Pequeña API en TypeScript, usando SQLite que permita agregar:

1. Frutas y sus distintos tipos de Variedades.
2. Cosechas.
3. Agricultores y sus distintos Campos.
4. Clientes.

```


## docker compose 
<a name="dockerized"/>

1. docker network create onesta
2. cd /app
3. docker build --no-cache --progress=plain -t svelte-app .
4. cd ..
5. cd /api
6. docker build --no-cache --progress=plain -t nestjs-app .
7. cd ..
8. docker-compose up --build
9. docker-compose down




## Kubernetes 
<a name="kubernetes"/>


1. kind create cluster --name onesta-cluster

- kubectl config current-context
- kubectl config get-contexts
- kubectl config use-context <name> 

2. cd /app
3. docker build --no-cache --progress=plain -t svelte-app .
4. cd ..
5. cd /api
6. docker build --no-cache --progress=plain -t nestjs-app .
7. cd ..

8. kind load docker-image nestjs-app --name onesta-cluster

9. kind load docker-image svelte-app --name onesta-cluster

10. kubectl apply -f namespace.yaml
11. kubectl apply -f sqlite3.yaml
12. kubectl apply -f api-server.yaml
13. kubectl apply -f svelte-app.yaml
14. kubectl apply -f traefik.yaml
15. kubectl apply -f ingress-route.yaml


16. kubectl get pods -n onesta


```

kubectl describe pod <pod-name> --namespace onesta

List resources in a namespace:
- kubectl get pods
- kubectl get deployments
- kubectl get statefulsets
- kubectl get daemonsets
- kubectl get services
- kubectl get configmaps
- kubectl get secrets
- kubectl get ingress

```

### LOCAL ENVIROMEMT
<a name="local"/>

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

```


## test coverage
<a name="unittest"/>

run `npm run test:watch` for start all test into backend
run `npm run test:cov` for start all test coverage

