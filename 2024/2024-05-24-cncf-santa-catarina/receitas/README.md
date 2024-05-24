## Setup

Para a entrada, foi utilizado o OTel Collector Contrib v0.101.0. Baixe-o aqui: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/tag/v0.101.0

Para o restante, foi utilizado o OTel Operator v0.100.0, configurado conforme as instruções do README do projeto. Em resumo:

```
k3d cluster create

kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.5/cert-manager.yaml
kubectl wait --for=condition=Available deployments/cert-manager -n cert-manager

kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
kubectl wait --for=condition=Available deployments/opentelemetry-operator-controller-manager -n opentelemetry-operator-system
```

Para as receitas que envolvem Grafana Cloud, criar um segredo neste estilo:
```
kubectl create secret generic grafana-cloud-credentials --from-literal=GRAFANA_CLOUD_USER="..." --from-literal=GRAFANA_CLOUD_TOKEN="..."
```

Eu utilizo o [kubectx](https://github.com/ahmetb/kubectx) para mudar o contexto do `kubectl`, incluindo a mudança de namespace via `kubens`.
