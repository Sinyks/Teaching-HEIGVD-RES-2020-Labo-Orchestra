FROM node:lts

# docker build -t res/musician .
# docker run -d res/musician piano

COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/musician.js"]
