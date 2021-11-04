import React, { useEffect, useMemo, useState } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { env } from './env';

export default () => {
  const [height, setHeight] = useState<string>();
  const [userId] = useState(`user-${env.owner}-${new Date().getTime()}`);
  const directLine = useMemo(() => createDirectLine({ secret: env.botSecret }), []);

  useEffect(() => {
    const resizeHandler = () => {
      setHeight(`${window.innerHeight - 90}px`);
    }
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, []);

  return <>
    <h1 className="p-2 title">Zukunftstag von {env.owner}</h1>
    <div className="webChat-container" style={{height: height}}>
      { !env.botSecret && <div className="m-2 p-2">Bot-Konfiguration konnte nicht geladen werden</div> }
      { env.botSecret && <ReactWebChat  className="webChat" locale="de-DE" directLine={directLine} userID={userId} /> }
    </div>
  </>;
};
