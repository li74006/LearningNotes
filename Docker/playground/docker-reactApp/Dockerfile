FROM node:18.16.1-alpine3.17
# RUN addgroup app && adduser -S -G app app
# USER app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV API_UPL=http://api.myapp.com/
EXPOSE 5173
# CMD npm run dev
# CMD ["npm", "run", "dev"]

# ENTRYPOINT ["npm", "run", "dev"]