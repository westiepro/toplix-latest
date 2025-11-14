'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity group"
          >
            <div className="bg-red-500 rounded-md p-1.5 group-hover:scale-110 transition-transform">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Toplix
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/buy"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all",
                pathname === '/buy'
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              Buy
            </Link>
            <Link
              href="/rent"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all",
                pathname === '/rent'
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              Rent
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-3">
            <Link
              href="/buy"
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                pathname === '/buy'
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Buy
            </Link>
            <Link
              href="/rent"
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                pathname === '/rent'
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Rent
            </Link>
          </div>

          {/* Log In Button */}
          <Button variant="outline" asChild className="gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
            <Link href="/login">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Log In</span>
              <span className="sm:hidden">Login</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

