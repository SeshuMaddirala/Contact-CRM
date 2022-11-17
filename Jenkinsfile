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
        stage('Pre-requisities for building application'){
            steps{
                sh "chmod 777 ./init.sh"
                sh "./init.sh"
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
