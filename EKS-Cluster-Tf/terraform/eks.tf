module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.eks_cluster_name
  cluster_version = "1.32"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  enable_irsa = true

  access_entries = {
    admin-user = {
      principal_arn = "arn:aws:iam::314146307160:user/prodadminaws"

      policy_associations = {
        admin = {
          policy_arn = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
          access_scope = {
            type = "cluster"
          }
        }
      }
    }
  }

  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent = true
    }
  }

  # EKS Managed Node Group(s) - v20 SYNTAX
  eks_managed_node_group_defaults = {
    ami_type                              = "AL2023_x86_64_STANDARD"
    disk_size                             = 35
    disk_encrypted                        = true
    disk_type                             = "gp3"
    instance_types                        = ["t3.large"]
    attach_cluster_primary_security_group = true
  }

  eks_managed_node_groups = {
    web = {
      name           = "node-group-1"
      instance_types = ["t3.large"]

      min_size      = 2
      max_size      = 3
      desired_size  = 2
      capacity_type = "SPOT"

      disk_size                  = 35
      use_custom_launch_template = false # Important to apply disk size!

      # IAM configuration
      create_iam_role = true
      iam_role_name   = "${var.eks_cluster_name}-web-ng-role"

      iam_role_additional_policies = {
        ssm = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
      }

      tags = {
        NodeGroup = "web-tier"
      }
    }

  }

  tags = {
    Environment = var.environment
    Terraform   = "true"
    Project     = "bookingwebapp"
  }
}


