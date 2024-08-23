import { useOutletContext} from "react-router-dom";
import { askGemini } from "../utils/gemini_api";
import { useEffect, useState } from "react";

export const ChatBubble = ({ chatPrompt, userSpeaks }) => {
    const { user } = useOutletContext();
    const [ response, setResponse ] = useState(userSpeaks ? chatPrompt : null)

    useEffect(() => {
      const fetchGeminiResponse = async () => {
        if (!userSpeaks) {
          try {
            const geminiResponse = await askGemini(chatPrompt);
            setResponse(geminiResponse);
          } catch (error) {
            console.error("Error fetching response from Gemini:", error);
            setResponse("An error occurred. Please try again.");
          }
        }
      };

      fetchGeminiResponse();
    }, [chatPrompt, userSpeaks]);


  return (
    <>
      <div className={userSpeaks ? "chat chat-end" : "chat chat-start"}>
      <div className="chat-header">{userSpeaks ? user.display_name : "Rjordan"}</div>
        <div className="chat-bubble">{response || "..."}</div>
      </div>
    </>
  );
}