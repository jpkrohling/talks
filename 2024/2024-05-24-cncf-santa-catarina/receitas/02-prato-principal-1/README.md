## Setup
```terminal
kubectl create ns prato-principal-1
kubens prato-principal-1
```

## Debug exporter
```terminal
kubectl apply -f resources-debug.yaml
kubectl wait --for=condition=Available deployments/eventos-do-cluster-collector

kubectl apply -f workload.yaml
kubectl wait --for=condition=Available deployments/nginx-deployment

kubectl logs deployments/eventos-do-cluster-collector
```

## OTLP Exporter (Grafana Cloud)
```terminal
kubectl apply -f resources-grafana-cloud.yaml
kubectl wait --for=condition=Available deployments/eventos-do-cluster-collector

kubectl apply -f workload.yaml
kubectl wait --for=condition=Available deployments/nginx-deployment

kubectl logs deployments/eventos-do-cluster-collector
```

## Enviando dados

Não é necessário, os receivers vão buscar os dados na fonte.
