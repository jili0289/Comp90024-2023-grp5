#!/bin/bash

# ansible all -u ubuntu --key-file ~/.ssh/yc20230516.pem -i inventory  -m ping
ssh-add ~/.ssh/couchdb-demo.pem
ssh-add ~/.ssh/yc20230516.pem
ssh-add -l

ansible all -u ubuntu --key-file ~/.ssh/couchdb-demo.pem -i inventory  -m ping