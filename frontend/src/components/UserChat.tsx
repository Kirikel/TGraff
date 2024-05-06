import sendIcon from "../assets/icons/send.svg";
import readyToSendIcon from "../assets/icons/ready-to-send.svg";
import { useState } from "react";
import { useConversations } from "../providers/ConversationProvider";
import { Message } from "./Message";
import { IFormattedConversation } from "../interfaces/messages";

interface IUserChatProps {
  id: string;
}

export function UserChat({ id }: IUserChatProps) {
  const [input, setInput] = useState("");
  const context = useConversations();
  if (!context) {
    return;
  }
  const { conversations, sendMessage, selectedConversation } = context;
  function handleSubmit() {
    if (input.length === 0) {
      return;
    }
    const prevMessagesIds = JSON.parse(String(localStorage.getItem("ids")));
    if (
      prevMessagesIds === null ||
      !prevMessagesIds.find((prevId: string) => {
        return prevId === id;
      })
    ) {
      localStorage.setItem(
        "ids",
        JSON.stringify(
          prevMessagesIds === null ? [id] : [...prevMessagesIds, id]
        )
      );
      sendMessage([id, "admin"], input);
      setInput("");
      return;
    }
    sendMessage([id, "admin"], input);
    setInput("");
  }
  const currentConversation = conversations.find(
    (conversation: IFormattedConversation) => {
      return conversation.recipients.find((r: {id: string}) => {
        return r.id === id;
      });
    }
  );

  return (
    <section className=" w-[360px]">
      <div>
        <div className="border-solid border-0 border-b-[1px] border-[#EBECF2] p-[16px]">
          <p className="font-[interSimbold] leading-[24px]  text-[24px]">
            Чат с поддержкой
          </p>
        </div>
        <div className="bg-[#F1F3F5] w-[100%] overflow-auto flex justify-end flex-col h-[calc(100vh-175px)] px-[16px]">
          {currentConversation?.messages?.map((message, index) => {
            return (
              <Message
                key={index}
                index={index}
                currentConversation={currentConversation}
                id={id}
                message={message}
              />
            );
          })}
        </div>
        <div className=" h-[48px] flex gap-[16px]  pl-[16px]">
          <input
            className="w-[100%]"
            value={input}
            onChange={(e) => {
              setInput(e.currentTarget.value);
            }}
            placeholder="Написать сообщение..."
          />
          <button className="px-[16px]" onClick={handleSubmit}>
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
