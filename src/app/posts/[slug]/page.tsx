import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/api"
import markdownToHtml from "@/lib/markdownToHtml"
import Container from "@/app/_components/container"
import Header from "@/app/_components/header"
import { PostBody } from "@/app/_components/post-body"
import { PostHeader } from "@/app/_components/post-header"
import { PostMetadata } from "@/app/_components/post-metadata"
import { TableOfContents } from "@/app/_components/table-of-contents"

export default async function Post(props: Params) {
  const params = await props.params
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  const content = await markdownToHtml(post.content || "")

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0f0f0f" }}>
      <Header />
      <main>
        <Container>
          <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Table of Contents - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <TableOfContents />
              </div>
            </div>

            {/* Main Content */}
            <article className="lg:col-span-3">
              <PostHeader title={post.title} coverImage={post.coverImage} date={post.date} author={post.author} />
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
          </div>
        </Container>
      </main>
    </div>
  )
}

type Params = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  const title = `${post.title} | Blog Pessoal`

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      images: [post.ogImage.url],
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
