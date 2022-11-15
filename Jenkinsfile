pipeline{
agent any
     stages{
        stage ('Git pull') {
            steps{
                cleanWs()
                script{
                   git branch:env.BRANCH_NAME, credentialsId: 'Contact-CRM Creds', url: 'https://github.com/SeshuMaddirala/Contact-CRM.git'
                    branch = "${env.BRANCH_NAME.toLowerCase()}"
                    echo "$branch"
                    echo "${branch}"

                    envr ="Development"
                    if (("$branch").matches("stag(.*)"))
                    {
                        envr="Staging";
                    }
                    
                    else if (("$branch").matches("prod(.*)"))
                    {
                        envr ="Production";
                    }

                    else
                    {
                        envr ="devops";
                    }

                    echo "${envr}"

                    sh "docker container stop \$(docker container ls -q --filter name=crm-${branch}-V*)"
                    sh "docker container rm -f \$(docker container ps -a -q --filter name=crm-'${branch}'-V*)"
                    sh "docker rmi \$(docker images -f=reference=crm-${branch}-b* --format \"{{.ID}}\") "
                }
            }
        }
        stage('Create .env file'){
            steps{
                sh "pwd"
                sh 'cp ./.env.example ./.env'
                sh "sed -i 's/DB_HOST=127.0.0.1/DB_HOST=172.18.0.4/' .env"
                sh "sed -i 's/DB_PORT=3306/DB_PORT=3305/' .env"
                sh "sed -i 's/DB_DATABASE=laravel/DB_DATABASE=crm/' .env"
                sh "sed -i 's/DB_USERNAME=root/DB_USERNAME=crm/' .env"
                sh "sed -i 's/DB_PASSWORD=/DB_PASSWORD=contactcrm@123/' .env"
                sh "sed -i 's/APP_ENV=local/APP_ENV=production/' .env"
                sh "echo 'Final env file'"
                sh "cat ./.env"
            }
        }
        stage('Build image'){
            steps{
                sh "docker build -t crm-${branch}-b${BUILD_NUMBER} -f Dockerfile ."
            }
        }
        stage('run image')
        {
            steps{
                script{
                   containerID = sh (
                   script: "docker run -d -p 8000:8000 --name crm-${branch}-V${BUILD_NUMBER} --network tg-net --env-file ./.env crm-${branch}-b${BUILD_NUMBER}", 
                   returnStdout: true
                   ).trim()
                   echo "Container ID is ==> ${containerID}"
                   sh "docker update --restart always ${containerID}"
                }
                
            }
        }
     }    
}
