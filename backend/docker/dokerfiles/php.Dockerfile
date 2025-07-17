FROM php:8.1.18-fpm

WORKDIR /var/www/html

RUN docker-php-ext-install pdo pdo_mysql

CMD ["php-fpm", "-F"]