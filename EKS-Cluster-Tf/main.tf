provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)
}

provider "aws" {
  region = var.region
}

provider "helm" {

}


data "aws_availability_zones" "available" {}

locals {
  cluster_name = var.clusterName
}

# OIDC Provider
data "tls_certificate" "eks" {
  url = module.eks.cluster_oidc_issuer_url
}