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

## Tradeoffs

There are a few things I didn't bother implementing, or that I am not super happy with:

- Using Alpha version of React (16.9.0-alpha.0) because I needed the assynchronous `act` API to write the tests in a more resilient manner. [See this](https://github.com/threepointone/react-act-examples/blob/master/sync.md#secrets-of-the-act-api)
- Routing: I could implement some basic routing with react-router (or even raw history API) to keep the URL in sync with the search input. If I had implemented this, your searches would be shareable by copy/pasting a url. i.e.: example.com/search?q=kitten
- GIF Details: I would love to be able to open a dialog and load a specific image in higher quality.
- I could reuse a single IntersectionObserver object, instead of creating one for each image. Or could have reused a library which has this implemented ([react-intersection-observer](https://github.com/thebuilder/react-intersection-observer)). The problem with `react-intersection-observer` is that it doesn't provide a way to notify about intersection changes without triggering a rerender in the component.
