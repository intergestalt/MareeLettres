# MareeLettres

https://expo.io/@retani/mareelettres

http://maree.herokuapp.com

## get started

`git clone https://github.com/intergestalt/MareeLettres.git`

some of the used tools / requirements:
- node
- npm
- yarn (optional)
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
npm start
```
