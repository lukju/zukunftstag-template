import React, { useMemo, useState } from 'react';
import ReactWebChat, { createDirectLine, createDirectLineSpeechAdapters } from 'botframework-webchat';
import { SpeechToText } from './SpeechToText';

const storedUserName = sessionStorage.getItem("storedUserName");

const botSecret = "cXeVg9qGnZM.KPeyDLf7nl26Kg1SY1UFCTryjCQTQr6i9Qie_2vcuq8";
const SPEECH_KEY = "61f98fede878429c970ec31e68c51184";
const SPEECH_REGION = "westeurope";

export default () => {
    const [userId, setUserId] = useState(storedUserName && storedUserName.length > 0 ? storedUserName : undefined);
    const [webChatActive, setWebChatActive] = useState<boolean>(false);
    const [adapters, setAdapters] = useState<any>(null);
    const directLine = useMemo(() => createDirectLine({ secret: botSecret }), []);

    if (userId) {
        sessionStorage.setItem("storedUserName", userId);
    }

    const onStartWebChat = async () => {
        const adapaters = await createDirectLineSpeechAdapters({
            fetchCredentials: () => {
                return {
                    region: SPEECH_REGION,
                    subscriptionKey: SPEECH_KEY
                }
            }
        });
        setAdapters(adapaters);
    }
    console.log("adapter", adapters)
    return <>
        <div className="userIdArea">
            User Name:
            <input disabled={webChatActive} type="text" value={userId} onChange={e => setUserId(e.target.value)} ></input>
            {!webChatActive && <input type="button" value="Go!" onClick={() => setWebChatActive(userId !== undefined && userId.length > 0)} />}
        </div>
        <input type="button" onClick={() => onStartWebChat() }></input>
        
        {adapters && <ReactWebChat {...adapters} className="webChat" locale="de-DE" directLine={directLine} userID={userId} />}
        <SpeechToText></SpeechToText>
    </>;
};
