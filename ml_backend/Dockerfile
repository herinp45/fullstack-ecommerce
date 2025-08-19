FROM python:3.11-slim
# Install necessary packages
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .
# Expose the port the app runs on
EXPOSE 5000

# Run application
CMD ["python", "app.py"]