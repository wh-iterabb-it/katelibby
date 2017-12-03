FROM mhart/alpine-node:8.6.0

ENV KATELIBBY_RELEASE_VERSION=0.1.19

RUN apk --update add\
  bash\
  git\
  openssh

COPY package.json /tmp/

RUN cd /tmp && npm install

WORKDIR /var/service
COPY . /var/service

RUN mv /tmp/node_modules node_modules

EXPOSE 5872

CMD ["npm", "start"]
