"use client";
import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import { Grid, List } from 'lucide-react';

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section className="mb-24">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <div className="text-sm font-medium mb-2 tracking-wider uppercase" style={{ color: "#858c8c" }}>
            MAIS CONTEÚDO
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Outros Posts
          </h2>
        </div>
        <div 
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "#4772b2" }}
        >
          <Grid className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>

      {/* Load More Button */}
      {posts.length >= 6 && (
        <div className="text-center mt-12">
          <button
            className="text-white hover:opacity-90 px-8 py-3 text-lg bg-transparent rounded-2xl font-medium transition-all border"
            style={{
              borderColor: "#595350",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(89, 83, 80, 0.2)"
              e.currentTarget.style.borderColor = "#cc8c51"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.borderColor = "#595350"
            }}
          >
            Carregar Mais Posts
          </button>
        </div>
      )}
    </section>
  );
}
