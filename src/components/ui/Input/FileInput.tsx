// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { Ref, forwardRef } from 'react';

import Input, { InputProps } from './';

export const FileInput = forwardRef(
  (props: InputProps, ref: Ref<HTMLInputElement>) => {
    const fileProps: InputProps = {
      ...props,
      type: 'file',
    };

    return (
        <>
          <label htmlFor="upload-photo">Share a file</label>
          <Input {...fileProps} id="upload-photo" ref={ref} style={{opacity: '0', position: 'absolute', zIndex: -1}} />
          {/* <input type="file" name="photo" style={{opacity: '0', position: 'absolute', zIndex: -1}} id="upload-photo" ref={ref} onChange={() => {console.log("test ziyiz onchange")}} /> */}
        </>
    );
  }
);

export default FileInput;