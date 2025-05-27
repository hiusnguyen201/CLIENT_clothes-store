import { Image } from "@/components/Image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CHANNELS } from "@/constants/channel";
import { useSocketStore } from "@/hooks/socket/use-socket-store";
import { toast } from "@/hooks/use-toast";
import { addMessage, updateConversation } from "@/redux/conversation/conversation.slice";
import { createMessage, getListMessage } from "@/redux/conversation/conversation.thunk";
import { ConversationState } from "@/redux/conversation/conversation.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ConversationOneToOne, Message } from "@/types/conversation";
import { User } from "@/types/user";
import { Send } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";

type ChatAreaMessageProps = {
  currentConversationId: string;
  user: User;
};

export function ChatAreaMessage({ currentConversationId, user }: ChatAreaMessageProps) {
  const dispatch = useAppDispatch();
  const socket = useSocketStore((state) => state.socket);
  const [messageInput, setMessageInput] = useState("");
  const [pageMessage, setMessage] = useState<number>(1);
  const { list, loading } = useAppSelector<ConversationState>((selector) => selector.conversation);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleGetListMessage = async () => {
    try {
      await dispatch(getListMessage({ page: pageMessage, limit: 15, conversationId: currentConversationId })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    if (!currentConversationId || !socket) return;

    setMessage(1);
    socket.emit(CHANNELS.CONVERSATION_JOIN, currentConversationId);

    const onMessageReceive = ({
      message,
      conversationUpdate,
    }: {
      message: Message;
      conversationUpdate: ConversationOneToOne;
    }) => {
      if (currentConversationId === conversationUpdate.id) {
        dispatch(addMessage(message));
        dispatch(updateConversation(conversationUpdate));
      }
    };

    socket.on(CHANNELS.MESSAGE_SEND_CHANEL, onMessageReceive);

    handleGetListMessage();

    return () => {
      socket.emit(CHANNELS.CONVERSATION_LEAVE, currentConversationId);
      socket.off(CHANNELS.MESSAGE_SEND_CHANEL, onMessageReceive);
    };
  }, [currentConversationId, socket]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    try {
      await dispatch(createMessage({ content: messageInput, conversationId: currentConversationId })).unwrap();
      setMessageInput("");
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 50;

    if (isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [list.messages]);

  const sortedMessages = useMemo(() => {
    return [...list.messages].sort((a, b) => moment(a.timestamp).valueOf() - moment(b.timestamp).valueOf());
  }, [list.messages]);

  if (!currentConversationId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 w-full">
        <p>Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="hidden md:flex flex-col flex-1 border rounded-lg">
      {/* Chat Header */}
      <div className="flex items-center p-3 border-b border-gray-200">
        <Image
          type="avatar"
          src={list.oneToOne.find((c) => c.id === currentConversationId)?.participants[0].avatar || "/placeholder.svg"}
          alt={list.oneToOne.find((c) => c.id === currentConversationId)?.participants[0].name || "avatar"}
        />
        <div className="ml-3">
          <h2 className="font-semibold">
            {list.oneToOne.find((c) => c.id === currentConversationId)?.participants[0].name}
          </h2>
          <p className="text-xs text-gray-500">
            {list.oneToOne.find((c) => c.id === currentConversationId)?.isActive ? "Active now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div ref={containerRef} className="space-y-3">
          {sortedMessages.length > 0 &&
            sortedMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender.id === user.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-lg ${
                    message.sender.id === user.id
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.sender.id === user.id ? "text-blue-100" : "text-gray-500"}`}>
                    {moment(message.timestamp).format("hh:mm A")}
                  </p>
                </div>
              </div>
            ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-200 ">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-md"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <Button
            type="submit"
            size="icon"
            className="ml-2 rounded-full bg-blue-600 hover:bg-blue-700"
            disabled={!messageInput.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
