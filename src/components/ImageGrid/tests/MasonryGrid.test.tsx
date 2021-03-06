import { distributeChildren } from '../MasonryGrid';

describe('MasonryGrid', () => {
  describe('distributeOnHeight', () => {
    test('same height items', () => {
      const children = ['1', '2', '3', '4', '5', '6', '7'];
      const childrenHeights = [20, 20, 20, 20, 20, 20, 20];

      const columns = distributeChildren(children, 3, childrenHeights);

      expect(columns).toMatchInlineSnapshot(`
                        Array [
                          Array [
                            "1",
                            "4",
                            "7",
                          ],
                          Array [
                            "2",
                            "5",
                          ],
                          Array [
                            "3",
                            "6",
                          ],
                        ]
                  `);
    });

    test('super tall children', () => {
      const children = ['1', '2', '3', '4', '5', '6', '7'];
      const childrenHeights = [60, 20, 20, 20, 20, 20, 20];

      const columns = distributeChildren(children, 3, childrenHeights);

      expect(columns).toMatchInlineSnapshot(`
                Array [
                  Array [
                    "1",
                  ],
                  Array [
                    "2",
                    "4",
                    "6",
                  ],
                  Array [
                    "3",
                    "5",
                    "7",
                  ],
                ]
            `);
    });

    test('wrong childrenHeights length', () => {
      const children = ['1', '2', '3', '4', '5', '6', '7'];
      const childrenHeights = [60, 20];

      expect(() =>
        distributeChildren(children, 3, childrenHeights)
      ).toThrowErrorMatchingInlineSnapshot(
        `"children and childrenHeights arrays must have the same size"`
      );
    });
  });

  describe('distributeEvenly', () => {
    test('same height items', () => {
      const children = ['1', '2', '3', '4', '5', '6', '7'];

      const columns = distributeChildren(children, 3);

      expect(columns).toMatchInlineSnapshot(`
                                Array [
                                  Array [
                                    "1",
                                    "4",
                                    "7",
                                  ],
                                  Array [
                                    "2",
                                    "5",
                                  ],
                                  Array [
                                    "3",
                                    "6",
                                  ],
                                ]
                        `);
    });
  });
});
