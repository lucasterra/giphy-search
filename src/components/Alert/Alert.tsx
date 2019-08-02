import styled from '@emotion/styled';
import { darken } from 'polished';

export const Alert = styled.div({
  color: '#000',
  backgroundColor: '#cf6679',
  border: `1px solid ${darken(0.05, '#cf6679')}`,
  padding: '12px 20px',
  marginBottom: 16,
  borderRadius: 4,
});
