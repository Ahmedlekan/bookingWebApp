# 🚀 Advanced End-to-End DevSecOps Project: MERN Stack Three-Tier Application on AWS with Docker, Kubernetes, Terraform, ArgoCD, Jenkins, GitOps, SonarQube, Prometheus, Grafana and Alert manager

### 📌 Introduction

This project demonstrates a complete DevSecOps pipeline for deploying a MERN stack three-tier application on AWS. It brings together Infrastructure as Code, containerization, Kubernetes orchestration, GitOps, CI/CD automation, security scanning, and observability into a single, production-grade workflow.

The goal is to showcase how to design, secure, deploy, and monitor a scalable cloud-native application with modern DevSecOps practices.

### 🔑 Project Scope

We will implement the following components:

1. IAM and Security Setup

- Create AWS IAM users and roles with least-privilege access.

- Configure secure authentication for deployment pipelines and cluster access.

2. Infrastructure as Code (IaC)

- Use Terraform to provision AWS infrastructure.

- Deploy a Jenkins server on EC2 with required IAM roles and security groups.

- Deploy EKS cluster with required IAM roles and security groups.

- Deploy a Bastian host server on EC2 with required IAM roles and security groups.

3. Jenkins Server Configuration

- Install and configure essential DevOps tools:

- Jenkins

- Docker & Amazon ECR

- Terraform

- AWS CLI & kubectl

- SonarQube (code quality)

- Trivy (security scanning)

4. Kubernetes Cluster (Amazon EKS)

- Provision an Amazon EKS cluster.

- Configure Application Load Balancer (ALB) for ingress traffic management.

5. Container Registry (Amazon ECR)

- Create private ECR repositories for frontend and backend Docker images.

- Automate Docker build and push through Jenkins pipelines.

6. GitOps with ArgoCD

- Install and configure ArgoCD for GitOps-driven deployments.

- Sync Kubernetes manifests for frontend, backend, database, and ingress.

7. CI/CD Pipeline (Jenkins + SonarQube + Trivy)

- Build Jenkins pipelines to:

- Build & push Docker images

- Run static code analysis with SonarQube

- Scan images with Trivy

- Deploy to EKS using ArgoCD

8. Monitoring and Observability

- Use Helm charts to install:

- Prometheus (metrics collection)

- Grafana (visualization & dashboards)

- Alert Mnager

- Monitor application health, cluster performance, and security posture.

9. DNS and Networking

- Configure Route 53 DNS records to expose the application via custom domains.

10. Data Persistence

- Implement Persistent Volumes (PV) and Persistent Volume Claims (PVCs) for MongoDB to ensure data durability.

### 🎯 Outcome

At the end of this project, you will have:

- A fully automated DevSecOps pipeline from code commit to deployment.

- A scalable, monitored, and secure Kubernetes-based MERN application on AWS.

- GitOps workflows with ArgoCD for declarative deployments.

- Integrated security and quality gates (SonarQube + Trivy).

- Grafana dashboards to monitor application and cluster performance.

### Prerequisites:

Before starting the project, ensure you have the following prerequisites:

- An AWS account with the necessary permissions to create resources.

- Terraform and AWS CLI are installed on your local machine.

- Basic familiarity with Kubernetes, Docker, Jenkins, and DevOps principles.


### Step 1: We need to create an IAM user and generate the AWS Access key

<img width="1707" height="398" alt="Image" src="https://github.com/user-attachments/assets/dd7f1284-c59b-4c6d-9ce7-a38ee459694a" />

