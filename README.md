# Comp90024-2023-grp5

add ssh public key:
ssh-copy-id -i /path/to/newkey.pem.pub ubuntu@172.26.135.111


# ping server:
# ansible all -u ubuntu --key-file ~/.ssh/test.pem -i inventory  -m ping
