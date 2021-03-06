[![CircleCI](https://circleci.com/gh/lucasterra/giphy-search.svg?style=svg)](https://circleci.com/gh/lucasterra/giphy-search)
[![codecov](https://codecov.io/gh/lucasterra/giphy-search/branch/master/graph/badge.svg)](https://codecov.io/gh/lucasterra/giphy-search)

This project is a GIPHY Search web app written in React and making use of the [GIPHY API](https://developers.giphy.com/docs/api).

## Demo

There is a demo of this app deployed on Netlify: [https://giphy-search-1025.netlify.com/](https://giphy-search-1025.netlify.com/)

## Running locally

In the project directory, you can run the app in development mode:

```bash
yarn install
yarn start
```

Open http://localhost:3000 to view it in the browser

## Testing

You can run unit/integration tests with Jest

```bash
yarn test
```

You can also generate a code coverage report with:

```bash
yarn test --collectCoverage --watchAll=false
```

## Production build

```bash
yarn build
yarn serve # serve the build in port 5000
```

Open http://localhost:5000 to view it in the browser

## Features

- Show trending if you haven't searched for anything.
- Switch between 1 column and 3 columns view.
- Masonry-like grid: make sure you have empty spaces filled in your screen with awesome GIPHYs.
- Infinite loading: keep loading more images as you scroll.
- Lazy loading: only start loading images after you scroll and make them visible on your screen.
- Progressive image loading. Does the following:
  - First display a coloured placeholder with the same dimensions as the real image.
  - Once the image container is visible, it will start loading two versions of the image: a cheap and static version, and the real animated image.
  - Once the static version is loaded, display it, just so you can see something useful right away.
  - After the final animated image is loaded, show it!
  - When the image container goes out of screen, go back to the static image.

Read [features.md](docs/features.md) to see how I approached each of the above components.

Also read [folder_structure.md](docs/folder_structure.md) to understand how the code in this project is organized.

## Tradeoffs

There are a few things I didn't bother implementing:

- Routing: I could implement some basic routing with react-router (or even raw history API) to keep the URL in sync with the search input. If I had implemented this, your searches would be shareable by copy/pasting a url. i.e.: example.com/search?q=kitten
- GIF Details: I would love to be able to open a dialog and load a specific image in higher quality.
