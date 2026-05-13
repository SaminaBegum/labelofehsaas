
// import { useState, useRef, useEffect } from "react";
// import { MessageCircle, X, Send, Sparkles } from "lucide-react";
// import ReactMarkdown from "react-markdown";

// import { db } from "@/services/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";

// type Message =
//   | { role: "user"; content: string }
//   | {
//       role: "assistant";
//       content: string;
//       products?: any[];
//     };

// //  const CHAT_URL = import.meta.env.VITE_SUPABASE_URL
// //   ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`
// //    : "";
// const CHAT_URL = "http://localhost:8080/api/chat";
// const quickQuestions = [
//   "What's trending right now?",
//   "Help me find a party outfit",
//   "What's your return policy?",
//   "Styling tips for weddings",
// ];

// // 🔥 Fetch products from Firebase
// const fetchProducts = async () => {
//   const snap = await getDocs(collection(db, "products"));
//   return snap.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// };
// const parseQuery = (query: string) => {
//   const q = query.toLowerCase();

//   // 🎯 category detection (your real categories)
//   let category = "";

//   if (q.includes("stitched")) category = "stitched";
//   else if (q.includes("unstitched")) category = "unstitched";
//   else if (
//     q.includes("co ord") ||
//     q.includes("co-ord") ||
//     q.includes("coord")
//   )
//     category = "co ord set";

//   // 💰 price extraction
//   let maxPrice = Infinity;

//   const priceMatch =
//     q.match(/under\s?(\d+)/) || q.match(/below\s?(\d+)/);
//   if (priceMatch) maxPrice = parseInt(priceMatch[1]);

//   // 🧠 smart words cleanup
//   const stopWords = [
//     "under",
//     "below",
//     "for",
//     "with",
//     "any",
//     "show",
//     "me",
//     "set",
//   ];

//   const keywords = q
//     .split(" ")
//     .filter((w) => !stopWords.includes(w));

//   return {
//     category,
//     maxPrice,
//     keywords,
//   };
// };
// // 🔥 Match products with query
// const findMatchingProducts = (query: string, products: any[]) => {
//   const { category, maxPrice, keywords } = parseQuery(query);

//   return products
//     .filter((p) => {
//       const name = p.name?.toLowerCase() || "";
//       const collection = p.collection?.toLowerCase() || "";
//       const productCategory = p.category?.toLowerCase() || "";
//       const price = Number(p.price);

//       // 🎯 category match (IMPORTANT)
//       const categoryMatch = category
//         ? productCategory.includes(category)
//         : true;

//       // 💰 price match
//       const priceMatch = price <= maxPrice;

//       // 🔍 keyword match
//       const keywordMatch =
//         keywords.length === 0 ||
//         keywords.some(
//           (k) =>
//             name.includes(k) ||
//             collection.includes(k) ||
//             productCategory.includes(k)
//         );

//       return categoryMatch && priceMatch && keywordMatch;
//     })
//     .slice(0, 5);
// };

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Auto scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Auto focus
//   useEffect(() => {
//     if (isOpen && inputRef.current) inputRef.current.focus();
//   }, [isOpen]);

//   // 🚀 AUTO OPEN after 5 sec (once per session)
//   useEffect(() => {
//     const hasOpened = sessionStorage.getItem("chatbot_auto_opened");

//     if (!hasOpened) {
//       const timer = setTimeout(() => {
//         setIsOpen(true);
//         sessionStorage.setItem("chatbot_auto_opened", "true");
//       }, 5000);

//       return () => clearTimeout(timer);
//     }
//   }, []);

// const sendMessage = async (text: string) => {
//   if (!text.trim() || isLoading) return;

//   const userMsg = { role: "user", content: text.trim() };

//   // 1️⃣ Add user message
//   setMessages((prev) => [...prev, userMsg]);

//   setInput("");
//   setIsLoading(true);

//   try {
//     // 🔥 Step 1: fetch products
//     const products = await fetchProducts();
//     const matched = findMatchingProducts(text, products);

//     // 🛍️ If products found → show instantly
//     if (matched.length > 0) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Here are some products you may like 👇",
//           products: matched,
//         },
//       ]);

//       setIsLoading(false);
//       return;
//     }

//     // 2️⃣ Add "Typing..." message
//     setMessages((prev) => [
//       ...prev,
//       { role: "assistant", content: "Typing..." },
//     ]);

//     const allMessages = [...messages, userMsg];

//     const resp = await fetch(CHAT_URL, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ messages: allMessages }),
// });

// // 🔥 ADD THIS
// if (!resp.ok) {
//   const errorText = await resp.text();
//   console.error("API ERROR:", errorText);
//   throw new Error("API failed");
// }

// const data = await resp.json();

//     // 3️⃣ Replace last message ("Typing...") with real reply
//     setMessages((prev) => {
//       const updated = [...prev];
//       updated[updated.length - 1] = {
//         role: "assistant",
//         content: data.reply || "Sorry, I couldn't help with that.",
//       };
//       return updated;
//     });
//   } catch (err) {
//     console.error("Chat error:", err);

//     // Replace typing with error
//     setMessages((prev) => {
//       const updated = [...prev];
//       updated[updated.length - 1] = {
//         role: "assistant",
//         content: "Something went wrong. Try again.",
//       };
//       return updated;
//     });
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-110 transition-all flex items-center justify-center"
//       >
//         {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
//       </button>

