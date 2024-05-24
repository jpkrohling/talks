## Setup
```terminal
otelcol-contrib --config otelcol.yaml
```

## Enviando dados
```terminal
telemetrygen traces --traces 5 --otlp-insecure --otlp-attributes='receita="entrada"'
```