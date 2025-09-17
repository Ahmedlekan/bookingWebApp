# ---------------------------
# Get EKS cluster details
# ---------------------------
data "aws_eks_cluster" "this" {
  name = module.eks.cluster_name
}

data "aws_iam_openid_connect_provider" "oidc" {
  arn = module.eks.oidc_provider_arn
}

# ---------------------------
# Create IAM Policy for ALB Controller
# ---------------------------
resource "aws_iam_policy" "alb_controller_policy" {
  name        = "AWSLoadBalancerControllerIAMPolicy"
  description = "Permissions for AWS Load Balancer Controller"
  policy      = file("${path.module}/iam_policy.json")
}

# ---------------------------
# Create IRSA Role for ALB Controller
# ---------------------------
resource "aws_iam_role" "alb_controller_irsa" {
  name = "AmazonEKSLoadBalancerControllerRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = data.aws_iam_openid_connect_provider.oidc.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "${replace(data.aws_iam_openid_connect_provider.oidc.url, "https://", "")}:sub" = "system:serviceaccount:kube-system:aws-load-balancer-controller"
          }
        }
      }
    ]
  })
}

# ---------------------------
# Attach Policy to IRSA Role
# ---------------------------
resource "aws_iam_role_policy_attachment" "alb_controller_attach" {
  policy_arn = aws_iam_policy.alb_controller_policy.arn
  role       = aws_iam_role.alb_controller_irsa.name
}

