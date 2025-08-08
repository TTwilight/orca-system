# jeans dockerfile
FROM hub.17usoft.com/scenic_apps/nodejs18-golang1_21:0.0.1

RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pm2
RUN npm install pnpm -g
ENV PATH /usr/local/bin:$PATH
RUN pnpm config set registry https://registry.npmmirror.com
WORKDIR /release
COPY . /release
RUN ls -l
RUN cat ./dockerbuildenv.sh
RUN chmod +x ./dockerbuildenv.sh
RUN ls -l

# 定义环境变量
# RUN source ./dockerbuildenv.sh
RUN pnpm install
# RUN npm run build-${serverGroupKey}
RUN npm run build-qa
RUN ls -l

ENV GO111MODULE=on  GOPROXY=https://goproxy.cn,direct
WORKDIR /release/services/pageSpy
RUN go mod tidy && go build -o main bin/main.go && ls -l

# 暴露应用端口（根据你的应用需要调整端口）
EXPOSE 8080
EXPOSE 8090

WORKDIR /release

# 使用 pm2-runtime 启动应用
CMD ["pm2-runtime", "start", "config/ecosystem.qa.config.js"]

RUN echo 'finish'