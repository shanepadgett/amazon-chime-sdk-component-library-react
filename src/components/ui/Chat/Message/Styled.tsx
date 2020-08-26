// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

import { baseStyles, baseSpacing, BaseProps } from '../../Base';
import { MessageProps } from '../Message';

interface StyledMessageProps extends MessageProps {}

export const StyledMessage = styled.div<StyledMessageProps>`
  display: flex;
  width: fit-content;
  max-width: 70%;
  flex-direction: column;
  margin: 1.5rem 0;

  margin-left: ${props => props.variant === 'outgoing' ? 'auto' : '1rem'};
  margin-right: ${props => props.variant === 'outgoing' ? '1rem' : 'auto'};

  ${baseSpacing}
  ${baseStyles}
`;

export const StyledMessageInfo = styled.div`
  margin-bottom: 0.5rem;

  & .ch-sender-name {
    font-weight: bold;
    margin-right: 1rem;
    padding-left: 0.25rem;
  }

  & .ch-message-time {
      
  }
`;


export const StyledMessageContent = styled.div<StyledMessageProps>`
  background-color: ${props => props.theme.chatMessage[props.variant].bgd};
  padding: 0.5rem;
  border-radius: 3px;
  width: fit-content;
`;