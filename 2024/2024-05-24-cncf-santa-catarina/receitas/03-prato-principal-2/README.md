## Setup
```terminal
kubectl create ns prato-principal-2
kubens prato-principal-2
```

### Debug exporter
```terminal
kubectl apply -f collector-debug.yaml
kubectl logs daemonsets/logs-dos-pods-collector
```

### OTLP Exporter (Grafana Cloud)
```terminal
kubectl apply -f collector-grafana-cloud.yaml
kubectl logs daemonsets/logs-dos-pods-collector
```

## Enviando dados

Não é necessário, os receivers vão buscar os dados na fonte.
