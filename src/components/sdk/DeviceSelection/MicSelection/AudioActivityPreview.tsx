// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useRef } from 'react';

import { Label } from '../../../ui/Label';
import { useAudioVideo } from '../../../../providers/AudioVideoProvider';
import ActivityBar from '../../../ui/ActivityBar';

import { StyledPreviewGroup } from '../Styled';

const AudioActivityPreview = () => {
  const audioVideo = useAudioVideo();
  const activityBarRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const analyserNode = audioVideo?.createAnalyserNodeForAudioInput();

    if (!analyserNode?.getByteTimeDomainData) {
      return;
    }

    const data = new Uint8Array(analyserNode.fftSize);
    let frameIndex = 0;
    let isMounted = true;

    function analyserNodeCallback() {
      if (!analyserNode) {
        return;
      }

      if (frameIndex === 0) {
        analyserNode.getByteTimeDomainData(data);
        const lowest = 0.01;
        let max = lowest;
        for (const f of data as any) {
          max = Math.max(max, (f - 128) / 128);
        }
        const decimal = (Math.log(lowest) - Math.log(max)) / Math.log(lowest);

        if (activityBarRef.current && decimal >= 0) {
          activityBarRef.current.style.transform = `scaleX(${decimal})`;
        }
      }
      frameIndex = (frameIndex + 1) % 2;

      if (isMounted) {
        requestAnimationFrame(analyserNodeCallback);
      }
    }

    requestAnimationFrame(analyserNodeCallback);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StyledPreviewGroup>
      <Label style={{ display: 'block', marginBottom: '.5rem' }}>
        Microphone activity
      </Label>
      <ActivityBar ref={activityBarRef} />
    </StyledPreviewGroup>
  );
};

export default AudioActivityPreview;