# Comp90024-2023-grp5

# create a new server:
1. launch instance, name: choose any name
2. image: use Ubuntu 22.04
4. flavor: uom.mse.1c4g
5. network: classic provider
6. security group: defualt + ssh
7. keypair: create your own. the key pair in keys can access all server, make sure to save the .pem private key

* you may need to repeat the steps above many times to get an ip address that can ssh

# to connect to a new server:
1. save the .pem at a safe place, e.g. ~/.ssh
2. chmod 600 *.pem
3. ssh-add your_key.pem, you can ssh-add -D to remove all keys
4. ssh-add -l

# to add additional keys to the server
1. ssh-copy-id -i /path/to/newkey.pem.pub ubuntu@172.26.xxx.xxx

# ping server:
# ansible all -u ubuntu --key-file ~/.ssh/yc20230516.pem -i inventory  -m ping

# openstack password: 
    Y2RiYTQ0ZGQ4MDZmNTIw
