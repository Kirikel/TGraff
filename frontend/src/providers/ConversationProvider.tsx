import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "./SocketProvider";
import { IConversation, IFormattedConversation } from "../interfaces/messages";

interface IConversationProvider {
  children: React.ReactNode;
  id: string;
}

interface IAddMessageToConversation {
  recipients: string[];
  text: string;
  sender: string;
}

interface IConversationProviderReturn {
  conversations: IFormattedConversation[];
  selectedConversation: IFormattedConversation;
  sendMessage: (recipients: string[], text: string) => void;
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ConversationsContext = React.createContext<
  IConversationProviderReturn | undefined
>(undefined);

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }: IConversationProvider) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const socket = useSocket();

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }: IAddMessageToConversation) => {
      setConversations((prevConversations: IConversation[]) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversation);
    return () => {
      socket.off("receive-message");
    };
  }, [socket, addMessageToConversation]);

  function sendMessage(recipients: string[], text: string) {
    socket?.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations?.map(
    (conversation: IConversation, index: number) => {
      const recipients = conversation.recipients.map((recipient) => {
        const name = recipient;
        return { id: recipient, name };
      });
      const messages = conversation.messages.map((message) => {
        const name = message.sender;
        const fromMe = id === message.sender;
        return { ...message, senderName: name, fromMe };
      });

      const selected = index === selectedConversationIndex;
      return { ...conversation, messages, recipients, selected };
    }
  );

  const value: IConversationProviderReturn = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
  };
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a: string[], b: string[]) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
