// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import styled, { keyframes } from 'styled-components';

import { baseStyles, baseSpacing, BaseProps } from '../Base';

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


export const StyledInfiniteList = styled.ul`
  border: 1px solid red;
  width: 10rem;
  height: 20rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  /* disable scrolling with fetching */
  &.not-scrollable {
    overflow-y: hidden;
  }

  ${baseSpacing}
  ${baseStyles}

  .spinner {
    margin: 0 auto;
  }

  .spinner svg {
    width: 2rem;
    height: 2rem;
    animation: ${rotate} 2s linear infinite;
    display: block;
  }
`;

interface StyledListItemProps extends BaseProps {}

export const StyledListItem = styled.li<StyledListItemProps>`
  border: 1px solid blue;
  text-align: center;
  background-color: lightgreen;
`;