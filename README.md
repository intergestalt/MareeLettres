# MareeLettres

## Dev Version
https://expo.io/@retani/mareelettres

http://maree.herokuapp.com

## Live Version
https://expo.io/@mareedeslettres/mareelettres

http://mareedeslettres.herokuapp.com

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

### Setup Android Emulator on OS X
1. Install VirtualBox: https://www.virtualbox.org
2. Intall Genymotion: https://www.genymotion.com/fun-zone/
3. Install android-sdk: https://developer.android.com/studio/index.html or `brew install android-sdk`
4. add android to path. in ~/.bash_profile:
```
export ANDROID_HOME=/Users/<you>/Library/Android/sdk
export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH
```
5. Open Android Studio -> Configuration -> Add API level 22
6. Point Genymotion to android-sdk: Start Genymotion. Settings->ADB, use custom SDK -> `/Users/<you>/Library/Android/sdk`
7. Add a Device to genymotion, with API level 22
8. Run `exp path` to make Expo use the same path
9. Run Expo 

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
