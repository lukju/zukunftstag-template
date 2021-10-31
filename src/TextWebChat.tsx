import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { SpeechToText } from './SpeechToText';

const botSecret = "cXeVg9qGnZM.KPeyDLf7nl26Kg1SY1UFCTryjCQTQr6i9Qie_2vcuq8";
export default () => {
  const container = useRef<HTMLDivElement>(null);
  const [userId] = useState(`user-${new Date().getTime()}`);
  const directLine = useMemo(() => createDirectLine({ secret: botSecret }), []);

  useEffect(() => {
    if (container.current) {
      container.current.style.height = `${window.innerHeight - 84}px`;
    }
  }, []);

  return <>
    <div ref={container}>
      <SpeechToText></SpeechToText>
      <ReactWebChat className="webChat" locale="de-DE" directLine={directLine} userID={userId} />
    </div>
  </>;
};
