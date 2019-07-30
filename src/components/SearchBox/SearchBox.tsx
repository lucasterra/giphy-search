import React, { forwardRef } from 'react';
import { SearchBoxInput } from './SearchBoxInput';

interface SearchBoxProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ onChange, value, ...props }, ref) => (
    <SearchBoxInput value={value} onChange={onChange} {...props} ref={ref} />
  )
);
