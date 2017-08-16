# MareeLettres

## Live Preview
https://expo.io/@retani/mareelettres

http://maree.herokuapp.com

## get started

`git clone https://github.com/intergestalt/MareeLettres.git`

some of the used tools / requirements:

- node
- npm
- yarn
- expo (https://expo.io/)
- react-native-scripts
- meteor

### config server
set meteor server ip address in react-native/app/config/config.js

- `ws://<your local ip address>:3000/websocket` to use local meteor (you may skip "setup meteor")
- `ws://maree.herokuapp.com/websocket` to use live-test meteor

Attention not to check these local changes into git!

### setup meteor
```
cd meteor
meteor npm install
npm start
```
### setup mobile app
```
cd react-native
yarn install
yarn start
```

### Setup Android Emulator (MWith probably some problems included)
Install VirtualBox: https://www.virtualbox.org
Install Genymotion: https://www.genymotion.com/fun-zone/
Install android-sdk: brew install android-sdk
Point Genymotion to android-sdk: Start Genymotion. Settings->ADB, use custom SDK
export andriod-sdk: export ANDROID_HOME=<path_where_you_unpacked_android_sdk>
Add a Device (emulator) to genymotion

To use it: start genymotion. Start the emulator in genymotion. Runs: yarn run android
