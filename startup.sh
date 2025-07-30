#!/bin/bash

# Copia o nginx.conf customizado (se quiser usar o seu)
cp /home/site/wwwroot/nginx.conf /etc/nginx/sites-available/default

# Reinicia o nginx apontando para a pasta public
service php8.2-fpm start
nginx -g "daemon off;"
