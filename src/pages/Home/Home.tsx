import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { SearchBox } from '../../components/SearchBox';
import { useImageSearch } from './useImageSearch';
import { LayoutMode, LayoutSwitcher } from './LayoutSwitcher';
import { InfiniteScrollButton } from './InfiniteScrollButton';
import { ImageGrid } from './ImageGrid';

const IMAGES_PER_PAGE = 24;

export const Home = () => {
  const {
    text,
    setSearchTerm,
    loadMore,
    isLoading,
    imageData,
    hasMoreImages,
  } = useImageSearch(IMAGES_PER_PAGE);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('three_column');

  return (
    <Layout>
      <SearchBox
        autoFocus
        placeholder="Type something to see some awesomeness"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
        }}
      />
      <LayoutSwitcher setLayoutMode={setLayoutMode} layoutMode={layoutMode} />

      <ImageGrid
        images={imageData && imageData.data ? imageData.data : []}
        layoutMode={layoutMode}
      />

      <InfiniteScrollButton
        loadMore={loadMore}
        hidden={!hasMoreImages}
        isLoading={isLoading}
      />
    </Layout>
  );
};
