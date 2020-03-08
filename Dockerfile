FROM mhart/alpine-node:latest AS builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/dist .
CMD ["serve", "-p", "80", "-s", "."]
