// import { X } from "lucide-react";
// import { useState } from "react";
// import { useCart } from "@/context/CartContext";

// const GiftModal = ({ onClose }: { onClose: () => void }) => {
//   const { setGiftPackaging } = useCart();
//   const [note, setNote] = useState("");

//   const handleSave = () => {
//     setGiftPackaging(note);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <div className="bg-white w-full max-w-4xl grid grid-cols-2 relative">

//         <button onClick={onClose} className="absolute right-4 top-4">
//           <X />
//         </button>

//         {/* LEFT IMAGE */}
//         <img src="/gift-box.jpg" className="h-full w-full object-cover" />

//         {/* RIGHT */}
//         <div className="p-8">
//           <h2 className="text-xl mb-2">Gift Packaging</h2>
//           <p className="mb-4">₹499</p>

//           <textarea
//             placeholder="Write your message..."
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//             className="w-full border p-3 mb-4"
//           />

//           <button
//             onClick={handleSave}
//             className="w-full bg-black text-white py-3"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GiftModal;
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import giftBox from "@/assets/gift-image.jpeg";
const GiftModal = ({ onClose }: { onClose: () => void }) => {
  const {
    giftNote,
    setGiftNote,
    setGiftPackaging,
    giftPrice
  } = useCart();

  const handleSave = () => {
    setGiftPackaging(giftNote); // Save + activate gift box
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
  <div className="bg-white w-full max-w-4xl grid grid-cols-2 relative rounded-sm overflow-hidden">

    <button
      onClick={onClose}
      className="absolute right-4 top-4 z-50 text-gray-600"
    >
      <X size={20} />
    </button>

    {/* LEFT IMAGE (FIXED) */}
   <div className="relative w-full h-full">
  <img
    src={giftBox}
    alt="Gift Box"
    className="absolute inset-0 w-full h-full object-cover"
  />
</div>

    {/* RIGHT PANEL */}
    <div className="p-8 flex flex-col justify-between z-40 bg-white">
      <div>
        <h2 className="text-2xl font-heading mb-2">Gift Packaging</h2>
        <p className="text-lg mb-4 font-medium">₹499</p>

        <label className="text-xs uppercase tracking-wide mb-1 block">
          Gift Message (Optional)
        </label>

        <textarea
          placeholder="Write your message here..."
          value={giftNote}
          onChange={(e) => setGiftNote(e.target.value)}
          maxLength={120}
          className="w-full border border-gray-300 p-3 text-sm h-28 resize-none focus:outline-none focus:border-black"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-black text-white py-3 mt-6 hover:opacity-90 transition"
      >
        Save Gift Option
      </button>
    </div>
  </div>
</div>
  );
};

export default GiftModal;