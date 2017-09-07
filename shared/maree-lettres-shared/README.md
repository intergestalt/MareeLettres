# maree-lettres-shared

Shared code for MareeLettres (private module)

## develop

`yarn run dev`

## test 

(recommended to run the code outside of a project at all)

`yarn run test`

## installation module in the other projects

add `"maree-lettres-shared": "file:../shared/maree-lettres-shared"` to dependencies in package.json

`yarn install`

## update module in projects
```
yarn run install-app
yarn run install-server
```

or from the projects:

npm: `npm run install-shared`

yarn: `yarn run install-shared`