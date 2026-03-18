# Use official Node.js image
FROM node:alpine3.23

# Set working directory
WORKDIR /frontend
# Copy package files first (for caching)
COPY package*.json ./
# Install dependencies
RUN npm install

COPY . .
ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL
RUN npm run build


# Copy application code
# Expose the app port
# Start the app
#CMD ["npm", "run", "dev", "-- --no-turbo"]
CMD ["npm", "start"]
