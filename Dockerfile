FROM mhart/alpine-node:8.6.0

# Copy source code
COPY . /app

# Change working directory
WORKDIR /app

# Install dependencies
RUN npm install

# Create Distribution
RUN npm run build

# Expose API port to the outside
EXPOSE 80

# Launch application
CMD ["npm","start"]
