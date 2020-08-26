import React, { useState, useEffect, useRef } from 'react';

// import Flex from '../../Flex';
import Message from './';

export default {
  title: 'UI Components/Chat',
  component: Message
};

export const Messages = () => {
    
  return (
      <>
        <Message variant='outgoing' name='Me' time='9:45 AM' contents='This is an outgoing message' />
        <Message variant='incoming' name='Tony Stark' time='9:47 AM' contents='This is an incoming message' />
        <Message variant='incoming' name='Tony Stark' time='9:48 AM' contents='This is an outgoing message. It has really long text. I am Iron Man. I was in a whole bunch of Marvel movies. I made a cool flying armor suit in a cave. Then I saved the world like at least 20 times.' />
        <Message variant='outgoing' name='Me' time='9:55 AM' contents='Ok' />
      </>

  );
};