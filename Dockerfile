FROM nginx
COPY build /usr/share/nginx/html
COPY publish/nginx/default.conf /etc/nginx/conf.d/default.conf