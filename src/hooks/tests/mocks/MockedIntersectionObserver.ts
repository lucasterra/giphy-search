export let mockIsIntersecting: (isIntersecting: boolean) => void;

export class MockedIntersectionObserver {
  constructor(handler: (entries: IntersectionObserverEntry[]) => void) {
    const emptyRect = {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    };

    mockIsIntersecting = (isIntersecting: boolean) => {
      handler([
        {
          isIntersecting,
          target: null as any,
          boundingClientRect: emptyRect,
          intersectionRatio: 0.0,
          intersectionRect: emptyRect,
          rootBounds: emptyRect,
          time: 0,
        },
      ]);
    };
  }

  observe() {}
  disconnect() {}
}
