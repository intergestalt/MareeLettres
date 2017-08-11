#!/bin/bash

while ! ping -c 1 -W 1 192.168.178.1 > /dev/null; do
    echo "Waiting for network..."
    sleep 1
done

while [ 1 ]
do

	echo waiting for 4:44...
	at 4:44

	cd $TMPDIR
	rm -rf MareeLettres
	git clone https://github.com/intergestalt/MareeLettres.git 
	cd MareeLettres
	cd react-native
	yarn install
	exp logout
	exp login -u retani -p MareeLettres0710 --non-interactive && exp publish
	cd $TMPDIR

done