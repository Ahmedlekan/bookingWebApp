# # --------------------------
# # Bastion Security Group
# # --------------------------
# resource "aws_security_group" "bastion_sg" {
#   name_prefix = "bastion-sg-"
#   vpc_id      = module.vpc.vpc_id
#   description = "Security group for bastion host"

#   # Optional SSH access (can disable if using SSM only)
#   ingress {
#     from_port   = 22
#     to_port     = 22
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"] 
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags = {
#     Name        = "bastion-sg"
#     Environment = "production"
#     Project     = "bookingwebapp"
#   }
# }

# # --------------------------
# # Bastion EC2 Instance
# # --------------------------
# resource "aws_instance" "bastion" {
#   ami                         = data.aws_ami.ubuntu.id
#   instance_type               = "t2.medium"
#   subnet_id                   = module.vpc.public_subnets[0] # Public subnet
#   vpc_security_group_ids      = [aws_security_group.bastion_sg.id]
#   associate_public_ip_address = true

#   # Attach IAM instance profile for SSM + EKS access
#   iam_instance_profile = aws_iam_instance_profile.bastion_profile.name

#   # User data for tools
#   user_data = <<-EOF
#               #!/bin/bash

#               apt-get update -y

#               # Install SSM agent (should already be in latest Ubuntu, but ensure)
#               snap install amazon-ssm-agent --classic
#               systemctl enable snap.amazon-ssm-agent.amazon-ssm-agent.service
#               systemctl start snap.amazon-ssm-agent.amazon-ssm-agent.service

#               curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
#               sudo apt install -y unzip
#               unzip awscliv2.zip
#               sudo ./aws/install
#               rm -rf awscliv2.zip aws/

#               sudo snap install helm --classic

#               curl -LO "https://dl.k8s.io/release/v1.28.4/bin/linux/amd64/kubectl"
#               sudo chmod +x kubectl
#               sudo mv kubectl /usr/local/bin/
#               kubectl version --client

#               curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
#               sudo mv /tmp/eksctl /usr/local/bin
#               eksctl version
#               EOF

#   tags = {
#     Name        = "eks-bastion-host"
#     Environment = "production"
#     Project     = "bookingwebapp"
#   }
# }

# # --------------------------
# # Bastion IAM Role + Policies
# # --------------------------
# resource "aws_iam_role" "bastion_role" {
#   name = "eks-bastion-role"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [
#       {
#         Action = "sts:AssumeRole"
#         Effect = "Allow"
#         Principal = {
#           Service = "ec2.amazonaws.com"
#         }
#       }
#     ]
#   })
# }

# # Attach necessary policies
# resource "aws_iam_role_policy_attachment" "bastion_ssm" {
#   role       = aws_iam_role.bastion_role.name
#   policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
# }

# resource "aws_iam_role_policy_attachment" "bastion_eks_cluster" {
#   role       = aws_iam_role.bastion_role.name
#   policy_arn = "arn:aws:iam::aws:policy/AmazonEKSFullAccess"
# }

# resource "aws_iam_role_policy_attachment" "bastion_ecr" {
#   role       = aws_iam_role.bastion_role.name
#   policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
# }

# resource "aws_iam_instance_profile" "bastion_profile" {
#   name = "eks-bastion-profile"
#   role = aws_iam_role.bastion_role.name
# }

# # --------------------------
# # Ubuntu AMI
# # --------------------------
# data "aws_ami" "ubuntu" {
#   most_recent = true
#   owners      = ["099720109477"] # Canonical

#   filter {
#     name   = "name"
#     values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
#   }

#   filter {
#     name   = "virtualization-type"
#     values = ["hvm"]
#   }
# }
