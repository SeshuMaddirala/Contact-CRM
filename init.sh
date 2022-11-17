#!/bin/bash


#Creating .env file

cp ./.env.example .env
sed -i -e 's/DB_HOST=127.0.0.1/DB_HOST=172.18.0.4/' -e 's/DB_PORT=3306/DB_PORT=3305/' -e 's/DB_DATABASE=laravel/DB_DATABASE=crm/' -e 's/DB_USERNAME=root/DB_USERNAME=crm/' -e 's/DB_PASSWORD=/DB_PASSWORD=contactcrm@123/' -e 's/APP_ENV=local/APP_ENV=production/' .env
echo 'Final env file'
cat ./.env


#Copying contact_crm.json file

mkdir ./storage/app/public
cp /home/tgu1ser06/Contact-CRM/contact_column.json ./storage/app/public/