import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Input } from '../../components/Input';
import { useImageSearch } from './useImageSearch';
import { LayoutMode, LayoutSwitcher } from './LayoutSwitcher';
import { InfiniteScrollButton } from './InfiniteScrollButton';
import { ImageGrid } from './ImageGrid';

const IMAGES_PER_PAGE = 24;

interface HomeProps {
  debounceTime?: number;
}

export const Home: React.FC<HomeProps> = ({ debounceTime = 250 }) => {
  const {
    text,
    setSearchTerm,
    loadMore,
    isLoading,
    imageData,
    hasMoreImages,
  } = useImageSearch(IMAGES_PER_PAGE, debounceTime);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('three_column');

  return (
    <Layout>
      <Input
        autoFocus
        data-testid="searchbox"
        placeholder="Type something to see some awesomeness"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log('calling this!');
          setSearchTerm(e.target.value);
        }}
      />
      <LayoutSwitcher setLayoutMode={setLayoutMode} layoutMode={layoutMode} />

      <ImageGrid
        images={imageData && imageData.data ? imageData.data : []}
        layoutMode={layoutMode}
      />

      <InfiniteScrollButton
        data-testid="infinite-scroll-button"
        loadMore={loadMore}
        hidden={!hasMoreImages}
        isLoading={isLoading}
      />
    </Layout>
  );
};
