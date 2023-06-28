FROM node:18.16.1-alpine3.17
RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown app:app /app # chown : 改变 /app 文件夹的所有者，下面再 npm i 就不会报错了
USER app

WORKDIR /app
RUN mkdir data # 这样，当使用 volume 时，就不会产生权限问题
COPY package*.json .
RUN npm install
COPY . .
ENV API_UPL=http://api.myapp.com/
EXPOSE 5173
# CMD npm run dev
CMD ["npm", "run", "dev"]

# ENTRYPOINT ["npm", "run", "dev"]