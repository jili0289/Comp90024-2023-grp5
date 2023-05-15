# Comp90024-2023-grp5
 to connect to a new server:
 1. add private key using ssh-add:
    ssh-add couchdb-demo.pem
2. check ssh-add is successful: 
    ssh-add -l

add ssh public key:
ssh-copy-id -i /path/to/newkey.pem.pub ubuntu@172.26.135.111


# ping server:
# ansible all -u ubuntu --key-file ~/.ssh/test.pem -i inventory  -m ping
