variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "eks_clusterName" {
  description = "Name of the EKS cluster"
  type        = string
  default     = "bookingwebapp-eks"
}