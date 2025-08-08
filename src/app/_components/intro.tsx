"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Coffee, Code, Heart } from 'lucide-react';
import Link from "next/link";

export function Intro() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div 
          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ 
            backgroundColor: "rgba(204, 140, 81, 0.1)", 
            color: "#cc8c51",
            border: "1px solid rgba(204, 140, 81, 0.2)"
          }}
        >
          <Coffee className="w-4 h-4 mr-2" />
          Bem-vindo
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight mb-8">
          <span className="text-white">Pensamentos,</span>
          <br />
          <span style={{ color: "#cc8c51" }}>Código</span>
          <span className="text-white"> & </span>
          <span style={{ color: "#4772b2" }}>Criatividade</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed" style={{ color: "#bfbbb5" }}>
          Compartilho experiências sobre desenvolvimento, tecnologia e vida. 
          <span className="text-white font-medium"> Explore ideias que transformam código em soluções.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            className="text-white hover:opacity-90 px-8 py-3 text-lg rounded-2xl font-medium transition-all"
            style={{ backgroundColor: "#cc8c51" }}
            asChild
          >
            <Link href="#posts">
              Explorar Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-white hover:text-white px-8 py-3 text-lg bg-transparent rounded-2xl transition-all"
            style={{
              borderColor: "#595350",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(89, 83, 80, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
            }}
            asChild
          >
            {/* <Link href="/about">
              Sobre Mim
            </Link> */}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1+</div>
            <div className="text-sm" style={{ color: "#858c8c" }}>Posts Publicados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">3</div>
            <div className="text-sm" style={{ color: "#858c8c" }}>Anos Codando</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">∞</div>
            <div className="text-sm" style={{ color: "#858c8c" }}>Café Consumido</div>
          </div>
        </div>
      </div>
    </section>
  );
}
