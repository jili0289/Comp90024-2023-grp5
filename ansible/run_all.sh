#!/bin/bash

# COMP90024-2023S1-group5
# City: Melbourne
# Zixuan Cheng 1165964
# Jiayun Huang 1249398
# Jiayuan Li 1404463
# Yufeng Xie 1166106
# Chang Yu 1397927


. unimelb-comp90024-2023-grp-5-openrc.sh

# Configure basic instances/nodes
ansible-playbook config_mrc.yaml -i ~/.ssh/yc20230516.pem

# Deploy all instances/nodes environment
ansible-playbook deploy_mrc.yaml -i inventory/hosts.ini
