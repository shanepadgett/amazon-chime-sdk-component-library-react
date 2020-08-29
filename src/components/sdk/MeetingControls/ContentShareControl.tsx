// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';

import { ControlBarButton } from '../../ui/ControlBar/ControlBarItem';
import { ContentShare } from '../../ui/icons';
import { useContentShareState } from '../../../providers/ContentShareProvider';
import { useContentShareControls } from '../../../providers/ContentShareProvider';
import { PopOverItemProps } from '../../ui/PopOver/PopOverItem';
// import { DefaultBrowserBehavior } from 'amazon-chime-sdk-js';
// import FileInput from '../../ui/Input/FileInput';

interface Props {
  /** The label that will be shown for content share control, it defaults to `Content`. */
  label?: string;
  /** The label that will be shown for pausing content share button in content share control, it defaults to `Pause`. */
  pauseLabel?: string;
  /** The label that will be shown for unpausing content share button in content share control, it defaults to `Unpause`. */
  unpauseLabel?: string;
}

const ContentShareControl: React.FC<Props> = ({
  label = 'Content',
  pauseLabel = 'Pause',
  unpauseLabel = 'Unpause',
}) => {
  const { isLocalUserSharing } = useContentShareState();
  const {
    paused,
    toggleContentShare,
    togglePauseContentShare,
  } = useContentShareControls();
  const ref = useRef<HTMLInputElement>(null);
  // const defaultBrowserBehaviour: DefaultBrowserBehavior = new DefaultBrowserBehavior();

  const dropdownOptionsShare: PopOverItemProps[] = [
    {
      children: <span>{paused ? unpauseLabel : pauseLabel}</span>,
      onClick: togglePauseContentShare,
    },
  ];

  const fileUploadOnChangeHandler = () => {
    console.log("test ziyiz fileUploadOnChangeHandler");
    console.log("test ziyiz ref.current", ref.current);
    console.log("test ziyiz ref.current.files", ref.current?.files);

    // tried register this listener in useEffect, but ref is null
    ref.current?.addEventListener('change', (e) => {
      const target = e.currentTarget as HTMLInputElement;
      const file = target.files && target.files[0];
      console.log("test ziyiz onchange");
      console.log("test ziyiz file", file);
      if (file) {
        const url: string = URL.createObjectURL(file);
        const videoFile = document.getElementsByClassName("ch-video")[0] as HTMLVideoElement;;
        console.log("test ziyiz url", url);
        console.log("test ziyiz videoFile", videoFile);
        videoFile.src = url;

        // need to play the url in video element and call startContentShare(stream)

        // await videoFile.play();

        // let mediaStream: MediaStream;
        // if(defaultBrowserBehaviour.hasFirefoxWebRTC()) {
        //   // @ts-ignore
        //   mediaStream = videoFile.mozCaptureStream();
        // } else {
        //   // @ts-ignore
        //   mediaStream = videoFile.captureStream();
        // }
        // toggleContentShare(mediaStream);
      }
    });
  }

  const dropdownOptionsNoShare: PopOverItemProps[] = [
    {
      children: <span>Share your screen</span>,
      onClick: toggleContentShare,
    },
    {
      children: (
      // <FileInput ref={ref} value='' onChange={() => console.log("test ziyiz")} />
      // customize file input https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/
        <>
          <input
            type="file"
            name="photo"
            style={{
              opacity: '0.5', 
              position: 'absolute',
              zIndex: -1,
              backgroundColor: 'green'
            }}
            id="upload-photo"
            ref={ref}
            onChange={() => {console.log("test ziyiz")}} // this does not work
          />
          <label htmlFor="upload-photo" style={{backgroundColor: 'red', maxWidth: '80%'}}>Share a file</label>
        </>
      ),
      onClick: fileUploadOnChangeHandler,
    },
  ];

  return (
    <>
      <ControlBarButton
        icon={<ContentShare />}
        onClick={toggleContentShare}
        label={label}
        popOver={isLocalUserSharing ? dropdownOptionsShare : dropdownOptionsNoShare}
      />
    </>
  );
};

export default ContentShareControl;
