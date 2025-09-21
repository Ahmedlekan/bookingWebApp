# 🚀 Advanced End-to-End DevSecOps Project: MERN Stack Three-Tier Application on AWS with Kubernetes, Terraform, ArgoCD, Jenkins, SonarQube, and Monitoring

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

3. Jenkins Server Configuration

- Install and configure essential DevOps tools:

- Jenkins

- Docker & Amazon ECR

- Terraform

- AWS CLI & kubectl

- SonarQube (code quality)

- Trivy (security scanning)

4. Kubernetes Cluster (Amazon EKS)

- Provision an Amazon EKS cluster using eksctl.

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

Create a new IAM User on AWS and give it AdministratorAccess for testing purposes
(not recommended for your organisation's Projects)

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


### Step 5: Deploy EKS Cluster using Terraform and Jenkins

This step automates the deployment of an Amazon EKS cluster and AWS Load Balancer Controller using Terraform through a Jenkins pipeline. This infrastructure-as-code approach ensures reproducibility, version control, and automated management of your Kubernetes infrastructure.

Jenkins Setup

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


### Terraform EKS Cluster Deployment

Check the github file

Repository Structure

bookingWebApp/
├── EKS-Cluster-TF/
│   ├── Jenkinsfile
│   └── terraform/
│       ├── main.tf
│       ├── variables.tf
│       ├── providers.tf
│       ├── iam.tf
│       ├── helm.tf
│       ├── dev.tfvars
|       ├── dev.tfvars
│       └── prod.tfvars

### Terraform Configuration

The Terraform code includes:

- EKS Cluster with managed node groups
- IAM Roles and Policies for cluster operations
- AWS Load Balancer Controller setup with Helm
- OIDC Provider for IAM Roles for Service Accounts (IRSA)
- S3 Backend for Terraform state management

### Jenkins Pipeline Execution

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

Update Kubeconfig: Configures kubectl to access the new cluster

Verification

Check Cluster Status

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

### Benefits of Terraform Approach

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

### Troubleshooting

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





