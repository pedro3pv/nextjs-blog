import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { PostMetadata } from "@/app/_components/post-metadata";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f0f0f" }}>
      <Header />
      <main>
        <Container>
          <article className="max-w-4xl mx-auto">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
            />
            <PostMetadata
              createdAt={post.date}
              creator={post.author}
              lastEditDate={post.lastEditDate}
              lastEditor={post.lastEditor}
              lastComment={post.lastComment}
              commentCreatedAt={post.commentCreatedAt}
            />
            <PostBody content={content} />
          </article>
        </Container>
      </main>
    </div>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${post.author.name}`;

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
