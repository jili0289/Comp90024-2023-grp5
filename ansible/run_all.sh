#!/bin/bash

. unimelb-comp90024-2023-grp-5-openrc.sh

# Configure basic instances/nodes
ansible-playbook config_mrc.yaml -i ~/.ssh/yc20230516.pem

# Deploy all instances/nodes environment
ansible-playbook deploy_mrc.yaml -i inventory/hosts.ini
