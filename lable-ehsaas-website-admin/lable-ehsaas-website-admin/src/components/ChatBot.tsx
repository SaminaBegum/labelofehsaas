// import { useState, useRef, useEffect } from "react";
// import { MessageCircle, X, Send, Sparkles } from "lucide-react";
// import ReactMarkdown from "react-markdown";


// type Message = { role: "user" | "assistant"; content: string };

// const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

// const quickQuestions = [
//   "What's trending right now?",
//   "Help me find a party outfit",
//   "What's your return policy?",
//   "Styling tips for weddings",
// ];

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     if (isOpen && inputRef.current) inputRef.current.focus();
//   }, [isOpen]);

//   const sendMessage = async (text: string) => {
//     if (!text.trim() || isLoading) return;

//     const userMsg: Message = { role: "user", content: text.trim() };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setIsLoading(true);

//     let assistantSoFar = "";

//     const upsertAssistant = (chunk: string) => {
//       assistantSoFar += chunk;
//       setMessages((prev) => {
//         const last = prev[prev.length - 1];
//         if (last?.role === "assistant") {
//           return prev.map((m, i) =>
//             i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
//           );
//         }
//         return [...prev, { role: "assistant", content: assistantSoFar }];
//       });
//     };

//     try {
//       const allMessages = [...messages, userMsg];
//       const resp = await fetch(CHAT_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
//         },
//         body: JSON.stringify({ messages: allMessages }),
//       });

//       if (!resp.ok || !resp.body) {
//         const errorData = await resp.json().catch(() => ({}));
//         throw new Error(errorData.error || "Failed to get response");
//       }

//       const reader = resp.body.getReader();
//       const decoder = new TextDecoder();
//       let textBuffer = "";

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;
//         textBuffer += decoder.decode(value, { stream: true });

//         let newlineIndex: number;
//         while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
//           let line = textBuffer.slice(0, newlineIndex);
//           textBuffer = textBuffer.slice(newlineIndex + 1);

//           if (line.endsWith("\r")) line = line.slice(0, -1);
//           if (line.startsWith(":") || line.trim() === "") continue;
//           if (!line.startsWith("data: ")) continue;

//           const jsonStr = line.slice(6).trim();
//           if (jsonStr === "[DONE]") break;

//           try {
//             const parsed = JSON.parse(jsonStr);
//             const content = parsed.choices?.[0]?.delta?.content;
//             if (content) upsertAssistant(content);
//           } catch {
//             textBuffer = line + "\n" + textBuffer;
//             break;
//           }
//         }
//       }
//     } catch (e) {
//       console.error("Chat error:", e);
//       upsertAssistant("Sorry, I'm having trouble responding right now. Please try again! 💕");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Floating button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
//         aria-label="Chat with us"
//       >
//         {isOpen ? (
//           <X size={22} className="transition-transform duration-300" />
//         ) : (
//           <MessageCircle size={22} className="transition-transform duration-300 group-hover:rotate-12" />
//         )}
//       </button>

//       {/* Chat window */}
//       {isOpen && (
//         <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
//           {/* Header */}
//           <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center gap-3">
//             <div className="w-9 h-9 rounded-full bg-secondary/30 flex items-center justify-center">
//               <Sparkles size={18} className="text-secondary" />
//             </div>
//             <div>
//               <p className="font-body text-sm font-medium tracking-wide">Ehsaas Assistant</p>
//               <p className="font-body text-[10px] font-light tracking-wider opacity-80">
//                 Your personal stylist ✨
//               </p>
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
//             {messages.length === 0 && (
//               <div className="text-center py-6">
//                 <Sparkles size={28} className="mx-auto text-secondary mb-3" />
//                 <p className="font-body text-sm font-light text-foreground mb-1">
//                   Welcome to Ehsaas Label! 💕
//                 </p>
//                 <p className="font-body text-xs text-muted-foreground mb-4">
//                   How can I help you today?
//                 </p>
//                 <div className="space-y-2">
//                   {quickQuestions.map((q) => (
//                     <button
//                       key={q}
//                       onClick={() => sendMessage(q)}
//                       className="block w-full text-left px-3 py-2 rounded-lg border border-border font-body text-xs text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-secondary/20 transition-all duration-200"
//                     >
//                       {q}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-2xl px-4 py-2.5 font-body text-sm ${
//                     msg.role === "user"
//                       ? "bg-primary text-primary-foreground rounded-br-md"
//                       : "bg-secondary/40 text-foreground rounded-bl-md"
//                   }`}
//                 >
//                   {msg.role === "assistant" ? (
//                     <div className="prose prose-sm max-w-none [&_p]:mb-1 [&_p]:mt-0 [&_ul]:my-1 [&_li]:my-0">
//                       <ReactMarkdown>{msg.content}</ReactMarkdown>
//                     </div>
//                   ) : (
//                     msg.content
//                   )}
//                 </div>
//               </div>
//             ))}

