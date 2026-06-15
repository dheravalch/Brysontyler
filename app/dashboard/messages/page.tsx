/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useMemo } from "react";
import { Send, Search, Paperclip, MoreVertical, X } from "lucide-react";

export default function MessagesPage() {
  const [conversations, setConversations] = useState([
    { id: 1, name: "Alex Rivers", lastMsg: "Looking forward to the new drop!", time: "10:42 AM", timestamp: new Date().setHours(10, 42) },
    { id: 2, name: "Jordan Smith", lastMsg: "Can you help me with my sub?", time: "9:15 AM", timestamp: new Date().setHours(9, 15) },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<any>({
    1: [{ text: "Hey! I really loved the last production.", sender: "them" }],
    2: [{ text: "Hi, I have a question about my subscription.", sender: "them" }]
  });

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [inputText, setInputText] = useState("");
  const [attachment, setAttachment] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Sort conversations by timestamp (newest first)
  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => b.timestamp - a.timestamp);
  }, [conversations]);

  // 2. Filter sorted conversations
  const filteredConversations = sortedConversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.lastMsg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!inputText.trim() && !attachment) return;

    // Update messages
    const newMessage = { text: inputText, sender: "me", attachment: attachment };
    setMessages({ ...messages, [activeChat.id]: [...(messages[activeChat.id] || []), newMessage] });

    // Update conversation order and last message
    setConversations(prev => prev.map(c => 
      c.id === activeChat.id 
        ? { ...c, lastMsg: inputText || "Sent an attachment", time: "Just now", timestamp: Date.now() }
        : c
    ));

    setInputText("");
    setAttachment(null);
  };

  // ... rest of your handleFileChange and JSX logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachment({
        preview: URL.createObjectURL(file),
        type: file.type.startsWith("video") ? "video" : "image"
      });
    }
  };

  return (
    <div className="h-[80vh] flex bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-zinc-500" size={16} />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages" 
              className="w-full bg-black pl-10 pr-4 py-2 rounded-xl text-sm outline-none border border-white/5 focus:border-yellow-500" 
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {filteredConversations.map((c) => (
            <div key={c.id} onClick={() => setActiveChat(c)} className={`p-6 border-b border-white/5 cursor-pointer hover:bg-white/5 ${activeChat.id === c.id ? 'bg-white/5' : ''}`}>
              <div className="flex justify-between mb-1">
                <span className="font-bold">{c.name}</span>
                <span className="text-[10px] text-zinc-500">{c.time}</span>
              </div>
              <p className="text-sm text-zinc-400 truncate">{c.lastMsg}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="w-2/3 flex flex-col relative">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="font-black text-lg">{activeChat.name}</h2>
          <MoreVertical size={20} className="text-zinc-500" />
        </div>
        
        <div className="flex-1 p-8 space-y-6 overflow-y-auto">
          {(messages[activeChat.id] || []).map((msg: any, idx: number) => (
            <div key={idx} className={`flex gap-4 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
              {msg.sender === 'them' && <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center font-bold text-xs">A</div>}
              <div className={`p-4 rounded-2xl max-w-sm text-sm ${msg.sender === 'me' ? 'bg-yellow-500 text-black rounded-tr-none' : 'bg-zinc-800 rounded-tl-none'}`}>
                {msg.attachment && <div className="mb-2 rounded-lg overflow-hidden">{msg.attachment.type === 'video' ? <video src={msg.attachment.preview} className="max-h-40" /> : <img src={msg.attachment.preview} className="max-h-40" />}</div>}
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/5 bg-zinc-900">
          {attachment && (
            <div className="mb-4 relative inline-block w-20 h-20 rounded-xl overflow-hidden border border-white/10">
              {attachment.type === 'video' ? <video src={attachment.preview} className="w-full h-full object-cover" /> : <img src={attachment.preview} className="w-full h-full object-cover" />}
              <button onClick={() => setAttachment(null)} className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5"><X size={12}/></button>
            </div>
          )}
          <div className="flex gap-4">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
            <button onClick={() => fileInputRef.current?.click()} className="text-zinc-500 hover:text-white"><Paperclip size={20} /></button>
            <input 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-black rounded-xl px-4 py-2 text-sm border border-white/5 outline-none focus:border-yellow-500" 
              placeholder="Type a message..." 
            />
            <button onClick={sendMessage} className="bg-yellow-500 text-black p-2 rounded-xl hover:bg-yellow-400">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}