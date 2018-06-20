#!/usr/bin/env bash

set -u
set -x

a=3
b=2
((c=a%b))
expr a**b
echo $c, $c
