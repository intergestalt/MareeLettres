#!/bin/bash

cd $TMPDIR
rm -rf MareeLettres
git clone https://github.com/intergestalt/MareeLettres.git 
cd MareeLettres
cd shared/maree-lettres-shared
yarn install
yarn build
cd ../../
cd react-native
yarn install
exp logout
exp login -u retani -p MareeLettres0710 --non-interactive && exp publish
say -v Alex "Expo publish done"