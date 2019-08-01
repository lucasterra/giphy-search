import styled from '@emotion/styled';
import { tint, shade, transparentize } from 'polished';

export const SearchBoxInput = styled.input({
  backgroundColor: tint(0.09, '#121212'),
  border: `1px solid ${transparentize(0.5, tint(0.3, '#121212'))}`,
  color: '#fff',
  width: '100%',
  padding: '8px 16px',
  fontSize: '16px',
  outline: 0,
  borderRadius: 4,
  transition: 'color 0.15s ease-in-out, border-color 0.15s ease-in-out',
  '::placeholder': {
    color: shade(0.2, '#fff'),
  },
  ':focus': {
    border: `1px solid ${transparentize(0.5, tint(1, '#121212'))}`,
  },
});
