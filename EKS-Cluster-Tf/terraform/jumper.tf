# --------------------------
# Bastion IAM Role + Policies
# --------------------------
resource "aws_iam_role" "bastion_role" {
  name = "eks-bastion-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

# Attach necessary policies
resource "aws_iam_role_policy_attachment" "bastion_ssm" {
  role       = aws_iam_role.bastion_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_role_policy_attachment" "bastion_eks_cluster" {
  role       = aws_iam_role.bastion_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"  # ← FIXED
}

resource "aws_iam_role_policy_attachment" "bastion_eks_worker" {
  role       = aws_iam_role.bastion_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"  # ← ADDED
}

resource "aws_iam_role_policy_attachment" "bastion_ecr" {
  role       = aws_iam_role.bastion_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "bastion_profile" {
  name = "eks-bastion-profile"
  role = aws_iam_role.bastion_role.name
}

