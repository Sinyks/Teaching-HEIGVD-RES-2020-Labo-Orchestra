FROM node:lts

# docker build -t res/auditor .
# docker run -p 2205:2205 -d res/auditor

COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

EXPOSE 2205

ENTRYPOINT ["node", "/opt/app/auditor.js"]