Create a new IAM User on AWS and give it AdministratorAccess for testing purposes (not recommended for your organisation's Projects)

- Go to the AWS IAM Service and click on Users.

- Click on Create user

- Provide the name to your user and click on Next.

- Select the Attach policies directly option and search for AdministratorAccess, then select it.

- Click on Next.

- Click on Create user

- Now, select your created user, then click on Security credentials and generate an access key by clicking on Create access key.

- Select the Command Line Interface (CLI), then select the check mark for the confirmation and click on Next.

- Provide the Description and click on the Create access key.

- You will see that you got the credentials, and you can also download the CSV file for the future.


### Step 2: Install AWS CLI on local machine.

<img width="890" height="186" alt="Image" src="https://github.com/user-attachments/assets/d1b5d105-608f-4be7-8a7b-c2c46933f45f" />

Install & Configure AWS CLI on your local machine to create a Jenkins Server on AWS Cloud

AWSCLI Installation Script

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip -y
unzip awscliv2.zip
sudo ./aws/install
```

Run the below command, and add your keys

```bash
aws configure
```
AWS Access Key ID:

AWS Secret Access Key:

Default region name

Default output format


### Step 3: Deploy the Jenkins Server(EC2) using Terraform

<img width="1890" height="263" alt="Image" src="https://github.com/user-attachments/assets/8974aab4-104c-4473-9f49-a164c6c5a9ad" />

Clone the Git repository

```bash
git clone https://github.com/Ahmedlekan/bookingWebApp.git
```

Navigate to the Jenkins-Server-TF

Do some modifications to the terraform.tf file, such as changing the bucket name (make sure you have created it manually on AWS Cloud).

<img width="1459" height="536" alt="Image" src="https://github.com/user-attachments/assets/95b88c43-8f17-4808-8180-37bdd82a4150" />

Initialise the terraform backend by running the command below

```bash
terraform init
```

<img width="1219" height="514" alt="Image" src="https://github.com/user-attachments/assets/be8be9f0-ae1e-4d7c-b6fa-157d61498231" />

Run the command below to format properly

```bash
terraform fmt
```
Run the command below to check the syntax error

```bash
terraform validate
```

Run the command below to check the plan of all the resources that will be created on AWS

```bash
terraform plan
```
Now, run the below command to create the infrastructure on AWS Cloud, which will take 3 to 4 minutes maximum

```bash
terraform apply
```

Now, connect to your Jenkins server by clicking on Connect.

<img width="1890" height="263" alt="Image" src="https://github.com/user-attachments/assets/8974aab4-104c-4473-9f49-a164c6c5a9ad" />

Copy the SSH command and paste it on your local machine.

<img width="1662" height="647" alt="Image" src="https://github.com/user-attachments/assets/14577cea-ea2b-472b-a245-1070b8c19c02" />


### Step 4: Configure the Jenkins

Now, we logged into our Jenkins server.

We have installed some services such as Jenkins, Docker, Sonarqube, Terraform, Kubectl, AWS CLI, and Trivy
using terraform tools-install.sh to input the script ec2 user data.

Let’s validate whether all our installed or not.

```bash
jenkins --version
docker --version
docker ps
terraform --version
kubectl version
aws --version
trivy --version
eksctl --version
```

Now, we have to configure Jenkins. So, copy the public IP of your Jenkins Server and paste it into your favourite browser on port 8080.

<img width="941" height="509" alt="Image" src="https://github.com/user-attachments/assets/6e314119-9ab0-4c4a-bc4b-bb91289a0304" />

On your local machine, enter this command to get the password for your Jenkins server

```bash
systemctl status Jenkins.service 
```

Click on continue

Click on Install suggested plugins. The plugins will be installed

<img width="904" height="243" alt="Image" src="https://github.com/user-attachments/assets/b897f3e2-8eaf-4666-8dc4-2ab0c6665470" />

After installing the plugins, continue as admin

<img width="933" height="513" alt="Image" src="https://github.com/user-attachments/assets/142da2d1-09fd-43ad-875f-f839505732e1" />

Click on Start using Jenkins

The Jenkins Dashboard will look like the snippet below

<img width="1853" height="818" alt="Image" src="https://github.com/user-attachments/assets/87f094ab-7ab3-4653-bd21-837fc2f4f6f8" />


### Step 5: We need to create Amazon ECR Repositories for both Tiers (Frontend & Backend)

Click on **Create repository**

<img width="1809" height="732" alt="Image" src="https://github.com/user-attachments/assets/a83ff3b8-30fb-4c6d-b11b-911d0da1d5b3" />

Do the same for the backend repository and click on Save

<img width="1819" height="733" alt="Image" src="https://github.com/user-attachments/assets/6a061936-5a21-4cc3-857e-5a4fa55b878f" />

Now, we have set up our ECR Repository

<img width="1485" height="451" alt="Image" src="https://github.com/user-attachments/assets/6462830c-0ba5-434e-bf5d-46b97d31ef8a" />


### Step 6: Deploy EKS Cluster using Terraform and Jenkins

This step automates the deployment of an Amazon EKS cluster and AWS Load Balancer Controller using Terraform through a Jenkins pipeline. This infrastructure-as-code approach ensures reproducibility, version control, and automated management of your Kubernetes infrastructure.

***Jenkins Setup***

1. Install Required Jenkins Plugins

Go to Manage Jenkins → Plugins → Available plugins and install:

- AWS Credentials plugin

- Pipeline: AWS Steps plugin

2. Configure AWS Credentials in Jenkins

Go to Manage Jenkins → Credentials → System → Global credentials

Click Add Credentials

Select AWS Credentials as Kind

Enter the following:

- ID: aws-creds

- Access Key ID: Your AWS Access Key

- Secret Access Key: Your AWS Secret Access Key

Click Create

3. Configure GitHub Credentials (For Private Repositories)

Go to Manage Jenkins → Credentials → System → Global credentials

Click Add Credentials

Select Username with password as Kind

Enter the following:

- ID: github-creds

- Username: Your GitHub username

- Password: Your GitHub Personal Access Token

Click Create

***Configure terreform for jenkins***

- Install terraform plugin

- Go to **Dashboard** -> **Manage Jenkins** -> **Tools**

- On your machine, type ```whereis terraform``` you are going to get directory where terraform in stored, copy it and paste it in your jenkins ```/usr/bin/terraform```

<img width="1514" height="558" alt="Image" src="https://github.com/user-attachments/assets/25d08fcd-fb98-42e3-8b1d-3cae5f63ae06" />


***Terraform EKS Cluster Deployment***

Check the github file for the EKS terraform file

***Terraform Configuration***

The Terraform code includes:

EKS-Cluster-Tf/

└── terraform/

  ├── backend-dev.hcl          # S3 backend config for dev
  
  ├── backend-prod.hcl         # S3 backend config for prod

  ├── terraform.tf             # Terraform + provider requirements
  
  ├── variables.tf             # Input variables
  
  ├── output.tf                # Outputs (cluster name, endpoint, OIDC, etc.)

  ├── main.tf                  # Root module wiring / locals / common resources

  ├── vpc.tf                   # VPC, subnets, IGW, NAT, route tables
  
  ├── eks.tf                   # EKS cluster & managed node groups

  ├── iam.tf                   # IAM roles, policies, IRSA setup
  
  ├── iam_policy.json          # Custom IAM policy document (used by iam.tf)

  ├── helm.tf                  # Helm provider + AWS Load Balancer Controller

  ├── bastian.tf               # Bastion host EC2 + security group
  
  ├── bastion_user_data.sh     # Bastion bootstrap script (kubectl, awscli)

  ├── dev.tfvars               # Dev environment variables
  
  └── prod.tfvars              # Prod environment variables


***Jenkins Pipeline Execution***

Access the Jenkins Pipeline:

- Create a new Pipeline job in Jenkins

- Set Definition to "Pipeline script from SCM"

- Configure SCM with your repository URL and credentials

- Set Script Path to EKS-Cluster-TF/Jenkinsfile

Build with Parameters:

- ENVIRONMENT: Select environment (dev, staging, prod)

- TF_ACTION: Choose Terraform action (plan, apply, destroy)

- AUTO_APPROVE: Enable/disable auto-approval for destructive operations

Pipeline Stages:

- Git Checkout: Clones the repository

- Terraform Setup: Initializes Terraform with S3 backend

- Terraform Validate: Validates Terraform configuration

- Terraform Plan: Generates execution plan (for plan/apply actions)

- Terraform Apply: Applies changes (if TF_ACTION=apply)

- Terraform Destroy: Destroys infrastructure (if TF_ACTION=destroy, with approval)


***Create a Bastian Host Manually***

The ec2 userdata for the bastian host

installing all the necessary tools in bastian host user data

```bash

#!/bin/bash

apt-get update -y

snap install amazon-ssm-agent --classic
systemctl enable snap.amazon-ssm-agent.amazon-ssm-agent.service
systemctl start snap.amazon-ssm-agent.amazon-ssm-agent.service

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install -y unzip
unzip awscliv2.zip
sudo ./aws/install
rm -rf awscliv2.zip aws/

sudo snap install helm --classic

curl -LO "https://dl.k8s.io/release/v1.28.4/bin/linux/amd64/kubectl"
sudo chmod +x kubectl
sudo mv kubectl /usr/local/bin/
kubectl version --client

curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```

- Allow bastian host traffic from the eks control sec group

- Add the bastion role to EKS aws-auth

```bash

eksctl create iamidentitymapping \
  --cluster bookingwebapp-eks \
  --arn arn:aws:iam::123456789:role/jumper-role \
  --username bastion-user \
  --group system:masters

```

- Update Kubeconfig: Configures kubectl to access the new cluster

Verification

- Check Cluster Status

```bash

# Verify EKS cluster creation
aws eks describe-cluster --name bookingwebapp-eks --region us-east-1

# Update kubeconfig and check nodes
aws eks update-kubeconfig --region us-east-1 --name bookingwebapp-eks
kubectl get nodes

```

Verify Load Balancer Controller

```bash

# Check Load Balancer Controller deployment
kubectl get deployment -n kube-system aws-load-balancer-controller

# Check controller pods
kubectl get pods -n kube-system -l app.kubernetes.io/name=aws-load-balancer-controller

# View controller logs
kubectl logs -n kube-system deployment/aws-load-balancer-controller -f
```

**Benefits of Terraform Approach**

✅ Infrastructure as Code

- Version-controlled infrastructure changes

- Repeatable and consistent deployments

- Complete audit trail of all modifications

✅ Automated Management

- No manual CLI commands required

- Automated dependency management

- Integrated security best practices

✅ Environment Consistency

- identical configurations across dev, staging, prod

- Parameterized deployments for different environments

- Reduced human error

✅ Cost Optimization

- Automated resource cleanup with destroy operations

- Efficient resource provisioning

- Tagging and resource management

***Troubleshooting***

Common Issues and Solutions

- IAM Permission Errors:

  - Verify AWS credentials have sufficient permissions

  - Check IAM policies attached to Jenkins credentials

- Terraform State Locking:

  - Ensure DynamoDB table exists for state locking (if configured)

  - Check S3 bucket permissions

- Load Balancer Controller Issues:

  - Verify OIDC provider is properly configured

  - Check IAM role annotations on service account

  - Validate network connectivity between pods and AWS API

- Node Group Failures:

  - Check EC2 instance limits in AWS account

  - Verify subnet configurations and IP availability


### Step 7: Install & Configure ArgoCD

We will be deploying our agrocd application on a mern-tier namespace.

To do that, we will create a mern-tier namespace on EKS

```bash
kubectl create namespace mern-tier
```

<img width="707" height="45" alt="Image" src="https://github.com/user-attachments/assets/ffdc6662-a141-4a5e-8172-95e769e2d1dc" />


```bash
kubectl apply -n mern-rier -f https://raw.githubusercontent.com/argoproj/argo-cd/v2.4.7/manifests/install.yaml
```

All pods must be running. To validate, run the command below

```bash
kubectl get pods -n mern-tier
```

```bash
 kubectl get svc -n mern-tier
```

<img width="1306" height="377" alt="Image" src="https://github.com/user-attachments/assets/f616efb4-c66a-446f-88fa-4c554bdc6952" />

Now, expose the argoCD server as a LoadBalancer by editing the argo-server using kubernetes manifest 

```bash
 kubectl edit svc argocd-server -n mern-tier
```

<img width="1897" height="988" alt="Image" src="https://github.com/user-attachments/assets/cb2a602a-7e87-44a7-b260-880b15a94a4a" />

Edit the ClassicIp to LoadBalancer

<img width="1917" height="1000" alt="Image" src="https://github.com/user-attachments/assets/275db254-8f0f-4121-a49c-035776e8d9c3" />

Or you run the command below

```bash
kubectl patch svc argocd-server -n mern-tier -p '{"spec": {"type": "LoadBalancer"}}'
```

You can validate whether the Load Balancer is created or not by going to the AWS ec2 loadbalancer Console

<img width="1914" height="605" alt="Image" src="https://github.com/user-attachments/assets/b79b44f5-c4df-4b73-9521-0e52d177b879" />

To access the argoCD, copy the LoadBalancer DNS and hit it on your favourite browser.

You will get a warning like the snippet below.

Click on Advanced.

<img width="873" height="230" alt="Image" src="https://github.com/user-attachments/assets/791eceb1-9b8e-4d12-a66c-00206e32344b" />


Click on the link below, which is appearing under Hide advanced

<img width="748" height="321" alt="Image" src="https://github.com/user-attachments/assets/96da920b-7fca-457b-a9ef-d49dd3d92ed2" />

The username for the agrocd is "admin"

Now, we need to get the password for our argoCD server to perform the deployment.

The password is stored in a Kubernetes secret

```bash
kubectl -n mern-tier get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo
```

Here is our ArgoCD Dashboard.

<img width="1917" height="573" alt="Image" src="https://github.com/user-attachments/assets/242cbdb4-3c77-4911-89c4-4e0acd49c09f" />


### Step 8: Now, we have to configure SonarQube for our DevSecOps Pipeline

To do that, ensure sonarqube docker is running by checkimg it with the command below

```bash
docker ps
```
if the sonar is not running, you can start it by using

```bash
docker start sonar
```

Copy your Jenkins Server public IP and paste it into your favourite browser with a 9000 port

```bash
https//:<jenkinsIP>:9000
```

The username and password will be admin

Click on Log In.

<img width="960" height="161" alt="Image" src="https://github.com/user-attachments/assets/0926c46d-a8d8-4ed9-9c7b-88e730cdfd50" />

Update the password

<img width="959" height="297" alt="Image" src="https://github.com/user-attachments/assets/ad117b1f-1742-458f-8802-fa572830b6e6" />

Click on **Administration**, then **My Account**, and select **Security**

<img width="1827" height="187" alt="Image" src="https://github.com/user-attachments/assets/74a9ecbf-9ce2-44c4-9c8f-19aedc2ae008" />

Generate token

<img width="1311" height="385" alt="Image" src="https://github.com/user-attachments/assets/9019d6eb-dade-4b49-9b42-3f544bcf65e4" />

Copy the **token**, keep it somewhere safe and click on **Done**.

Now, we have to configure webhooks for quality checks.

Click on **Administration**, then **Configuration**, and select **Webhooks**

Click on **Create**

<img width="969" height="176" alt="Image" src="https://github.com/user-attachments/assets/4cee6c2a-efe4-49fd-bff2-60fdc38eeab8" />

Provide the Jenkins server public IP with port 8080, add sonarqube-webhook in the suffix, and click on Create.

```bash
http://<jenkins-server-public-ip>:8080/sonarqube-webhook/
```

<img width="653" height="345" alt="Image" src="https://github.com/user-attachments/assets/70e2c336-9bee-4601-a264-0287319e013e" />

Click on **create**

Now, we have to create a Project for the frontend code.

Click on Manually.

<img width="810" height="352" alt="Image" src="https://github.com/user-attachments/assets/cabec474-4bfa-4ebd-a365-80927e305409" />

Provide the display name to your Project and click on **Setup**

<img width="574" height="627" alt="Image" src="https://github.com/user-attachments/assets/84856626-5ef2-42ed-9c07-762ba5907dc9" />

Click on **Locally**

<img width="671" height="297" alt="Image" src="https://github.com/user-attachments/assets/e3ed9437-65fe-4e78-97b9-d2d327167436" />

Select the Use existing token, paste the token you generated earlier and click on **Continue**.

<img width="906" height="536" alt="Image" src="https://github.com/user-attachments/assets/3f32e9ed-9be5-4b28-8a80-faf79f54a07c" />

Select **Other** and **Linux** as OS.

After performing the above steps, you will get the command, which you can see in the snippet below.

Now, use the command in the Jenkins Frontend Pipeline where Code Quality Analysis will be performed.

<img width="1183" height="695" alt="Image" src="https://github.com/user-attachments/assets/80a8ce43-f7cc-4fbc-afee-2b151cafc912" />

Now, we have to create a Project for the backend code.

Click on **Create Project.**

Follow the same step for the frontend to create the backend. 


Now, we have to store the sonar credentials.

Go to **Dashboard** -> **Manage Jenkins** -> **Credentials**

Select the kind as **Secret text**, paste your token in Secret and keep other things as it is.

Click on Create

<img width="902" height="325" alt="Image" src="https://github.com/user-attachments/assets/7cf783be-4679-427f-90f8-2753a64141f6" />


Now, according to our Pipeline, we need to add an Account ID (aws account) in the Jenkins credentials because of the ECR repo URI.

Select the kind as Secret text, paste your AWS Account ID in Secret and keep other things as it is.

Click on **Create**

<img width="962" height="350" alt="Image" src="https://github.com/user-attachments/assets/ed1ef612-fa24-4e9c-b54f-bc69ae2a2a87" />


Now, we need to provide our ECR image name for the frontend-mern-tier, which is frontend only.

Select the kind as Secret text, paste your frontend repo name in Secret and keep other things as it is.

Click on Create

<img width="1575" height="776" alt="Image" src="https://github.com/user-attachments/assets/50cc81e9-5a47-4bf3-8f8a-90ef6bb0bcc2" />


Now, we need to provide our ECR image name for the backend, which is backend only.

Select the kind as **Secret text**, paste your backend repo name in Secret, and keep other things as it is.

Click on **Create**

Follow the same process for the backend also. 


***Add GitHub credentials***

Select the kind as **Secret text** and paste your GitHub Personal access token(not password) in Secret, and keep other things as it is.

Click on Create

**Note**: If you haven’t generated your token, you generate it first, then paste it into the Jenkins

<img width="1587" height="728" alt="Image" src="https://github.com/user-attachments/assets/aa27bd26-9690-4fbd-b5c2-0048a3110a47" />

Final Snippet of all Credentials that we needed to implement this project.

<img width="1709" height="791" alt="Image" src="https://github.com/user-attachments/assets/02a560c1-8f0b-491a-9d84-f45b3a5b3c48" />


### step 9: Install the required plugins and configure the plugins to deploy our Three-Tier Application

Install the following plugins by going to **Dashboard** -> **Manage Jenkins** -> **Plugins** -> **Available Plugins**

- Docker
- Docker Commons
- Docker Pipeline
- Docker API
- Docker-build-step
- NodeJS
- OWASP Dependency-Check
- SonarQube Scanner

<img width="653" height="345" alt="Image" src="https://github.com/user-attachments/assets/2c4438d7-cd83-4030-84ec-54087cb3b7e3" />


Now, we have to configure the installed plugins.

Go to **Dashboard** -> **Manage Jenkins** -> **Tools**

We are configuring SonarQube scanner

Search for SonarQube scanner and provide the configuration like the snippet below.

<img width="1248" height="460" alt="Image" src="https://github.com/user-attachments/assets/ab077fc2-5cf4-4143-81c9-2f656b7ea593" />


Now, we will configure **nodejs**

Search for the node and provide the configuration, like the snippet below.

<img width="1238" height="622" alt="Image" src="https://github.com/user-attachments/assets/56e9655c-c1c2-4622-bd3c-ddf1f0c1814b" />


Now, we will configure the OWASP Dependency Check

Search for **Dependency-Check** and provide the configuration like the snippet below.

<img width="1242" height="450" alt="Image" src="https://github.com/user-attachments/assets/ca1b81e4-fbcc-4c68-aa3f-7180c8fa6b22" />


Now, we will configure the Docker

Search for **Docker** and provide the configuration like the snippet below.

<img width="1243" height="478" alt="Image" src="https://github.com/user-attachments/assets/c32f0495-ffae-4ec8-87ba-7d2a565872e0" />


Now, we have to set the path for SonarQube in Jenkins

Go to **Dashboard** -> **Manage Jenkins** -> **System**

Search for SonarQube installations

Provide the name as it is, then in the Server URL, copy the SonarQube public IP (same as Jenkins) or if you have a saperate EC2 for your sonarqube, with port 9000, select the Sonar token that we have added recently, and click on Apply & Save.

<img width="1527" height="744" alt="Image" src="https://github.com/user-attachments/assets/3a79eebb-bbb1-4cff-8101-0a24d9cb3a0a" />


Now, we are ready to create our Jenkins Pipeline to deploy our Backend Code.

Go to Jenkins Dashboard

Click on **New Item**

<img width="1374" height="758" alt="Image" src="https://github.com/user-attachments/assets/88854e44-b673-4d62-a3ab-ba69f9632222" />

Provide the name of your Pipeline and click on OK.

This is the configuration to deploy the Backend Code on EKS. The Pipeline is is **Jenkins-Pipeline-Code/Jenkinsfile-Backend** folder

<img width="1293" height="725" alt="Image" src="https://github.com/user-attachments/assets/652094d4-d74f-460b-81e0-1e5bb849da6c" />

<img width="1236" height="799" alt="Image" src="https://github.com/user-attachments/assets/f986b80e-da1a-4a0c-ac2c-76c396803c69" />

Click Apply & Save.

Now, click on the **build**.

The pipeline was successful after addressing a few common mistakes.

Note: Do the changes in the Pipeline according to your project.

<img width="1892" height="865" alt="Image" src="https://github.com/user-attachments/assets/554c0d14-72cd-42e2-a981-67f8e35ace43" />


Now, we are ready to create our Jenkins Pipeline to deploy our Frontend Code.

Go to Jenkins Dashboard

Click on **New Item**

<img width="1017" height="790" alt="Image" src="https://github.com/user-attachments/assets/b4a81763-59db-4ce5-a476-c07d410f1fd4" />

Provide the name of your Pipeline and click on OK.

This is the configuration to deploy the Frontend Code on EKS. The Pipeline is is **Jenkins-Pipeline-Code/Jenkinsfile-Frontend** folder

<img width="1292" height="667" alt="Image" src="https://github.com/user-attachments/assets/99d75271-d884-47c6-9363-04fad085e6a4" />

<img width="1249" height="768" alt="Image" src="https://github.com/user-attachments/assets/ed1346dc-c087-4371-bdb4-3bf18dcdbd47" />

Now, click on the **build**.

The pipeline was successful after a few common mistakes.

Note: Do the changes in the Pipeline according to your project.

<img width="1880" height="863" alt="Image" src="https://github.com/user-attachments/assets/cefc4c98-729b-4e1d-b24c-da68857a3063" />


## Step 10: We will deploy our Three-Tier Application using ArgoCD.

Our repository is public. So, we need to configure the repository in ArgoCD.

Click on **Settings** and select **Repositories**

<img width="1274" height="500" alt="Image" src="https://github.com/user-attachments/assets/debbc3f9-48e1-469e-8f2a-214ebcc2a18a" />

Click on **CONNECT REPO USING HTTPS**

Now, provide the repository name where your Manifest files are present.

If your Connection Status is Successful, it means the repository connected successfully.

<img width="1898" height="565" alt="Image" src="https://github.com/user-attachments/assets/65f50097-55b5-46c2-924e-78a7db50c8dd" />


Now, we will create our first application, which will be a database.

Click on **CREATE APPLICATION.**

<img width="1287" height="369" alt="Image" src="https://github.com/user-attachments/assets/9a7aac7a-867f-4327-b67e-c11170386228" />

Provide the details as it is provided in the snippet below and scroll down.

<img width="1497" height="881" alt="Image" src="https://github.com/user-attachments/assets/c83d03c8-f1b7-4c92-8b18-1519a0f09902" />

<img width="1479" height="821" alt="Image" src="https://github.com/user-attachments/assets/cb057183-3f7b-4ef3-8240-4faf12d0a45d" />

After creating, your database should show this

<img width="1856" height="749" alt="Image" src="https://github.com/user-attachments/assets/747f05d1-34a7-4a16-8e20-fea641bacb23" />


We will create an application for the backend. Provide the details as it is provided in the snippet below and scroll down.

<img width="1477" height="843" alt="Image" src="https://github.com/user-attachments/assets/9c58c2ff-3bff-49b3-b604-b42bb7bbba49" />

Select the same repository that you configured in the earlier step.

In the Path, provide the location where your Manifest files are presented and provide other things as shown in the screenshot below.

<img width="1483" height="818" alt="Image" src="https://github.com/user-attachments/assets/4243d616-627f-4c97-ba96-a7e67acb9186" />

Click on **CREATE**.

After creating, your backend should show this

<img width="1916" height="764" alt="Image" src="https://github.com/user-attachments/assets/676a810a-1001-4d48-84bf-9d1decdc9880" />

***Populate secrets at creation time***

```bash
kubectl create secret generic backend-secrets \
  -n three-tier \
  --from-literal=MONGO_CONNECTION_STRING="mongodb://mongodb:27017/appdb" \
  --from-literal=JWT_SECRET_KEY="super-secret-jwt-key" \
  --from-literal=CLOUDINARY_API_SECRET="cloudinary-secret" \
  --from-literal=STRIPE_API_KEY="stripe-key"
```
✅ No secrets in Git

✅ Safe

✅ Standard in production

```bash
kubectl apply -f secret.yaml
```

You must restart pods:

```bash
kubectl rollout restart deployment api -n three-tier
```

```bash
kubectl logs deployment/api -n three-tier
```

Expected: "Server running on port 3000"

We will create an application for the frontend. Provide the details as it is provided in the snippet below and scroll down.

<img width="1455" height="795" alt="Image" src="https://github.com/user-attachments/assets/9280df6a-e979-45e9-a942-000cab830f2f" />

Select the same repository that you configured in the earlier step.

In the Path, provide the location where your Manifest files are presented and provide other things as shown in the screenshot below.

<img width="1467" height="732" alt="Image" src="https://github.com/user-attachments/assets/a2e0fd78-f18a-432e-8313-c484e462e956" />

Click on **CREATE**.

After creating, your frontend should show this

<img width="1912" height="625" alt="Image" src="https://github.com/user-attachments/assets/45e014de-b57f-40e8-a357-b95003b11671" />


Go to your bastian host to confirm all the services are been created and running successfully.

```bash
kubectl get pod -n three-tier
```
or

```bash
kubectl get all -n three-tier
```

<img width="824" height="209" alt="Image" src="https://github.com/user-attachments/assets/0021808a-96cd-43e8-b7b8-11b93d56547e" />


We will create an application for the Ingress. Provide the details as it is provided in the snippet below and scroll down.

<img width="1480" height="817" alt="Image" src="https://github.com/user-attachments/assets/0358fa8e-6802-4085-a4a5-cdabc49e4f85" />

Select the same repository that you configured in the earlier step.

In the Path, provide the location where your Manifest files are presented and provide other things as shown in the screenshot below.

<img width="1487" height="863" alt="Image" src="https://github.com/user-attachments/assets/1dcfdb94-6cab-43f7-b002-4b6f952f8ab4" />

After creating, your Ingress should show this

<img width="1850" height="635" alt="Image" src="https://github.com/user-attachments/assets/f470e301-c223-4d5d-8d7a-5dc82920643f" />

Once your Ingress application is deployed. It will create an ***Application Load Balancer***

You can check out the load balancer named k8s-three.

<img width="1889" height="748" alt="Image" src="https://github.com/user-attachments/assets/4101ebd7-52b5-4f66-b885-58defc7f7efe" />

You can see all 4 application deployments in the snippet below.

<img width="1904" height="845" alt="Image" src="https://github.com/user-attachments/assets/699e4d72-e1f8-43b7-b37d-6788b3c68f81" />

I bought my doman on amazon, you can get your domain name from any sources you prefer and configure it.

You must point the domain to the ALB.

***Create Route 53 record***

In Route 53 → Hosted zones → animalskoala.com

Create a **record:**

<img width="794" height="380" alt="Image" src="https://github.com/user-attachments/assets/19372f10-1c9a-4d66-a00d-2c361f82178e" />

Alias record - Setting	Value

- Record name	(blank)

- Record type	A – IPv4 address

- Alias	ON

- Alias target	ALB DNS name - The region you created the LoadBalancer

- Routing policy	Simple

✅ This is the recommended AWS way

<img width="1871" height="774" alt="Image" src="https://github.com/user-attachments/assets/7f3e0ccb-b2ff-4230-b890-6acc5d191287" />

Click on **create record**

Now, hit your domain after 2 to 3 minutes in your browser to see the magic.

<img width="1882" height="876" alt="Image" src="https://github.com/user-attachments/assets/0120f9e7-56e6-4d4c-86f5-49f620bdb9e5" />


## Step 11: We will set up the Monitoring for our EKS Cluster. We can monitor the Cluster Specifications and other necessary things.

We will achieve the monitoring using Helm

**Install Metric Server**

- Metric server install thru helm chart

```bash
https://artifacthub.io/packages/helm/metrics-server/metrics-server
```

verify metric server.

```bash
kubectl get pods -w
kubectl top pods
```

**Monitoring Using kube-prometheus-stack**

Create a namespace “three-tier-monitoring”

```bash
kubectl create ns three-tier-monitoring
```
Use this aritfact hub to install the prometheus-stack

```bash
https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack
```

Click on **install**

<img width="1882" height="799" alt="Image" src="https://github.com/user-attachments/assets/9de9f061-fed6-4eee-9bdc-de927e7ab651" />

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
```

```bash
helm install monitoring prometheus-community/kube-prometheus-stack --namespace three-tier-monitoring
```

Verify deployment :

```bash
kubectl get pods -n three-tier-monitoring
```

Get the helm values and save it in a file

```bash
helm show values prometheus-community/kube-prometheus-stack > kube-prom-stack.yaml
```

edit the file and add the following in the params for prometheus, grafana and alert manger.

Edit the file using this code

```bash
vi kube-prom-stack.yaml
```

<img width="1893" height="797" alt="Image" src="https://github.com/user-attachments/assets/8169e01c-57d8-438b-b4b4-f658d2ef159f" />

**Grafana:**

Search for grafana.domain

<img width="1590" height="791" alt="Image" src="https://github.com/user-attachments/assets/897163b4-7fdf-48e7-a786-2ca9f66a7931" />

 - Change the host to grafana.yourdomain and remove the comment from the path

For the **annotaion**, use this code

Use this if you have HTTPS configure for your domain and make sure the certificate-arn is from your aws

```bash
annotations:
    alb.ingress.kubernetes.io/group.name: bookingweb-app-lb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:ap-south-1:876997124628:certificate/b69bb6e7-cbd1-490b-b765-27574080f48c
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80}, {"HTTPS":443}]'
    alb.ingress.kubernetes.io/ssl-redirect: '443'
```

Use this if you only have HTTP for your domain

```bash
alb.ingress.kubernetes.io/group.name: bookingweb-app-lb
alb.ingress.kubernetes.io/scheme: internet-facing
alb.ingress.kubernetes.io/target-type: ip
alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80}]'
```

<img width="1066" height="679" alt="Image" src="https://github.com/user-attachments/assets/07a3e5aa-7068-41f8-93bd-580b613daeb2" />


**Prometheus:**

Search for prometheus.domain

 - Change the host to prometheus.yourdomain and remove the comment from the path

For the **annotaion**, use this code

Use this if you have HTTPS configure for your domain and make sure the certificate-arn is from your aws

```bash
annotations:
    alb.ingress.kubernetes.io/group.name: bookingweb-app-lb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:ap-south-1:876997124628:certificate/b69bb6e7-cbd1-490b-b765-27574080f48c
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80}, {"HTTPS":443}]'
    alb.ingress.kubernetes.io/ssl-redirect: '443'
```
Change the Pathtype: Prefix

Use this if you only have HTTP configured for your domain
```bash
alb.ingress.kubernetes.io/group.name: bookingweb-app-lb
alb.ingress.kubernetes.io/scheme: internet-facing
alb.ingress.kubernetes.io/target-type: ip
alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80}]'
```

**AlertManager:**

Search for alertmanager.domain

 - Change the host to alertmanager.yourdomain and remove the comment from the path

For the **annotaion**, use this code

Use this if you have HTTPS configure for your domain and make sure the certificate-arn is from your aws

```bash
annotations:
    alb.ingress.kubernetes.io/group.name: bookingweb-app-lb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/backend-protocol: HTTP
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80}, {"HTTPS":443}]'
    alb.ingress.kubernetes.io/ssl-redirect: '443'
```
Change the Pathtype: Prefix

Use this if you only have HTTP configured for your domain
```bash
alb.ingress.kubernetes.io/group.name: bookingweb-app-lb
alb.ingress.kubernetes.io/scheme: internet-facing
alb.ingress.kubernetes.io/target-type: ip
alb.ingress.kubernetes.io/backend-protocol: HTTP
alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80}]'
```

Save it by using **ESC** to get out of the insert, and use **:wq** to save

Upgrade it by using

```bash
helm upgrade monitoring prometheus-community/kube-prometheus-stack -f kube-prom-stack.yaml -n three-tier-monitoring
```
Now run

```bash
kubectl get ingress -n three-tier-monitoring
```

<img width="1895" height="262" alt="Image" src="https://github.com/user-attachments/assets/ab326033-a24a-45e9-95b5-8a460592f298" />

You should see the alertmanager, grafana, and prometheus running

Go to your aws Loadbalancer, you should see this

<img width="1870" height="749" alt="Image" src="https://github.com/user-attachments/assets/2913b645-d124-472d-820b-e06ab8a98ebc" />

Now, we have to confidure our doamin name on **Route53**, so that we can access our alertmanager, prometheus and grafana.

Go to **Route53**

<img width="888" height="460" alt="Image" src="https://github.com/user-attachments/assets/1a8b2418-f18c-499b-a512-8802bdae9833" />

Click on the doamin to **create record**

Record Name - Grafana

Record type - CNAME

Value - Copy your Loadbalancer url and paste it there

**Create record**

<img width="1858" height="733" alt="Image" src="https://github.com/user-attachments/assets/b56c4e1d-3fcb-4393-9651-4d4ed6aeb533" />

This means, you can now access your grafana from grafana.yourdomain

Now, follow the same process for **prometheus** and **alertManager**

Now, we can access our grafana from http://grafana.yourdomain

For login in to your grafana;

Username: admin

Password: use this code to get your password

```bash
Password: kubectl --namespace three-tier-monitoring get secrets my-kube-prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo
```
<img width="1889" height="840" alt="Image" src="https://github.com/user-attachments/assets/f90c880d-37c8-4509-b2e4-0fcd365c6013" />

Now, you can see your Grafana Dashboard to view the EKS data, such as pods, namespace, deployments, etc.

Access your **prometheus** from http://prometheus.yourdomain

<img width="1911" height="869" alt="Image" src="https://github.com/user-attachments/assets/fd0a5eba-1823-4e2e-b37b-1512d79c40cb" />


Access your **alertmanager** from http://alertmanager.yourdomain

<img width="1889" height="846" alt="Image" src="https://github.com/user-attachments/assets/9f9d8183-5c83-4603-895d-011a38de0e22" />



**Conclusion**

In this comprehensive DevSecOps Kubernetes project, we successfully:

Established IAM user and Terraform for AWS setup.

Deployed Jenkins on AWS, configured tools, and integrated it with SonarQube.

Set up an EKS cluster, configured a Load Balancer, and established private ECR repositories, but we used a public repository just to make it easier to follow.

Implemented monitoring with Helm, Prometheus, Grafana and Alert Manager.

Installed and configured ArgoCD for GitOps practices.

Created Jenkins pipelines for CI/CD, deploying a Three-Tier application.

Ensured data persistence with persistent volumes and claims.





