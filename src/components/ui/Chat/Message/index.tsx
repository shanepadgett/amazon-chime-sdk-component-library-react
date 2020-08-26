import React, { HTMLAttributes } from 'react';

import { BaseProps } from '../../Base';

import { StyledMessage, StyledMessageInfo, StyledMessageContent } from './Styled';

export type MessageVariant = 'outgoing' | 'incoming';

export interface MessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'css'>, BaseProps {
    variant: MessageVariant;
    name?: string;
    time?: string;
    contents?: string;
}

const Message = (props: MessageProps) => {

    return (
        <StyledMessage className='ch-message-container' {...props}>
            <StyledMessageInfo className='ch-message-info'>
                <span className='ch-sender-name'>{props.name}</span>
                <span className='ch-message-time'>{props.time}</span>
            </StyledMessageInfo>
            <StyledMessageContent className='ch-message-content'{...props}>{props.contents}</StyledMessageContent>
        </StyledMessage>
    )
}

export default Message;