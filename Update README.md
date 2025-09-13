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


Step 1: We need to create an IAM user and generate the AWS Access key

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


Step 2: Install AWS CLI on local machine.

<img width="890" height="186" alt="Image" src="https://github.com/user-attachments/assets/d1b5d105-608f-4be7-8a7b-c2c46933f45f" />

Install & Configure AWS CLI on your local machine to create a Jenkins Server on AWS Cloud

AWSCLI Installation Script

``bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip -y
unzip awscliv2.zip
sudo ./aws/install
``

Run the below command, and add your keys

``bash
aws configure
``
AWS Access Key ID:

AWS Secret Access Key:

Default region name

Default output format


Step 3: Deploy the Jenkins Server(EC2) using Terraform

Clone the Git repository- https://github.com/AmanPathak-DevOps/End-to-End-Kubernetes-Three-Tier-DevSecOps-Project

Navigate to the Jenkins-Server-TF

Do some modifications to the backend.tf file, such as changing the bucket name and dynamodb table(make sure you have created both manually on AWS Cloud).

