//             {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
//               <div className="flex justify-start">
//                 <div className="bg-secondary/40 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
//                   <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
//                   <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
//                   <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <div className="border-t border-border px-4 py-3">
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 sendMessage(input);
//               }}
//               className="flex items-center gap-2"
//             >
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Ask me anything..."
//                 disabled={isLoading}
//                 className="flex-1 bg-muted/50 rounded-full px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/20 transition-colors"
//               />
//               <button
//                 type="submit"
//                 disabled={!input.trim() || isLoading}
//                 className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-all duration-200"
//               >
//                 <Send size={15} />
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChatBot;
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { db } from "@/services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type Message =
  | { role: "user"; content: string }
  | {
      role: "assistant";
      content: string;
      products?: any[];
    };

 const CHAT_URL = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`
   : "";
// const CHAT_URL = "/api/chat";
const quickQuestions = [
  "What's trending right now?",
  "Help me find a party outfit",
  "What's your return policy?",
  "Styling tips for weddings",
];

// 🔥 Fetch products from Firebase
const fetchProducts = async () => {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// 🔥 Match products with query
const findMatchingProducts = (query: string, products: any[]) => {
  const q = query.toLowerCase();

  return products
    .filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.collection?.toLowerCase().includes(q)
    )
    .slice(0, 3);
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto focus
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // 🚀 AUTO OPEN after 5 sec (once per session)
  useEffect(() => {
    const hasOpened = sessionStorage.getItem("chatbot_auto_opened");

    if (!hasOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("chatbot_auto_opened", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // 🔥 Step 1: get products
      const products = await fetchProducts();
      const matched = findMatchingProducts(text, products);

      // 🛍️ If products found → show instantly
      if (matched.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Here are some products you may like 👇",
            products: matched,
          },
        ]);

        setIsLoading(false);
        return;
      }

      // 🤖 fallback AI response
      const allMessages = [...messages, userMsg];

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages }),
      });

      const data = await resp.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, I couldn't help with that.",
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-110 transition-all flex items-center justify-center"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] h-[520px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-primary text-white px-5 py-4 flex items-center gap-3">
            <Sparkles size={18} />
            <div>
              <p className="text-sm font-medium">Ehsaas AI Stylist</p>
              <p className="text-[10px] opacity-80">Shopping Assistant ✨</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-sm text-muted-foreground">
                Ask me anything about fashion 💕
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-secondary/40 text-black"
                  }`}
                >
                  {/* TEXT */}
                  {msg.role === "assistant" && msg.products ? (
                    <div>
                      <p className="mb-2">{msg.content}</p>

                      {/* PRODUCTS */}
                      <div className="space-y-2">
                        {msg.products.map((p: any) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-2 border rounded-lg p-2 bg-white"
                          >
                            <img
                              src={p.image || "/placeholder.jpg"}
                              className="w-10 h-10 rounded object-cover"
                            />

                            <div className="flex-1">
                              <p className="text-xs font-semibold">
                                {p.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ₹{p.price}
                              </p>
                            </div>

                            <button
                              onClick={() =>
                                alert(`${p.name} added to cart`)
                              }
                              className="text-xs bg-black text-white px-2 py-1 rounded"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : msg.role === "assistant" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about outfits..."
              className="flex-1 border rounded-full px-3 py-2 text-sm"
            />

            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;