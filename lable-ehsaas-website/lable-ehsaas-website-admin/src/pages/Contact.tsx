// import { useState } from "react";
// import { Mail, Phone, MapPin, Send } from "lucide-react";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
// const handleWhatsAppSubmit = (e) => {
//   e.preventDefault();

//   const { name, email, message } = formData;

//   if (!name || !email || !message) {
//     alert("Please fill all fields");
//     return;
//   }

//   const phoneNumber = "917500255861"; // country code + number

//   const text = `Hello, I have a query:

// Name: ${name}
// Email: ${email}
// Message: ${message}`;

//   const encodedText = encodeURIComponent(text);

//   const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;

//   window.open(url, "_blank");
// };
//   return (
//     <div className="page-fade-in">
//       <SiteHeader />
//       <main>
//         <div className="bg-secondary py-rhythm-3">
//           <div className="container mx-auto px-6 text-center">
//             <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">Get in Touch</p>
//             <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">Contact Us</h1>
//           </div>
//         </div>

//         <div className="container mx-auto px-6 py-rhythm-4">
//           <div className="grid md:grid-cols-2 gap-rhythm-3">
//             <div>
//               <h2 className="font-heading text-2xl font-light italic text-foreground mb-8">We'd Love to Hear From You</h2>
//               <div className="space-y-8">
//                 {[
//                  { 
//     icon: Phone, 
//     label: "Phone", 
//     value: "011-41402720, +91 9811182720, +91 9999776567" 
//   },
//   { 
//     icon: Mail, 
//     label: "Website", 
//     value: "www.label-ehsaas.com" 
//   },
//   { 
//     icon: MapPin, 
//     label: "Address", 
//     value: "827/11 8-9 A, New Krishna Cloth Market, Delhi-110006" 
//   },
//   { 
//     icon: Mail, 
//     label: "Instagram", 
//     value: "Label.ehsaas" 
//   },
//                 ].map((item) => (
//                   <div key={item.label} className="flex items-start gap-4">
//                     <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
//                       <item.icon size={18} strokeWidth={1.2} className="text-foreground" />
//                     </div>
//                     <div>
//                       <p className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-1">{item.label}</p>
//                       <p className="font-body text-sm font-light text-muted-foreground">{item.value}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
//               {[
//                 { label: "Name", key: "name", type: "text" },
//                 { label: "Email", key: "email", type: "email" },
//               ].map((field) => (
//                 <div key={field.key}>
//                   <label className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-2 block">{field.label}</label>
//                   <input
//                     type={field.type}
//                     value={formData[field.key as keyof typeof formData]}
//                     onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
//                     className="w-full bg-transparent border border-border font-body text-sm font-light px-5 py-4 focus:outline-none focus:border-foreground transition-colors duration-300"
//                     placeholder={`Your ${field.label.toLowerCase()}`}
//                   />
//                 </div>
//               ))}
//               <div>
//                 <label className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-2 block">Message</label>
//                 <textarea
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   rows={5}
//                   className="w-full bg-transparent border border-border font-body text-sm font-light px-5 py-4 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
//                   placeholder="Your message"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4 hover:bg-foreground/80 transition-colors duration-300"
//               >
//                 Send Message <Send size={14} />
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>
//       <SiteFooter />
//     </div>
//   );
// };

// export default Contact;
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      alert("Please fill all fields");
      return;
    }

    const phoneNumber = "917500255861"; // with country code

    const text = `Hello, I have a query:

Name: ${name}
Email: ${email}
Phone: ${phone}
Comment: ${message}`;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    window.open(url, "_blank");

    // Clear form after sending
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="page-fade-in">
      <SiteHeader />
      <main>
        <div className="bg-secondary py-rhythm-3">
          <div className="container mx-auto px-6 text-center">
            <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">
              Get in Touch
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">
              Contact Us
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-6 py-rhythm-4">
          <div className="grid md:grid-cols-2 gap-rhythm-3">
            {/* CONTACT INFO */}
            <div>
              <h2 className="font-heading text-2xl font-light italic text-foreground mb-8">
                We'd Love to Hear From You
              </h2>

              <div className="space-y-8">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "011-41402720, +91 9811182720, +91 9999776567",
                  },
                  {
                    icon: Mail,
                    label: "Website",
                    value: "www.label-ehsaas.com",
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    value:
                      "827/11 8-9 A, New Krishna Cloth Market, Delhi-110006",
                  },
                  {
                    icon: Mail,
                    label: "Instagram",
                    value: "Label.ehsaas",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon
                        size={18}
                        strokeWidth={1.2}
                        className="text-foreground"
                      />
                    </div>
                    <div>
                      <p className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-1">
                        {item.label}
                      </p>
                      <p className="font-body text-sm font-light text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT FORM */}
            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent border border-border font-body text-sm font-light px-5 py-4 focus:outline-none focus:border-foreground transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border border-border font-body text-sm font-light px-5 py-4 focus:outline-none focus:border-foreground transition-colors duration-300"
                  placeholder="Your email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-2 block">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-transparent border border-border font-body text-sm font-light px-5 py-4 focus:outline-none focus:border-foreground transition-colors duration-300"
                  placeholder="Your phone number"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-2 block">
                  Comment
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full bg-transparent border border-border font-body text-sm font-light px-5 py-4 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                  placeholder="Your comment"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4 hover:bg-foreground/80 transition-colors duration-300"
              >
                Send Message <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Contact;