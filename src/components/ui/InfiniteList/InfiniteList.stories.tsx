import React, { useState, useEffect, useRef } from 'react';
//import { number } from '@storybook/addon-knobs';

import Flex from '../Flex';
import InfiniteList from './';

export default {
  title: 'UI Components/Chat/InfiniteList',
  component: InfiniteList
};

export const BasicInfiniteList = () => {
  const [batchNumber, setBatchNumber] = useState(1);
  const numberOfBatches = 5;
  const batchSize = 50; // I want to use the number knob here, but it doesn't work
  const batchRef = useRef(batchNumber);

  // All of the below code is just to fake an API call that would return more messages
  const createBatch = () => {
    if (batchRef.current <= numberOfBatches) {
      const batch = [];
      for (let i = 1; i <= batchSize; i++) {
        batch.push(((batchSize * (numberOfBatches - batchRef.current) + 1) + i - 1).toString());
      }
      return batch
    } else {
      console.log("No more messages to send.")
      return ['No more items']
    }
  };

  const [items, setItems] = useState([...createBatch()]);
  const itemsRef = useRef(items);

  useEffect(() => {
      itemsRef.current = items;
      batchRef.current = batchNumber;
  });

  useEffect(() => {
    setBatchNumber(batchRef.current + 1)
  }, [])

  const handleLoad = () => {
    setBatchNumber(batchRef.current + 1);
    setItems([...createBatch(), ...itemsRef.current])
  };

  return (
    <Flex layout="fill-space-centered" css="height: unset;">
      <InfiniteList
        items={items}
        handleLoad={handleLoad}
        batchSize={batchSize}
      />
    </Flex>
  );
};