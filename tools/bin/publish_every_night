#!/bin/bash

while ! ping -c 1 -W 1 192.168.178.1 > /dev/null; do
    echo "Waiting for network..."
    sleep 1
done

while [ 1 ]
do

	echo waiting for 4:44...
	at 4:44

	./publish_from_github.command

done