# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
# Use a Node.js image for building
FROM node:22-alpine AS builder

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --ignore-scripts

# Copy source files
COPY src ./src
COPY tsconfig.json ./

# Build the TypeScript files
RUN npm run build

# Use a minimal Node.js image for runtime
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy compiled files and package.json
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package.json

# Install only production dependencies
RUN npm install --omit=dev --ignore-scripts

# Set environment variable for the API key
ENV PERPLEXITY_API_KEY=<Your_API_Key>

# Set the entry point
ENTRYPOINT ["node", "build/index.js"]
