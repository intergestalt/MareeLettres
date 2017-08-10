# maree-lettres-shared

Shared code for MareeLettres (private module)

## develop

`npm run dev`

## test 

(recommended to run the code outside of a project at all)

`npm run test`

## installation module in the other projects

add `"maree-lettres-shared": "file:../shared/maree-lettres-shared"` to dependencies in package.json

`npm install`

## update module 

Important! Need to run this in each place it is used to activate change (in website, server, app)

`npm install maree-lettres-shared`

Note: Does this work reliably with yarn in dev and prod? https://github.com/yarnpkg/yarn/issues/2165
