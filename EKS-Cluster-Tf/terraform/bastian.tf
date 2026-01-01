resource "aws_security_group" "allow_user_bastion" {
  name        = "bastion-sg"
  description = "Allow user to connect"
  vpc_id      = module.vpc.vpc_id

  egress {
    description = " allow all outgoing traffic "
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags_bastian, {
    Name = "bastion-sg"
  })
}

#AMI DATA
data "aws_ami" "al2023" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  owners = ["099720109477"]
}

#Bastian EC2 Resources
resource "aws_instance" "bastion_host" {
  ami                         = data.aws_ami.al2023.id
  instance_type               = var.bastion_instance_type
  vpc_security_group_ids      = [aws_security_group.allow_user_bastion.id]
  subnet_id                   = module.vpc.public_subnets[0]
  user_data                   = templatefile("./bastion_user_data.sh", {})
  iam_instance_profile        = aws_iam_instance_profile.bastion.name
  associate_public_ip_address = true

  tags = merge(var.tags_bastian, {
    Name = "Bastion-Host"
  })

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }
}

# Bastion IAM role
resource "aws_iam_role" "bastion" {
  name               = "bastion-ssm-role"
  assume_role_policy = <<EOF
  {
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }]
  }
  EOF
}

resource "aws_iam_role_policy_attachment" "bastion_policies" {
  for_each = toset([
    "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
    "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy",
    "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
    "arn:aws:iam::aws:policy/AmazonEC2ReadOnlyAccess",
    "arn:aws:iam::aws:policy/AmazonEKSReadOnlyAccess"
  ])

  role       = aws_iam_role.bastion.name
  policy_arn = each.value
}

resource "aws_iam_instance_profile" "bastion" {
  name = "bastion-instance-profile"
  role = aws_iam_role.bastion.name
}

