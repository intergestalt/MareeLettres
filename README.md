# MareeLettres

https://expo.io/@retani/mareelettres

http://maree.herokuapp.com

## get started

`git clone https://github.com/intergestalt/MareeLettres.git`

some of the used tools / requirements:
- node
- npm
- yarn
- expo
- react-native
- meteor

### aditional packages
yarn add ex-react-native-i18n
npm install --save react-redux@5.0.4 redux@3.6.0 redux-logger@3.0.1

### config server

set meteor server ip address in react-native/app/config/config.js

`ws://<your local ip address>:3000/websocket` to use local meteor (you may skip "setup meteor")
`ws://maree.herokuapp.com/websocket` to use live-test meteor

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

To use it: start genymotion. Start the emulator. Runs: yarn run android