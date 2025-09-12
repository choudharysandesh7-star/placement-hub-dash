import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import collegeLogo from '@/assets/college-logo.jpg';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      toast({
        title: "Login Successful",
        description: "Welcome back, Admin!",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <img 
                src={collegeLogo} 
                alt="College Logo" 
                className="w-16 h-16 rounded-lg"
              />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome Back, Admin!
            </CardTitle>
            <CardDescription>
              Sign in to access the placement management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              Demo credentials: admin / admin123
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;