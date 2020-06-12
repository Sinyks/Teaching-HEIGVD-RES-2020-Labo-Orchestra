FROM node:lts

# docker build -t res/auditor .
# docker run -d res/auditor piano

COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/auditor.js"]
