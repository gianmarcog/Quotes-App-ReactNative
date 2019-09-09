# Simple react-native App

I'm using Visual Studio Code (Version I made this Project: 1.38.0)</br>
I made some comments to my code. So if you're not familiar with it hopefully it'll help you. </br>

If you don't have npm installed yet, you can download it at this link: </br>
[npm](https://nodejs.org/en/download/)

## Type this code into your Terminal

If you're using a Mac you can download it over Homebrew (MacOS PackageManager) </br>
If you dont have it yet

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
>install Homebrew

```
$ brew install node
```
>install node

## Install and run this Project

```
npm install -g react-native-cli
npm install
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

>Runs the app in the development mode. </br>
>Open http://localhost:3000 to view it in the browser.</br>
>The page will reload if you make edits.</br>
>You will also see any lint errors in the console.</br>


## Change port
If you wanna change your port just modify part of package.json from:

```json
"start": "react-scripts start"
```
for Linux and MacOS to:

```json
"start": "PORT=3006 react-scripts start"
```

Windows to:

```json
"start": "set PORT=3006 && react-scripts start"
```

## Mobile testing
If you wanna test the App on your mobile phone donwload the App: </br>
[iOS](https://apps.apple.com/ch/app/expo-client/id982107779) </br>
[Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=de)

>If you now aim your mobile camera at the QR code on the localhost or in the terminal of Visual Studio Code, </br> 
>the app will be started on your mobile phone.
