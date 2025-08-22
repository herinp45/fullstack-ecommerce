FROM python:3.11-slim
# Install necessary packages
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirement.txt .
RUN pip install --no-cache-dir torch==2.7.1 torchvision==0.22.1 --index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir -r requirement.txt

# Copy the application code
COPY . .
# Expose the port the app runs on
EXPOSE 5000

# Run application
CMD ["gunicorn", "--bind", "0.0.0:5000", "app:app"]