# MareeLettres

https://expo.io/@retani/mareelettres

http://maree.herokuapp.com

## get started

`git clone ...`

some of the used tools / requirements:
- node
- npm
- yarn (optional)
- expo
- react-native
- meteor

### config server

set meteor server ip address in react-native/app/config/config.js

`ws://<your local ip address>:3000/websocket` to use local meteor (you may skip "setup meteor")
`ws://maree.herokuapp.com/websocket` to use live-test meteor

### setup meteor
```
cd meteor
meteor npm install
meteor
```
### setup mobile app
```
cd react-native
yarn install
npm start
```
