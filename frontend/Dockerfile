FROM node:16.13.0-alpine as builder
RUN mkdir -p /app
COPY dist /app


FROM nginx:1.17.1-alpine
COPY --from=builder /app /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]