FROM mhart/alpine-node:8.6.0

# Creating working directory
RUN mkdir -p /usr/src/app

# Copy files to working directory
COPY . /usr/src/app/

# Change working directory
WORKDIR /usr/src/app

# Install node dependencies
RUN npm install

# Create Distribution
RUN npm run build

# Expose API port to the outside
EXPOSE 3924

# Launch application
CMD ["npm","start"]
