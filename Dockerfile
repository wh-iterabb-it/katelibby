FROM mhart/alpine-node:10.15.0

# creating working directory
RUN mkdir -p /usr/src/app

# copy files to working directory
COPY . /usr/src/app/

# change working directory
WORKDIR /usr/src/app

# install node dependencies
RUN npm install

# create distribution
RUN npm run build

# launch application
CMD ["npm","start"]
