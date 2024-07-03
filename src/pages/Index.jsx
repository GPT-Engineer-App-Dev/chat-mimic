import React, { useState } from "react";
import { Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const chats = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, how are you?",
      timestamp: "10:30 AM",
      profilePicture: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Let's catch up later.",
      timestamp: "09:15 AM",
      profilePicture: "/placeholder.svg",
    },
  ];

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    setMessages([
      { text: "Hello!", timestamp: "10:00 AM", sent: true },
      { text: "Hi there!", timestamp: "10:01 AM", sent: false },
    ]);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return;
    setMessages([...messages, { text: messageInput, timestamp: "Now", sent: true }]);
    setMessageInput("");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 border-r">
        <div className="flex items-center p-4 border-b">
          <img src="/placeholder.svg" alt="Profile" className="w-10 h-10 rounded-full mr-4" />
          <span className="font-semibold">WhatsApp Clone</span>
        </div>
        <div className="p-4 border-b">
          <div className="relative">
            <Input placeholder="Search..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <div className="overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "flex items-center p-4 cursor-pointer hover:bg-muted",
                selectedChat?.id === chat.id && "bg-muted"
              )}
              onClick={() => handleChatClick(chat)}
            >
              <img src={chat.profilePicture} alt={chat.name} className="w-10 h-10 rounded-full mr-4" />
              <div className="flex-1">
                <div className="font-semibold">{chat.name}</div>
                <div className="text-sm text-muted-foreground">{chat.lastMessage}</div>
              </div>
              <div className="text-xs text-muted-foreground">{chat.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedChat ? (
          <>
            <div className="flex items-center p-4 border-b">
              <img src={selectedChat.profilePicture} alt={selectedChat.name} className="w-10 h-10 rounded-full mr-4" />
              <div>
                <div className="font-semibold">{selectedChat.name}</div>
                <div className="text-sm text-muted-foreground">Online</div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "mb-2 p-2 rounded-lg max-w-xs",
                    message.sent ? "bg-primary text-primary-foreground self-end" : "bg-muted"
                  )}
                >
                  <div>{message.text}</div>
                  <div className="text-xs text-muted-foreground">{message.timestamp}</div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex items-center">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 mr-4"
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <span className="text-muted-foreground">Select a chat to start messaging</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;