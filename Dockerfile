#Download dockerimage
FROM alpine:3.4 


LABEL authors="Nick Baf"

RUN apk add --update nodejs bash git
# Best practise to install dependencies first and then copy the binaries
COPY package.json /www/package.json
#Install dependencies and typescript compiler
RUN cd /www; npm install && npm install tsc -g
COPY . /www
WORKDIR /www
#Change to the workdir and then compile ts files(Not sure if this is the best practise)
RUN npm run tsc
ENV PORT 3000

EXPOSE  3000
CMD ["npm", "start"]
