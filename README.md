# 🧩 Monorepo - Orders API, Customer API & Lambda

Este proyecto contiene tres servicios principales que trabajan juntos dentro de un entorno **Dockerizado**:

- 🛒 **orders-api** → Gestión de órdenes.
- 👤 **customer-api** → Gestión de clientes.
- ⚙️ **lambda** → Integración y orquestación mediante Serverless Framework.

---

## 🧱 Estructura del proyecto

├── customer-api/
│ ├── src/
│ ├── package.json
│ └── Dockerfile
├── orders-api/
│ ├── src/
│ ├── package.json
│ └── Dockerfile
├── lambda/
│ ├── handler.js
│ ├── serverless.yml
│ └── Dockerfile
└── docker-compose.yml


---

## ⚙️ Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- 🐳 [Docker](https://www.docker.com/)
- 🐙 [Docker Compose](https://docs.docker.com/compose/)
- 🔑 Cuenta o licencia válida para [Serverless Framework](https://www.serverless.com)

---

## 🚀 Configuración y ejecución

### 1. Variables de entorno

Cada servicio utiliza un archivo `.env` con la configuración de base de datos y puertos:

```bash
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=1234
DB_NAME=shopdb
PORT=3001 # (o el puerto que corresponda)


2. Levantar los servicios

Ejecuta el entorno completo con:

docker compose up --build


| Servicio       | Puerto Expuesto | Descripción                    |
| -------------- | --------------- | ------------------------------ |
| `customer-api` | 3001            | API de clientes                |
| `orders-api`   | 3002            | API de órdenes                 |
| `lambda`       | 3000            | Serverless Framework (offline) |
| `mysql`        | 3306            | Base de datos MySQL            |
