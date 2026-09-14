FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt requirements-deploy.txt ./
RUN pip install --no-cache-dir -r requirements-deploy.txt

COPY . .
RUN useradd --create-home appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000
ENV PORT=8000
ENV HOST=0.0.0.0

CMD ["python", "scripts/start_production.py"]
