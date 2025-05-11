FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

# Обновляем и устанавливаем зависимости, включая linux-headers и libzip
RUN apk update && apk add --no-cache \
    postgresql-dev \
    libpq \
    linux-headers \
    libzip-dev \
    $PHPIZE_DEPS

# Устанавливаем Xdebug и расширения PHP
RUN pecl install xdebug-3.2.1 \
    && docker-php-ext-enable xdebug \
    && docker-php-ext-install pdo pdo_pgsql zip

# Очищаем кеш и удаляем ненужные зависимости
RUN apk del --no-cache \
    postgresql-dev \
    linux-headers \
    $PHPIZE_DEPS \
    && rm -rf /var/cache/apk/*