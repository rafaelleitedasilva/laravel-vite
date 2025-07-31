# Etapa 1 - Build dos assets com Node
FROM node:20 AS node-builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY resources/ resources/
COPY vite.config.js .
COPY public/ public/
COPY --from=php-builder /app /app

RUN npm run build


# Etapa 2 - PHP + Composer
FROM php:8.3-apache AS php-builder

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev zip libpng-dev libonig-dev libxml2-dev \
    libpq-dev libcurl4-openssl-dev && \
    docker-php-ext-install pdo pdo_mysql zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copia os arquivos do projeto Laravel
COPY . .

# Instala dependências PHP
RUN composer install --no-dev --optimize-autoloader

# Etapa final - junta tudo
FROM php:8.3-apache

COPY --from=php-builder /app /var/www/html
COPY --from=node-builder /app/public/build /var/www/html/public/build

# Ativa mod_rewrite para Laravel
RUN a2enmod rewrite

# Configuração básica do Apache
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
</Directory>' > /etc/apache2/conf-available/laravel.conf && \
    a2enconf laravel

# Define diretório de trabalho e permissões
WORKDIR /var/www/html
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
