import React, { useRef, useEffect, useState, HTMLAttributes } from 'react';

import { StyledInfiniteList, StyledListItem } from './Styled';
import { BaseProps } from '../Base';
import { Cog as Spinner } from '../icons'; // TODO: update icon

interface InfiniteListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'css'>, BaseProps {
    items: String[];
    handleLoad: () => void;
    batchSize: number;
}

const InfiniteList = ({ items, handleLoad, batchSize }: InfiniteListProps) => {
    const feedRef = useRef<HTMLUListElement>(null);
    const listEnd = useRef<HTMLDivElement>(null);
    const currentTopItem = useRef<HTMLLIElement>(null);
    const firstNew = useRef<HTMLLIElement>(null);
    const prevLength = useRef(items.length)
    const newLength = useRef(0);

    const [isLoading, setIsLoading] = useState(false);

    // Scroll to the bottom of the list on load
    useEffect(() => {
        feedRef.current?.addEventListener('scroll', handleScroll);
        scrollToBottom();
        return feedRef.current?.removeEventListener('scroll', handleScroll, true)
    }, []);

    const handleScroll = () => {
        // when the scroll reaches the top
        if (feedRef.current?.scrollTop === 0) {
            setIsLoading(true)
            setTimeout(
                () => {
                    console.log('...Loading')
                    handleLoad()
                    setIsLoading(false)
                    // scroll back down to the first new message
                    firstNew.current?.scrollIntoView();
                },
                // simulate an async messages fetch
                500
            );
        }
    };

    const scrollToBottom = () => {
        listEnd.current?.scrollIntoView()
    };

    useEffect(() => {
        if (items.length === prevLength.current) {
            console.log("No messages to load")
        } else {
            prevLength.current = newLength.current;
        }
        newLength.current = items.length;
    });

    return (
        <StyledInfiniteList ref={feedRef} className={isLoading ? 'not-scrollable' : ''}>
            {isLoading && <li className="spinner"><Spinner /></li>}
            {items.map((item, index) => {
                if (index === 0) {
                    return <StyledListItem key={index} ref={currentTopItem}>{item}</StyledListItem>
                }
                if (
                    // It's not the initial load
                    items.length > batchSize &&
                    // It's the first message from the new batch
                    index === newLength.current - prevLength.current - 1 &&
                    // New messages were loaded
                    newLength.current !== prevLength.current
                ) {
                    return <StyledListItem key={index} ref={firstNew}>{item}</StyledListItem>
                }
                return <StyledListItem key={index}>{item}</StyledListItem>
            })}
            <div ref={listEnd} />
        </StyledInfiniteList>
    )
};

export default InfiniteList;