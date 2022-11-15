docker stop crm-app
docker rm crm-app

docker rmi crm_app:v$1

docker build --no-cache -t crm_app:v$2 -f ./Dockerfile .

docker run -d --restart=unless-stopped -p 8000:8000 --name crm-app --network tg-net --env-file ./.env crm_app:v$2