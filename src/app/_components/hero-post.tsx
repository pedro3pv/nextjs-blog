"use client";
import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { Calendar, ArrowRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section id="posts" className="mb-24">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="text-sm font-medium mb-2 tracking-wider uppercase" style={{ color: "#858c8c" }}>
            POST EM DESTAQUE
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Leitura Recomendada
          </h2>
        </div>
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "#cc8c51" }}
        >
          <Star className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Hero Post Card */}
      <div 
        className="border rounded-3xl overflow-hidden hover:border-opacity-80 transition-all duration-500 group"
        style={{
          backgroundColor: "rgba(30, 30, 30, 0.6)",
          borderColor: "#595350",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#cc8c51"
          e.currentTarget.style.backgroundColor = "rgba(30, 30, 30, 0.8)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#595350"
          e.currentTarget.style.backgroundColor = "rgba(30, 30, 30, 0.6)"
        }}
      >
        {/* Cover Image */}
        <div className="relative overflow-hidden">
          {/* <CoverImage title={title} src={coverImage} slug={slug} /> */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 text-white group-hover:text-opacity-90 transition-colors">
                <Link href={`/posts/${slug}`} className="hover:underline">
                  {title}
                </Link>
              </h3>
              
              <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: "#bfbbb5" }}>
                {excerpt}
              </p>

              <Button
                className="text-white hover:opacity-90 rounded-2xl font-medium transition-all group"
                style={{ backgroundColor: "#cc8c51" }}
                asChild
              >
                <Link href={`/posts/${slug}`}>
                  Ler Post Completo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Date */}
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "#4772b2" }}
                >
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#858c8c" }}>
                    Publicado em
                  </p>
                  <p className="text-sm text-white">
                    <DateFormatter dateString={date} />
                  </p>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <Avatar name={author.name} picture={author.picture} size="md" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#858c8c" }}>
                    Autor
                  </p>
                  <p className="text-sm text-white">{author.name}</p>
                </div>
              </div>

              {/* Reading Time */}
              <div 
                className="border rounded-2xl p-4"
                style={{
                  backgroundColor: "rgba(48, 48, 48, 0.4)",
                  borderColor: "#595350",
                }}
              >
                <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "#858c8c" }}>
                  Tempo de Leitura
                </p>
                <p className="text-2xl font-light text-white">5 min</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
