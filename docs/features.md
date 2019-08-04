## Searching

Uses a reducer to hold the search state, and a few custom hooks to manage data fetching, debouncing, pagination and error handling.

Source: [paginationReducer](../src/pages/Home/paginationReducer.ts), [useImageSearch hook](../src/pages/Home/useImageSearch.ts)

## Show trending

This simply falls back to GIPHY's [Trending Endpoint](https://developers.giphy.com/docs/api/endpoint#trending) if the search text is empty.

## 1 and 3 columns view

It's a simple `<LayoutSwitcher/>` component which will toggle a state variable between `'single_column'` and `'three_column'`. The ImageGrid will automatically rerender based on this variable value.

Source: [LayoutSwitcher component](../src/pages/Home/LayoutSwitcher.tsx)

## Masonry Grid

This grid is implemented by distributing the children into separate columns. It will take the columns heights into account, to make sure they are all well balanced. This balancing is done using [Math.min](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min) to figure out which column to add to next.

Source: [MasonryGrid component](../src/components/ImageGrid/MasonryGrid.tsx)

## Infinite Loading

Uses [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to figure out when you have scrolled close enough to a "Load more" button, and trigger the data fetching functions.

Source: [InfiniteScrollButton component](../src/pages/Home/InfiniteScrollButton.tsx) and [useIntersectionObserver hook](../src/hooks/useIntersectionObserver.ts)

## Progressive Image and Lazy Image Loading

Uses [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to figure out when the image container is visible in the screen.  
The placeholder is rendered using a paddingTop technique described [here](https://danieljones.design/css-aspect-ratio-calculator/).  
Once the image container is visible, it starts loading the images using the [Image API](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image).

Source: [ProgressiveImage component](../src/components/ImageGrid/ProgressiveImage.tsx), [useImageLoad hook](../src/hooks/useImageLoad.ts) and [useIntersectionObserver hook](../src/hooks/useIntersectionObserver.ts)
