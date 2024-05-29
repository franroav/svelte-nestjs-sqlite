
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

## Kubernetes 

kind create cluster --name onesta-cluster

- kubectl config current-context
- kubectl config get-contexts
- kubectl config use-context <name> 

cd /app
docker build --no-cache --progress=plain -t svelte-app .
cd ..
cd /api
docker build --no-cache --progress=plain -t nestjs-app .
cd ..

kind load docker-image nestjs-app --name onesta-cluster

kind load docker-image svelte-app --name onesta-cluster

kubectl apply -f namespace.yaml
kubectl apply -f sqlite3.yaml
kubectl apply -f api-server.yaml
kubectl apply -f svelte-app.yaml
kubectl apply -f traefik.yaml
kubectl apply -f ingress-route.yaml


kubectl get pods -n onesta

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