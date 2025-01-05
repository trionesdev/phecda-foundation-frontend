def startNotify(){
   sh '''
   curl -X POST \
    'https://oapi.dingtalk.com/robot/send?access_token='''+DING_DING_TOKEN+'''' \
    -H 'Content-Type: application/json' \
    -d '

    {
       "msgtype": "markdown",
       "markdown": {
           "title":"Jenkins工程构建开始",
           "text": "##### 构建开始 \n > 服务： '''+HELM_NAME+''' \n\n > 分支： '''+GIT_BRANCH+'''"
       }
    }
    '
   '''
}

def failureNotify(){
      sh '''
      curl -X POST \
       'https://oapi.dingtalk.com/robot/send?access_token='''+DING_DING_TOKEN+'''' \
       -H 'Content-Type: application/json' \
       -d '

       {
          "msgtype": "markdown",
          "markdown": {
              "title":"Jenkins工程构建失败",
              "text": "##### 构建<font color=Red>失败</font> \n > 服务： '''+HELM_NAME+''' \n\n > 分支： '''+GIT_BRANCH+'''"
          }
       }
       '
      '''
}

def successNotify(){
      sh '''
      curl -X POST \
       'https://oapi.dingtalk.com/robot/send?access_token='''+DING_DING_TOKEN+'''' \
       -H 'Content-Type: application/json' \
       -d '

       {
          "msgtype": "markdown",
          "markdown": {
              "title":"Jenkins工程构建成功",
              "text": "##### 构建<font color=Green>成功</font> \n > 服务： '''+HELM_NAME+''' \n\n > 分支： '''+GIT_BRANCH+'''"
          }
       }
       '
      '''
}

pipeline{
   agent {
       node { label env.NODE }
   }
    environment {
        IMAGE_NAME_DEFAULT =  "registry-vpc.cn-shanghai.aliyuncs.com/epiboly/demo"
        APP_NAME = "phecda-foundation-frontend"
        HELM_NAME = "${APP_NAME}"
        DING_DING_TOKEN_DEFAULT = "11c11816930d227dea96f6c159065e586c995c0c25412512e919206e870be527"
        DOCKER_REPOSITORY_URL_DEFAULT = 'registry.cn-shanghai.aliyuncs.com'
        ENV_DEFAULT = "dev"
    }
    stages {
        stage('Clone') {
            steps{
                checkout scm
                echo "当前分支: ${GIT_BRANCH} GIT_COMMIT:${GIT_COMMIT} TAG：${TAG}"
                script {
                    if( env.DING_DING_TOKEN == null || env.DING_DING_TOKEN == ''){
                        env.DING_DING_TOKEN = DING_DING_TOKEN_DEFAULT
                    }
                    if( env.IMAGE_NAME == null || env.IMAGE_NAME == ''){
                       env.IMAGE_NAME =  IMAGE_NAME_DEFAULT
                    }
                    if(env.ENV == null || env.ENV == ''){
                        env.ENV = ENV_DEFAULT
                    }
                    if( env.TAG != null && env.TAG != '' ){
                        env.TAG = "${APP_NAME}-${env.TAG}"
                    }
                    if( env.TAG == null || env.TAG == '' ){
                        env.TAG = "${APP_NAME}-${GIT_COMMIT}"
                    }
                    if( env.DOCKER_REPOSITORY_URL == null || env.DOCKER_REPOSITORY_URL == ''){
                        env.DOCKER_REPOSITORY_URL= DOCKER_REPOSITORY_URL_DEFAULT
                    }
                }
                startNotify()
            }
        }
        stage('Build Code') {
            when {
                allOf{
                    expression { env.BUILD =='true'  }
                    expression { env.ENV != 'prod'  }
                }
            }
            steps{
                sh "yarn install"
                sh "yarn run build"
            }
        }
        stage('Build Image') {
            when {
                allOf{
                    expression { env.BUILD=='true'  }
                    expression { env.ENV != 'prod'  }
                }
            }
            steps{
            echo "当前分支 TAG：${TAG}"
                sh "docker build -f Dockerfile --force-rm=true --rm -t ${IMAGE_NAME}:${env.TAG} ."
                withCredentials([usernamePassword(credentialsId: "${env.DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]){
                     sh "docker login --username=${DOCKER_USERNAME} --password=${DOCKER_PASSWORD} ${DOCKER_REPOSITORY_URL}"
                     sh "docker push ${IMAGE_NAME}:${TAG}"
                }
                sh "docker images | grep none |awk '{print \$3}' |xargs -i docker rmi {}"
            }
        }
       stage('Install Helm App') {
           when {
                expression { env.INSTALL=='true' }
           }
           steps{
               sh "helm upgrade --install --namespace ${env.ENV} --create-namespace --set image.repository=${IMAGE_NAME} --set image.tag=${env.TAG} ${HELM_NAME} kubernetes/chart -f kubernetes/env/${ENV}.yaml"
           }
       }
       stage('Uninstall Helm App') {
           when {
             expression { env.INSTALL=='false' }
           }
           steps{
                sh "helm uninstall ${HELM_NAME} --namespace ${env.ENV}"
           }
       }
    }
   post {
     failure {
        failureNotify()
     }
     success {
        successNotify()
     }
   }
}
