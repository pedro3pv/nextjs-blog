import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, User, Mail, Github, Linkedin } from 'lucide-react';

export default function Header() {
  return (
    <header 
      className="border-b sticky top-0 z-50 backdrop-blur-sm" 
      style={{ 
        backgroundColor: "rgba(15, 15, 15, 0.95)", 
        borderBottomColor: "#595350" 
      }}
    >
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#313131" }}
          >
            <span className="text-white font-bold text-sm">P</span>
          </div>
          {/* <span className="text-xl font-semibold text-white"></span> */}
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm font-medium hover:text-white transition-colors flex items-center space-x-2"
            style={{ color: "#bfbbb5" }}
          >
            <Home className="h-4 w-4" />
            <span>Início</span>
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-white transition-colors flex items-center space-x-2"
            style={{ color: "#bfbbb5" }}
          >
            <User className="h-4 w-4" />
            <span>Sobre</span>
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-white transition-colors flex items-center space-x-2"
            style={{ color: "#bfbbb5" }}
          >
            <Mail className="h-4 w-4" />
            <span>Contato</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com"
            className="hover:text-white transition-colors"
            style={{ color: "#bfbbb5" }}
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com"
            className="hover:text-white transition-colors"
            style={{ color: "#bfbbb5" }}
          >
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
