import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { login } from "@/lib/auth";
import logo from "@/assets/logo-ehsaas.jpeg";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/");
    } else {
      setError("Invalid credentials. Use admin@ehsaas.com / admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md animate-fade-in shadow-xl border-0">
        <CardHeader className="text-center pb-2">
          <img src={logo} alt="Label Ehsaas" className="w-28 h-28 mx-auto rounded-2xl object-cover mb-4" />
          <h1 className="text-2xl font-display font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to manage your store</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@ehsaas.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" size="lg">{("Sign In")}</Button>
            <p className="text-xs text-center text-muted-foreground mt-4">Demo: admin@ehsaas.com / admin123</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
