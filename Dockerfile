FROM mhart/alpine-node:10.15.0

# install git
RUN apt-get install -y git

# creating working directory
RUN mkdir -p /usr/src/app

# copy files to working directory
COPY . /usr/src/app/

# change working directory
WORKDIR /usr/src/app

# install node dependencies
RUN npm install

# launch application
CMD ["npm","start"]
