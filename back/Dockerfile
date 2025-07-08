# -------- Stage 1: Build Dependencies --------
  FROM node:18 AS builder

  WORKDIR /app
  
  # Install build dependencies
  RUN apt-get update && apt-get install -y \
      build-essential \
      && rm -rf /var/lib/apt/lists/*
  
  # Copy package.json and install dependencies
  COPY package*.json ./
  RUN npm install --production
  
  # Copy app source
  COPY . .
  
  # -------- Stage 2: Production Image --------
  FROM node:18-slim
  
  WORKDIR /app
  
  # Copy only what's needed from builder
  COPY --from=builder /app /app
  COPY --from=builder /usr/local/lib/node_modules /usr/local/lib/node_modules
  COPY --from=builder /usr/local/bin /usr/local/bin
  
  # If using native bindings (like tfjs-node), copy compiled binaries too
  COPY --from=builder /root/.npm /root/.npm
  
  CMD ["node", "index.js"]
  