## Setup

### Kafka Operator
```terminal
kubectl create ns kafka
kubens kafka

kubectl create -f 'https://strimzi.io/install/latest?namespace=kafka'
kubectl wait --for=condition=Available deployments/strimzi-cluster-operator --timeout=300s
```

### Cluster Kafka para nosso Collector
```terminal
kubectl apply -f mensageria-do-collector.yaml
kubectl wait kafka/mensageria-do-collector --for=condition=Ready --timeout=300s
```

### Namespace para a sobremesa
```terminal
kubectl create ns sobremesa
kubens sobremesa
```

### Debug exporter
```terminal
kubectl apply -f otelcol-publica.yaml
kubectl apply -f otelcol-consome-debug.yaml
kubectl wait --for=condition=Available deployments/publica-na-mensageria-collector
kubectl wait --for=condition=Available deployments/consome-da-mensageria-collector

kubectl logs deployments/consome-da-mensageria-collector
```

### OTLP Exporter (Grafana Cloud)
```terminal
kubectl apply -f otelcol-publica.yaml
kubectl apply -f otelcol-consome-grafana-cloud.yaml
kubectl wait --for=condition=Available deployments/publica-na-mensageria-collector
kubectl wait --for=condition=Available deployments/consome-da-mensageria-collector
```

## Enviando dados
```terminal
kubectl port-forward deployments/publica-na-mensageria-collector 4317
telemetrygen traces --traces 5 --otlp-insecure --otlp-attributes='receita="sobremesa"'
```