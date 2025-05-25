import { useState } from "react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { useAuth } from "@/hooks/use-auth";
import { SidebarMessage } from "./_components/SidebarMessage";
import { ChatAreaMessage } from "./_components/ChatAreaMessage";

export function ListMessagePage() {
  const { user } = useAuth();
  if (!user) return;

  const [currentConversationId, setCurrentConversationId] = useState<string>("");

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden bg-gray-100 ">
      <ContentWrapper className="h-full">
        <div className="h-full p-5 bg-white rounded-lg">
          <div className="flex h-full gap-8">
            {/* Sidebar */}
            <SidebarMessage
              currentConversationId={currentConversationId}
              onConversationIdChange={setCurrentConversationId}
              user={user}
            />

            {/* Chat Area */}
            <ChatAreaMessage currentConversationId={currentConversationId} user={user} />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
