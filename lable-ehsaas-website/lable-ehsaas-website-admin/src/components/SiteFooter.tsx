import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-[#fed3e7] text-[#222] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Newsletter */}
        <div className="grid lg:grid-cols-2 gap-10 border-b border-black/10 pb-14">
          <div>
            <p className="text-sm tracking-widest text-[#444]">
              SUBSCRIBE FOR NEWSLETTER
            </p>
            <h2 className="text-4xl font-serif mt-3 text-black">Join Today</h2>

            {/* Input */}
            <div className="mt-6 flex items-center bg-transparent border border-black/30 rounded-full px-4 py-3">
              <input
                type="text"
                placeholder="Your email address"
                className="bg-transparent flex-1 outline-none text-black placeholder-gray-600"
              />
              <button className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center text-lg">
                →
              </button>
            </div>

            {/* Checkbox */}
            <label className="flex items-center mt-4 text-sm text-[#555] cursor-pointer">
              <input type="checkbox" className="mr-2" />
              I agree with the{" "}
              <span className="underline ml-1 text-black">terms & conditions</span>
            </label>
          </div>

          {/* Right Column Links */}
          <div className="grid sm:grid-cols-3 gap-8 text-sm">
            {/* Support */}
          {/* Support */}
<div>
  <h4 className="font-semibold mb-3 text-black">SUPPORT</h4>
  <ul className="space-y-2 text-[#444]">
   <li><Link to="/">Home</Link></li>
    <li><Link to="/shop">Shop</Link></li>
    <li><Link to="/collections">Collections</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/contact">Contact</Link></li>
    
    <li><Link to="/shipping-info">Delivery & Return</Link></li>
  </ul>
</div>

{/* Info */}
<div>
  <h4 className="font-semibold mb-3 text-black">INFO</h4>
  <ul className="space-y-2 text-[#444]">
    <li><Link to="/about">About Us</Link></li>
    <li><Link to="/returns-refunds">Return Policy</Link></li>
    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
    <li><Link to="/faq">FAQ</Link></li>
    <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
    <li><Link to="/accessibility">Accessibility</Link></li>
  </ul>
</div>

            {/* Brand Section */}
            <div>
              <h4 className="font-serif text-xl mb-3 text-black">Ehsaas</h4>
              <p className="text-[#555] leading-relaxed">
                Proin a interdum elit. Etiam eu sapien sem. Suspendisse a massa
                justo. Cras eget lorem nunc. Fusce nec urna tempus tempus.
              </p>

              {/* Social Icons */}
             <div className="flex items-center gap-5 mt-4 text-xl text-black">
  <Facebook className="cursor-pointer" />
  <Instagram className="cursor-pointer" />
  <Youtube className="cursor-pointer" />
  <Linkedin className="cursor-pointer" />
</div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
    <div className="w-full text-center mt-6 text-sm text-[#555] flex justify-center items-center gap-3">
  <p>©labelehsaas all rights Reserved</p>

  <span>|</span>

  <a
    href="https://www.pawartechnologyservices.com/"   /* your PTS redirect link */
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-black transition underline"
  >
    Design by PTS
  </a>
</div>

      </div>
    </footer>
  );
};

export default Footer;