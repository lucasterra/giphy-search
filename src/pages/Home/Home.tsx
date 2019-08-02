import React, { useState } from 'react';
import { Layout } from '../../components/Layout';
import { Input } from '../../components/Input';
import { Alert } from '../../components/Alert';
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
    error,
    hasMoreImages,
  } = useImageSearch(IMAGES_PER_PAGE, debounceTime);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('three_column');

  return (
    <Layout>
      <Input
        autoFocus
        aria-label="Search images on GIPHY"
        data-testid="searchbox"
        placeholder="Search GIPHY"
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

      {error !== null && <Alert>{error.message}</Alert>}

      <InfiniteScrollButton
        data-testid="infinite-scroll-button"
        loadMore={loadMore}
        hidden={!hasMoreImages}
        isLoading={isLoading}
      />
    </Layout>
  );
};