//       {/* Chat Window */}
//       {isOpen && (
//         <div
//           className="fixed bottom-24 right-6 z-50 w-[360px] h-[520px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
//         >
//           {/* Header */}
//           <div className="bg-primary text-white px-5 py-4 flex items-center gap-3">
//             <Sparkles size={18} />
//             <div>
//               <p className="text-sm font-medium">Ehsaas AI Stylist</p>
//               <p className="text-[10px] opacity-80">Shopping Assistant ✨</p>
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
//             {messages.length === 0 && (
//               <div className="text-center text-sm text-muted-foreground">
//                 Ask me anything about fashion 💕
//               </div>
//             )}

//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`flex ${
//                   msg.role === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
//                     msg.role === "user"
//                       ? "bg-primary text-white"
//                       : "bg-secondary/40 text-black"
//                   }`}
//                 >
//                   {/* TEXT */}
//                   {msg.role === "assistant" && msg.products ? (
//                     <div>
//                       <p className="mb-2">{msg.content}</p>

//                       {/* PRODUCTS */}
//                       <div className="space-y-2">
//                         {msg.products.map((p: any) => (
//                           <div
//                             key={p.id}
//                             className="flex items-center gap-2 border rounded-lg p-2 bg-white"
//                           >
//                             <img
//                               src={p.image || "/placeholder.jpg"}
//                               className="w-10 h-10 rounded object-cover"
//                             />

//                             <div className="flex-1">
//                               <p className="text-xs font-semibold">
//                                 {p.name}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 ₹{p.price}
//                               </p>
//                             </div>

//                             <button
//                               onClick={() =>
//                                 alert(`${p.name} added to cart`)
//                               }
//                               className="text-xs bg-black text-white px-2 py-1 rounded"
//                             >
//                               Add
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ) : msg.role === "assistant" ? (
//                     <ReactMarkdown>{msg.content}</ReactMarkdown>
//                   ) : (
//                     msg.content
//                   )}
//                 </div>
//               </div>
//             ))}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <div className="border-t p-3 flex gap-2">
//             <input
//               ref={inputRef}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask about outfits..."
//               className="flex-1 border rounded-full px-3 py-2 text-sm"
//             />

//             <button
//               onClick={() => sendMessage(input)}
//               disabled={!input.trim() || isLoading}
//               className="w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center"
//             >
//               <Send size={14} />
//             </button>
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

const CHAT_URL = "http://localhost:8080/api/chat";

// ================================
// 💾 CACHE
// ================================
const responseCache: Record<string, any> = {};

// ================================
// 🔥 FETCH PRODUCTS
// ================================
const fetchProducts = async () => {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// ================================
// 💬 COMPONENT
// ================================
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  // ❌ DISABLED AUTO OPEN (causes issues)
  // useEffect(() => {
  //   const hasOpened = sessionStorage.getItem("chatbot_auto_opened");
  //   if (!hasOpened) {
  //     const timer = setTimeout(() => {
  //       setIsOpen(true);
  //       sessionStorage.setItem("chatbot_auto_opened", "true");
  //     }, 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, []);

  // ================================
  // 🚀 SEND MESSAGE
  // ================================
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const cleanText = text.trim().toLowerCase();

    if (responseCache[cleanText]) {
      setMessages((prev) => [...prev, responseCache[cleanText]]);
      return;
    }

    const userMsg = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setIsLoading(true);

    try {
      const products = await fetchProducts();

      // simple match (keep your logic or improve later)
      const matched = products.slice(0, 5);

      if (matched.length > 0) {
        const botResponse = {
          role: "assistant",
          content: "Here are some products 👇",
          products: matched,
        };

        setMessages((prev) => [...prev, botResponse]);
        responseCache[cleanText] = botResponse;
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Typing..." },
      ]);

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
        }),
      });

      const data = await resp.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: data.reply || "Try asking something else ✨",
        };
        return updated;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ================= BUTTON ================= */}
      <button
        onClick={() => {
          console.log("CHAT CLICKED"); // debug
          setIsOpen((prev) => !prev);
        }}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-black text-white shadow-xl flex items-center justify-center cursor-pointer"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* ================= CHAT WINDOW ================= */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] w-[360px] h-[520px] bg-white border rounded-2xl shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="bg-black text-white px-5 py-4 flex items-center gap-2">
            <Sparkles size={16} />
            Ehsaas AI Stylist
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="text-gray-400 text-center text-sm">
                Ask me anything about fashion 💕
              </p>
            )}

            {messages.map((msg, i) => (
              <div key={i} className="mb-3">
                {msg.role === "assistant" && msg.products ? (
                  <>
                    <p>{msg.content}</p>
                    {msg.products.map((p: any) => (
                      <div key={p.id} className="flex gap-2 border p-2 mt-2">
                        <img
                          src={p.image || "/placeholder.jpg"}
                          className="w-10 h-10"
                        />
                        <div>
                          <p>{p.name}</p>
                          <p>₹{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about outfits..."
              className="flex-1 border px-2 py-1"
            />
            <button onClick={() => sendMessage(input)}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;