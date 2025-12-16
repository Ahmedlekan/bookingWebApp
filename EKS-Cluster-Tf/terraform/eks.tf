module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  # Using variables directly
  name = var.eks_cluster_name
  kubernetes_version = "1.30"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  
  endpoint_public_access = true

  create_iam_role = true
  iam_role_name   = "${var.eks_cluster_name}-cluster-role"
  
  enable_irsa = true

  security_group_additional_rules = {
    ingress_nodes_443 = {
      description                = "Nodes to cluster API"
      protocol                   = "tcp"
      from_port                  = 443
      to_port                    = 443
      type                       = "ingress"
      source_node_security_group = true
    }
  }


  eks_managed_node_groups = {
    one = {
      name = "node-group-1"
      ami_type       = "AL2023_x86_64_STANDARD"
      instance_types = ["t3.small"]
      disk_size = 20
      disk_encrypted = true

      min_size     = 1
      max_size     = 3
      desired_size = 2

      iam_role_additional_policies = {
        ssm = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
      }

      tags = {
        NodeGroup = "group-1"
      }
    }

    two = {
      name = "node-group-2"
      ami_type       = "AL2023_x86_64_STANDARD"
      instance_types = ["t3.small"]
      disk_size = 20
      disk_encrypted = true

      min_size     = 1
      max_size     = 2
      desired_size = 1

      iam_role_additional_policies = {
        ssm = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
      }

      tags = {
        NodeGroup = "group-2"
      }
    }

    tags = {
        Terraform = "true"
        Project   = "bookingwebapp"
      }
  }


  tags = {
    Environment = "production"
    Terraform   = "true"
    Project     = "bookingwebapp"
  }
}



