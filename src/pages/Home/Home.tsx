import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Layout } from '../../components/Layout';
import { SearchBox } from '../../components/SearchBox';
import { ImageGrid, ProgressiveImage } from '../../components/ImageGrid';
import { useImageSearch } from './useImageSearch';
import { LayoutMode, LayoutSwitcher } from './LayoutSwitcher';

const backgroundColors = [
  '#c4b7d2',
  '#9f5a57',
  '#4329ad',
  '#ae2955',
  '#335dad',
  '#60a372',
  '#ad7905',
  '#87cabf',
  '#f2a970',
];

export const Home = () => {
  const [text, setText] = useState('');
  const [debouncedText] = useDebounce(text, 250);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('single_column');

  const images = useImageSearch(debouncedText, 24, 0);

  return (
    <Layout>
      <SearchBox
        autoFocus
        placeholder="Type something to see some awesomeness"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setText(e.target.value);
        }}
      />
      <LayoutSwitcher setLayoutMode={setLayoutMode} layoutMode={layoutMode} />

      <ImageGrid numOfColumns={layoutMode === 'single_column' ? 1 : 3}>
        {images && images.data
          ? images.data.map((img, index) => (
              <ProgressiveImage
                key={img.id}
                alt={img.title}
                thumbSrc={
                  layoutMode === 'single_column'
                    ? img.images.fixed_height_still.url
                    : img.images.fixed_width_still.url
                }
                src={
                  layoutMode === 'single_column'
                    ? img.images.fixed_height.webp
                    : img.images.fixed_width.webp
                }
                backgroundColor={
                  backgroundColors[index % backgroundColors.length]
                }
              />
            ))
          : null}
      </ImageGrid>
    </Layout>
  );
};
