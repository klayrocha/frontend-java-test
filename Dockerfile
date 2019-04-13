FROM nginx:1.15.8-alpine
COPY dist/jumia-phone/ /usr/share/nginx/html
COPY dist/jumia-phone/ /usr/share/nginx/htm
