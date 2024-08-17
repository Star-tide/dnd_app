import { ChatBubble } from "./ChatBubble"
import { useEffect, useState, useRef } from "react"

export const Gemini = () => {
  let initialPrompt =
    "I am using your api inside of my app. Im making you a chat bot here, and I need you to introduce yourself to the user. Could you please give me a short, few word introduction. You are playing the role of an assistant to someone who is building Dungeons and dragons characters and possibly even campaigns. Try to be short, and consise. Lets give you a name as well, lets call you Rjordan";
  const [conversation, setConversation] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [triggerGemini, setTriggerGemini] = useState(null);
  const endOfMessagesRef = useRef(null);

  const addChatBubble = (chatPrompt, userSpeaks) => {
    const newBubble = (
      <ChatBubble
        key={conversation.length}
        chatPrompt={chatPrompt}
        userSpeaks={userSpeaks}
      />
    );
    setConversation([...conversation, newBubble]);
  };

  useEffect(() => {
      addChatBubble(initialPrompt, false)
  }, []);

  // Second useEffect: Triggered when triggerGemini changes
  useEffect(() => {
    if (triggerGemini) {
      handleGeminiResponse( { prompt });
    }
  }, [triggerGemini]); // Dependency on triggerGemini

  useEffect(() => {
    // Scroll to bottom of the conversation container when new messages are added
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const userGoesFirst = () => {
    addChatBubble(prompt, true);
    setTimeout(() => {
        setTriggerGemini({ prompt });
    }, 500);
  };
  const handleGeminiResponse = async () => {
    // NO API CALL from user, data is client side
    // Call the API and add the Gemini response bubble
    try {
      await addChatBubble(prompt, false);
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
    }
    setPrompt("");
  };

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <>
      {/* Main Container */}
      <main className="conversation flex flex-col max-h-[450px]">
        {/* Title */}
        <div className="title text-center">Ask Rjordan</div>
        <div className="divider"></div>
        {/* End Title */}

        <div className="flex-1 overflow-y-auto">
          {/* Start Scrolling */}
          <div className="chat text-xs flex">
            <div className="">{conversation}</div>
          </div>
          <div ref={endOfMessagesRef} />
        </div>
        {/* End Scrolling */}
        <div className="flex justify-between">
          <div className="flex rounded-box">
            <input
              type="text"
              value={prompt}
              onChange={handleInputChange}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button className="btn btn-default flex" onClick={userGoesFirst}>
            Send
          </button>
        </div>
      </main>
      {/* End Main Container */}
    </>
  );
}
