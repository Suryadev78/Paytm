import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card"; 
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Hero Section */}
      <header className="w-full border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold">Paytm Clone</h1>
          <div className="space-x-3">
            <Link to="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl font-bold mb-4">
          Simple & Secure Payments
        </h2>
        <p className="text-gray-600 max-w-lg mb-6">
          Send and receive money instantly. Manage your wallet with ease.  
          A modern payment experience built for speed and security.
        </p>
        <Link to="/dashboard">
          <Button size="lg">Go to Dashboard</Button>
        </Link>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12 max-w-4xl">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg">⚡ Instant Transfers</h3>
              <p className="text-sm text-gray-600 mt-2">
                Send money to friends and family within seconds.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg">🔒 Secure Wallet</h3>
              <p className="text-sm text-gray-600 mt-2">
                Your funds and data are protected with enterprise-grade security.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg">📊 Easy Tracking</h3>
              <p className="text-sm text-gray-600 mt-2">
                Stay on top of your transactions with a clean dashboard.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-gray-500 text-center">
          © {new Date().getFullYear()} Paytm Clone By Suryadev. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
