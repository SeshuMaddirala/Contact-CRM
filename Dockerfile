FROM crm_base:v1

ADD . /var/www
ADD ./public /var/www/html

WORKDIR /var/www

RUN composer update

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0 --port=8000
RUN php artisan key:generate