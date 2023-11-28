# Development Stage
FROM node:18.18 AS development

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install ts-node -g

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:18.18 as production

# Set environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy files for production
COPY . .
COPY --from=development /app/build ./build

CMD ["npm", "run", "prod"]