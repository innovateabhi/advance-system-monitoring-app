# =====================================================
# Linux System Monitoring App
# Production Dockerfile
# =====================================================

# Base Image
FROM python:3.12-slim

# Metadata
LABEL maintainer="Abhinandan Roy"
LABEL project="Linux System Monitoring"
LABEL version="1.0"

# Prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1

# Print logs immediately
ENV PYTHONUNBUFFERED=1

# Working Directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m -s /bin/bash appuser

# Give ownership to appuser
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Flask Port
EXPOSE 5000

# Health Check
HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=20s \
            --retries=3 \
CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:5000/')" || exit 1

# Start Flask
CMD ["python", "app.py"]
