# Express.js Metrics and Logging Project

## Overview

This project is designed to demonstrate and explore metrics, logging, and containerization using Docker. It features a simple Express.js server and integrates several monitoring and logging tools, including Prometheus, Grafana, and Loki. 

## Project Components

- **Express.js Server**: A basic Node.js server using Express.js to serve HTTP requests.
- **Prometheus**: A metrics collection and monitoring system.
- **Grafana**: A visualization and analytics platform used to create and view dashboards.
- **Loki**: A log aggregation system designed to work seamlessly with Grafana.

## Technologies Used

- Docker
- Docker Compose
- Express.js
- Prometheus
- Grafana
- Loki

## Setup

### Prerequisites

- Docker
- Docker Compose

### Clone the Repository

```sh
git clone git@github.com:harsh9o9/metrics-logs.git
cd metrics-logs
docker compose up --build
```
- Get you ip address (using something like ipconfig, ifconfig, ipconfig getifaddr en0, etc)
- <IP-Address>:9000 for Prometheus
- <IP-Address>:3000 for grafana (use admin:admin as username and password)

### Attachments
<img width="1680" alt="Grafana" src="https://github.com/user-attachments/assets/7dd190ba-8239-4fc7-87f6-6ed4018d3ce6">
<img width="1680" alt="Prometheus" src="https://github.com/user-attachments/assets/d032321e-d401-4cff-b211-82bcb748e5a0">
<img width="1302" alt="Containers" src="https://github.com/user-attachments/assets/6a3c6fe6-a41c-43fb-a245-8e2b8a56b93a">

