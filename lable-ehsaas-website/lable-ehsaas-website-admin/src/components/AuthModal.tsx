import { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal, login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!showAuthModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const success = isLogin ? await login(email, password) : await signup(name, email, password);
      if (success) {
        setShowAuthModal(false);
        setEmail("");
        setPassword("");
        setName("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={() => setShowAuthModal(false)} />
      <div className="relative bg-background border border-border w-full max-w-md mx-4 animate-fade-up overflow-hidden">
        {/* Pink accent top */}
        <div className="h-1 bg-secondary w-full" />
        
        <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="p-8 pt-10">
          <h2 className="font-heading text-3xl font-light italic text-foreground text-center mb-2">
            {isLogin ? "Welcome Back" : "Join Ehsaas"}
          </h2>
          <p className="font-body text-xs font-light text-muted-foreground text-center tracking-[0.15em] uppercase mb-8">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </p>

          {error && (
            <p className="font-body text-xs text-destructive text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required={!isLogin}
                  className="w-full bg-transparent border border-border font-body text-sm font-light pl-12 pr-5 py-4 focus:outline-none focus:border-foreground transition-colors duration-300"
                />
              </div>
            )}
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full bg-transparent border border-border font-body text-sm font-light pl-12 pr-5 py-4 focus:outline-none focus:border-foreground transition-colors duration-300"
              />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-transparent border border-border font-body text-sm font-light pl-12 pr-5 py-4 focus:outline-none focus:border-foreground transition-colors duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase py-4 hover:bg-foreground/80 transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="font-body text-xs font-light text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="underline">{isLogin ? "Sign Up" : "Sign In"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
