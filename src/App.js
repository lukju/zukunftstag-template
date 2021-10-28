import React, { useMemo, useState } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';

const storedUserName = sessionStorage.getItem("storedUserName");

const botSecret = "cXeVg9qGnZM.KPeyDLf7nl26Kg1SY1UFCTryjCQTQr6i9Qie_2vcuq8";
export default () => {
  const [userId, setUserId] = useState(storedUserName && storedUserName.length > 0 ? storedUserName: undefined);
  const [webChatActive, setWebChatActive] = useState(storedUserName && storedUserName.length > 0);
  const directLine = useMemo(() => createDirectLine({ secret: botSecret }), []);

  sessionStorage.setItem("storedUserName", userId);
  return <>
    <div className="userIdArea">
      User Name:
      <input disabled={webChatActive} type="text" value={userId} onChange={e => setUserId(e.target.value)} ></input>
      { !webChatActive && <input type="button" value="Go!" onClick={() => setWebChatActive(userId && userId.length > 0)} /> }
    </div>
    {webChatActive && <ReactWebChat className="webChat" locale="de-DE" directLine={directLine} userID={userId} />}
  </>;
};
