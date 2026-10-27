variable "resource_group_name" {
  description = "Azure resource group for VePlexity production infrastructure"
  type        = string
  default     = "veplexity-production-rg"
}

variable "location" {
  description = "Azure region datacenter"
  type        = string
  default     = "centralindia"
}

variable "admin_ip_allowlist" {
  description = "Restricted CIDR block authorized for SSH ingress"
  type        = string
  default     = "0.0.0.0/0"
}

variable "ssh_public_key_path" {
  description = "Path to deployment SSH public key"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}
