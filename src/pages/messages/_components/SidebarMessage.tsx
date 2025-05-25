import { SearchFormField } from "@/components/form-fields/SearchFormFIeld";
import { Image } from "@/components/Image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { UserItemSkeleton } from "@/components/UserItemSkeleton";
import { toast } from "@/hooks/use-toast";
import { addConversationOneToOne } from "@/redux/conversation/conversation.slice";
import {
  createConversationOneToOne,
  getDetailsConversationOneToOne,
  getListConversationOneToOne,
} from "@/redux/conversation/conversation.thunk";
import { ConversationState } from "@/redux/conversation/conversation.type";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getListUser } from "@/redux/user/user.thunk";
import { UserState } from "@/redux/user/user.type";
import { ConversationOneToOne } from "@/types/conversation";
import { User } from "@/types/user";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

type SidebarMessageProps = {
  onConversationIdChange: (id: string) => void;
  currentConversationId: string;
  user: User;
};

export function SidebarMessage({ onConversationIdChange, currentConversationId, user }: SidebarMessageProps) {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector<ConversationState>((selector) => selector.conversation);
  const { list: userList, loading: userLoading } = useAppSelector<UserState>((selector) => selector.user);
  const [pageConversation, setPageConversation] = useState<number>(1);
  const [pageUser, setPageUser] = useState<number>(1);
  const [tab, setTab] = useState<"conversations" | "search">("conversations");

  const formatMessageTime = (date: Date) => {
    const messageTime = moment(date);
    const now = moment();
    if (now.isSame(messageTime, "day")) {
      return messageTime.format("HH:mm");
    } else if (now.diff(messageTime, "days") === 1) {
      return "Yesterday";
    } else {
      return messageTime.format("MMM D");
    }
  };

  const handleGetListConversationOneToOne = async () => {
    try {
      const response = await dispatch(getListConversationOneToOne({ page: pageConversation, limit: 15 })).unwrap();
      onConversationIdChange(response.data.list[0].id);
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleGetListUser = async () => {
    try {
      await dispatch(getListUser({ page: pageUser, limit: 15 })).unwrap();
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  const handleCreateConversation = async (participantId: string) => {
    try {
      const res = await dispatch(createConversationOneToOne({ participantId })).unwrap();
      const resDetails = await dispatch(getDetailsConversationOneToOne({ conversationId: res.data.id })).unwrap();
      onConversationIdChange(resDetails.data.id);
      setTab("conversations");
    } catch (error: any) {
      toast({ title: error, variant: "destructive" });
    }
  };

  useEffect(() => {
    handleGetListConversationOneToOne();
  }, []);

  useEffect(() => {
    if (tab === "conversations") return;
    handleGetListUser();
  }, [tab]);

  return (
    <div className="w-full md:w-80 bg-white flex flex-col">
      <Tabs value={tab} className="w-full flex flex-col max-h-full">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-primary mb-4">Chat</h1>
          <div className="flex w-full items-center">
            <div className="pr-1">
              {tab === "search" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full"
                  onClick={() => setTab("conversations")}
                >
                  <ArrowLeft />
                </Button>
              )}
            </div>
            <SearchFormField name="search" className="rounded-full" onClick={() => setTab("search")} />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          <TabsContent value="conversations">
            <div className="flex flex-col gap-2">
              {loading.getListConversationOneToOne
                ? Array.from({ length: 3 }).map((_, index) => <UserItemSkeleton key={index} />)
                : list.oneToOne.map((conversation: ConversationOneToOne) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center rounded-md p-2 cursor-pointer hover:bg-gray-100 ${
                        currentConversationId === conversation.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => onConversationIdChange(conversation.id)}
                    >
                      <div className="relative">
                        <Image
                          type="avatar"
                          src={conversation.avatar || conversation.participants[0].avatar}
                          alt={conversation.name || conversation.participants[0].name}
                        />
                        {conversation.isActive && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                          <h2 className="font-semibold text-sm">
                            {conversation.name || conversation.participants[0].name}
                          </h2>
                          {conversation.lastMessageTime && (
                            <span className="text-xs text-gray-500">
                              {formatMessageTime(conversation.lastMessageTime)}
                            </span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-600 truncate max-w-[150px]">{conversation.lastMessage}</p>
                          {conversation.unreadCountMap[user.id] > 0 && (
                            <span className="bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {conversation.unreadCountMap[user.id]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="search" className="flex flex-col gap-2">
            {userLoading.getListUser
              ? Array.from({ length: 3 }).map((_, index) => <UserItemSkeleton key={index} />)
              : userList.map((user: User) => (
                  <div
                    key={user.id}
                    className={`flex items-center rounded-md p-2 cursor-pointer hover:bg-gray-100`}
                    onClick={() => handleCreateConversation(user.id)}
                  >
                    <div className="relative">
                      <Image type="avatar" src={user.avatar} alt={user.name} />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-sm">{user.name}</h2>
                      </div>
                    </div>
                  </div>
                ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
