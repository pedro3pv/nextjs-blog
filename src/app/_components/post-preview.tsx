import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { Calendar, ArrowUpRight } from 'lucide-react';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div 
      className="border rounded-2xl overflow-hidden hover:border-opacity-80 transition-all duration-300 group"
      style={{
        backgroundColor: "rgba(30, 30, 30, 0.4)",
        borderColor: "#595350",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#cc8c51"
        e.currentTarget.style.backgroundColor = "rgba(30, 30, 30, 0.6)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#595350"
        e.currentTarget.style.backgroundColor = "rgba(30, 30, 30, 0.4)"
      }}
    >
      {/* Cover Image */}
      <div className="relative overflow-hidden">
        {/* <CoverImage title={title} src={coverImage} slug={slug} /> */}
        <div 
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: "rgba(204, 140, 81, 0.9)" }}
        >
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center space-x-2 mb-4">
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#4772b2" }}
          >
            <Calendar className="h-3 w-3 text-white" />
          </div>
          <p className="text-xs" style={{ color: "#858c8c" }}>
            <DateFormatter dateString={date} />
          </p>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold leading-tight mb-3 text-white group-hover:text-opacity-90 transition-colors">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: "#bfbbb5" }}>
          {excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center space-x-3 pt-4 border-t" style={{ borderColor: "#595350" }}>
          <Avatar name={author.name} picture={author.picture} size="sm" />
          <div>
            <p className="text-xs" style={{ color: "#858c8c" }}>Por</p>
            <p className="text-sm text-white">{author.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
