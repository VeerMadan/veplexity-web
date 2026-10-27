output "public_ip_address" {
  description = "Allocated static public IPv4 address of the Azure VM"
  value       = azurerm_public_ip.pip.ip_address
}

output "vm_id" {
  description = "Unique Azure Resource Identifier of the VM"
  value       = azurerm_linux_virtual_machine.vm.id
}
