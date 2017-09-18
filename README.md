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
yarn install
yarn run build
```

### setup and run mobile app
```
cd react-native
yarn install
yarn start
```

### Setup Android Emulator (MWith probably some problems included)
1. Install VirtualBox: https://www.virtualbox.org
2. Intall Genymotion: https://www.genymotion.com/fun-zone/
3. Install android-sdk: brew install android-sdkOpen Android Studio -> Configuration -> Add API level 22
4. Point Genymotion to android-sdk: Start Genymotion. Settings->ADB, use custom SDK
5. export andriod-sdk: export ANDROID_HOME=<path_where_you_unpacked_android_sdk>
6. Add a Device to genymotion, with API level 22

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
