import React, { useEffect, useMemo, useState } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { SpeechToText } from './SpeechToText';

const botSecret = "cXeVg9qGnZM.KPeyDLf7nl26Kg1SY1UFCTryjCQTQr6i9Qie_2vcuq8";
export default () => {
  const [height, setHeight] = useState<string>();
  const [userId] = useState(`user-${new Date().getTime()}`);
  const directLine = useMemo(() => createDirectLine({ secret: botSecret }), []);

  useEffect(() => {
    const resizeHandler = () => {
      setHeight(`${window.innerHeight - 84}px`);
    }
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  return <>
    <div style={{height: height}}>
      <SpeechToText></SpeechToText>
      <ReactWebChat className="webChat" locale="de-DE" directLine={directLine} userID={userId} />
    </div>
  </>;
};
