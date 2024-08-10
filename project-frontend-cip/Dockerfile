FROM nginx:latest
COPY dist/bcr /usr/share/nginx/app
COPY nginx.conf /etc/nginx/conf.d/default.conf
ENV TZ="America/El_Salvador"
EXPOSE 80