import styled from '@emotion/styled';
import { tint, transparentize, readableColor } from 'polished';

export const color = '#8e24aa';
export const activeColor = '#5c007a';

export const Button = styled.button<{
  active?: boolean;
}>(
  ({ active }) =>
    ({
      cursor: 'pointer',
      width: '100%',
      color: transparentize(0.1, readableColor(color)),
      backgroundColor: transparentize(0.5, active ? activeColor : color),
      display: 'inline-block',
      fontWeight: '400',
      textAlign: 'center',
      verticalAlign: 'middle',
      userSelect: 'none',
      padding: '6px 12px',
      fontSize: '16px',
      lineHeight: '1.5',
      borderRadius: 4,
      border: '1px solid transparent',
      transition:
        'color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
      ':first-of-type': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      ':last-of-type': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      ':not(:last-of-type):not(:first-of-type)': {
        borderRadius: 0,
      },
      ':last-of-type:first-of-type': {
        borderRadius: 4,
      },
      ':hover': {
        backgroundColor: transparentize(
          0.5,
          tint(0.04, active ? activeColor : color)
        ),
      },
      ':active': {
        backgroundColor: transparentize(
          0.5,
          tint(0.1, active ? activeColor : color)
        ),
      },
      ':focus': {
        outline: 0,
        borderColor: transparentize(0.5, tint(1, active ? activeColor : color)),
      },
    } as any)
);
