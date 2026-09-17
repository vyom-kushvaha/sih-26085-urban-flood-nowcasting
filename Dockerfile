FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    libexpat1 \
    libgdal34 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt requirements-deploy.txt ./
RUN pip install --no-cache-dir -r requirements-deploy.txt

COPY . .
# Hugging Face Spaces & standard rootless container support (UID 1000)
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 7860
EXPOSE 8000
ENV PORT=7860
ENV HOST=0.0.0.0

CMD ["python", "scripts/start_production.py"]
