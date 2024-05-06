import avatar from "../assets/images/avatar.svg";
import opponentAvatar from "../assets/images/opponentAvatar.svg";
import { IFormattedConversation, IMessage } from "../interfaces/messages";
import subtract from "../assets/icons/subtract.svg";
import subtractOpponent from "../assets/icons/subtractOpponent.svg";

interface IMessageProps {
  currentConversation: IFormattedConversation;
  index: number;
  id: string;
  message: IMessage;
}

export function Message({
  currentConversation,
  index,
  id,
  message,
}: IMessageProps) {
  const isTop: boolean =
    currentConversation.messages[index].sender !==
    currentConversation?.messages[index - 1]?.sender;
  const isBottom: boolean =
    currentConversation.messages[index].sender !==
    currentConversation?.messages[index + 1]?.sender;
  return message.fromMe ? (
    <div
      className={`flex gap-[3px] relative ${isBottom ? "mb-[24px]" : "mb-[4px]"}   `}
    >
      {isBottom && <img className="mt-auto" src={avatar} alt="" />}
      {isBottom && (
        <img className="bottom-0 left-[20px] absolute" src={subtract} alt="" />
      )}
      <div
        style={{
          borderRadius: isBottom
            ? "4px 4px 8px 0"
            : isTop
            ? "8px 8px 4px 4px"
            : "4px",
        }}
        className={`bg-[#E2EAF1] ${
          id === "admin" ? "w-[360px]" : "min-w-[300px]"
        } max-w-[calc(100%-27px)] px-[12px] py-[8px] rounded-[8px] ${
          isBottom && "rounded-[4px 4px 8px 0]"
        } ${!isBottom && "ml-[27px]"}`}
      >
        <p className="break-words">{message.text}</p>
      </div>
    </div>
  ) : (
    <div
      className={`flex gap-[3px]  ${
        isBottom ? "mb-[24px]" : "mb-[4px]"
      } relative`}
    >
      {isBottom && <img className="mt-auto" src={opponentAvatar} alt="" />}
      {isBottom && (
        <img
          className="bottom-0 left-[20px] absolute"
          src={subtractOpponent}
          alt=""
        />
      )}
      <div
        style={{
          borderRadius: isBottom
            ? "4px 4px 8px 0"
            : isTop
            ? "8px 8px 4px 4px"
            : "4px",
        }}
        className={`bg-[#B9D7FB] ${
          id === "admin" ? "w-[360px]" : "min-w-[300px]"
        } max-w-[calc(100%-27px)] px-[12px] py-[8px]  ${
          !isBottom && "ml-[27px]"
        }`}
      >
        <p className="break-words">{message.text}</p>
      </div>
    </div>
  );
}
