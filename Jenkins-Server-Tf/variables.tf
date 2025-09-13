variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "instance_name" {
  description = "instance name"
  type        = string
  default     = "Jenkins-server"
}
variable "key_name" {
  description = "key name"
  type        = string
  default     = "Jenkins-key"
}
variable "iam_role" {
  description = "iam role"
  type        = string
  default     = "Jenkins-role"
}