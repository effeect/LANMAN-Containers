FROM ubuntu:20.04

# Set non-interactive mode for apt
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && \
    apt-get install -y python3 python3-pip curl git ansible gnupg && \
    pip3 install pywinrm

# Install Node.js (v20) and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Create app directory
WORKDIR /app

# Copy package.json and install Node dependencies
COPY package.json ./

# Copy backend code (e.g. index.js)
COPY . .

# Expose backend port
EXPOSE 4000

RUN npm install
RUN npm install cors
# Start the Express server
CMD ["npm", "start"]