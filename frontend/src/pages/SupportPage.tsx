import { useEffect, useState } from "react";
import sendIcon from "../assets/icons/send.svg";
import readyToSendIcon from "../assets/icons/ready-to-send.svg";
import { useConversations } from "../providers/ConversationProvider";
import avatar from "../assets/images/avatar.svg";
import { Message } from "../components/Message";

interface ISupportPageProps {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
}

export function SupportPage({ id, setId }: ISupportPageProps) {
  useEffect(() => {
    setId("admin");
  }, []);
  const [input, setInput] = useState("");
  // const setRef = useCallback(node => {
  //   if (node) {
  //     node.scrollIntoView({ smooth: true })
  //   }
  // }, [])
  const context = useConversations();
  if (!context) {
    return;
  }
  const {
    conversations,
    sendMessage,
    selectedConversation,
    selectConversationIndex,
  } = context;
  function handleSubmit() {
    if (input.length === 0) {
      return;
    }
    const recepients = selectedConversation.recipients.map((r) => r.id);
    sendMessage(recepients, input);
    setInput("");
  }

  return (
    <section className="flex">
      <div className="w-[360px] ">
        {conversations.map((conversation, index) => (
          <div
            className={`${
              conversation.selected && "bg-[#B9D7FB]"
            } flex cursor-pointer items-center gap-[8px] p-[12px] hover:bg-[#EBECF2]`}
            key={index}
            onClick={() => selectConversationIndex(index)}
          >
            <img width={40} height={40} src={avatar} alt="" />
            <div className="leading-[16px]">
              <p className="font-[interSimbold] text-[14px]">
                Имя фамилия
              </p>
              <p className="text-[#777B8C] w-[228px] overflow-hidden text-ellipsis whitespace-nowrap">
                {conversation.messages[conversation.messages.length - 1].text}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[100%]">
        <div className="bg-[#F1F3F5] pl-[16px] overflow-auto flex justify-end flex-col  h-[calc(100vh-117px)]">
          {selectedConversation?.messages?.map((message, index) => {
            return (
              <Message
                index={index}
                currentConversation={selectedConversation}
                id={id}
                message={message}
              />
            );
          })}
        </div>
        <div className="px-[14px] h-[48px] flex justify-between pl-[16px] pr-[17px] ">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.currentTarget.value);
            }}
            placeholder="Написать сообщение..."
            type="text"
          />
          <button onClick={handleSubmit}>
            {input.length === 0 ? (
              <img src={sendIcon} alt="" />
            ) : (
              <img src={readyToSendIcon} alt="" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
