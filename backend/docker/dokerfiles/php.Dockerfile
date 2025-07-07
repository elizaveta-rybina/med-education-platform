FROM php:8.2-fpm-alpine

WORKDIR /var/www/html

# Устанавливаем необходимые зависимости
RUN apk update && apk add --no-cache \
    postgresql-dev \
    libpq \
    libzip-dev \
    zlib-dev \
    linux-headers \
    $PHPIZE_DEPS

# Устанавливаем Xdebug и PHP-расширения
RUN pecl install xdebug-3.2.1 \
    && docker-php-ext-enable xdebug \
    && docker-php-ext-install pdo pdo_pgsql zip

# Чистим ненужные пакеты и кэш
RUN apk del --no-cache \
    postgresql-dev \
    linux-headers \
    $PHPIZE_DEPS \
    && rm -rf /var/cache/apk/*
