import React from "react";
import { css } from "emotion";
import { darken } from "polished";

const Button = ({ children, ...rest }) => (
  <button
    className={css`
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      border: 1px solid ${darken(0.1, "hsl(211, 10%, 95%)")};
      cursor: pointer;
      border-radius: 2px;
      transition: all 0.2s;
      font-weight: 500;
      &:disabled {
        cursor: default;
        opacity: 0.45;
      }
      background-color: hsl(211, 10%, 95%);
      &:hover:enabled,
      &:focus:enabled {
        background-color: ${darken(0.035, "hsl(211, 10%, 95%)")};
        outline: none;
      }
      &:active:enabled,
      &:target:enabled {
        background-color: ${darken(0.07, "hsl(211, 10%, 95%)")};
        outline: none;
      }
      padding: 0.8rem 1.2rem;
      min-height: 4rem;
      font-size: 1.6rem;
    `}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
