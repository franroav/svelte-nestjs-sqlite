
## Machine local enviroment 


# Tarea
Pequeña API en TypeScript, usando SQLite que permita agregar:

1. Frutas y sus distintos tipos de Variedades.
2. Cosechas.
3. Agricultores y sus distintos Campos.
4. Clientes.



## docker compose 

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