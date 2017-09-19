# MareeLettres Website

It's plain and simple React Website fatching data from the REST API. It only displays an overview of the game status, creates no input. Try to share some styles or components or configuration with the react native app.

Made with `$ create-react-app site`

Run it locally with `$ yarn start` from inside the `maree-web` folder.

Deploy to heroku with `$ git subtree push --prefix web/maree-web web master` from the `MareeLettres` root folder, assuming your git remote is called `web` and you have set https://github.com/mars/create-react-app-buildpack on it.

Maybe in the future: make it run in the public folder of the meteor server (so for low load times, only one container is required)
