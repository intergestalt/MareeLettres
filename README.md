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

### setup shared repo (workaround for babel export)

```
cd shared/maree-lettres-shared
npm install
npm run build
```

### setup and run mobile app
```
cd react-native
yarn install
yarn start
```

### Setup Android Emulator (MWith probably some problems included)
Install VirtualBox: https://www.virtualbox.org
Install Genymotion: https://www.genymotion.com/fun-zone/
Install android-sdk: brew install android-sdkOpen Android Studio -> Configuration -> Add API level 22
Point Genymotion to android-sdk: Start Genymotion. Settings->ADB, use custom SDK
export andriod-sdk: export ANDROID_HOME=<path_where_you_unpacked_android_sdk>
Add a Device to genymotion, with API level 22

To use it: start genymotion. Start the emulator in genymotion. Runs: yarn run android or run from Expo XDE

## setup local server
```
cd meteor
meteor npm install
npm start
```

### config server
set meteor server ip address in react-native/app/config/config.js

- `ws://<your local ip address>:3000/websocket` to use local meteor
- `ws://maree.herokuapp.com/websocket` to use live-test meteor (you may skip "setup meteor")

Attention not to check these local changes into git!
