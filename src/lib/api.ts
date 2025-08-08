import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { getFileCommitHistory } from "./githubGathering";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Exemplo de função fictícia para obter informações do GitHub
  // Implemente getFileCommitHistory conforme sua necessidade
  // Aqui está um mock para ilustrar:
  const githubInfo = await getFileCommitHistory(
    "pedro3pv", // substitua pelo owner do seu repo
    "nextjs-blog", // substitua pelo nome do seu repo
    `_posts/${realSlug}.md` // ajuste o caminho conforme sua estrutura
  );

  return {
    ...data,
    slug: realSlug,
    content,
    author: githubInfo?.creator
      ? {
        name: githubInfo.creator.name,
        picture: `https://github.com/${githubInfo.creator.name}.png`
      }
      : undefined,
    lastEditDate: githubInfo?.lastEditor?.date,
    lastEditor: githubInfo?.lastEditor
      ? {
        name: githubInfo.lastEditor.name,
        picture: `https://github.com/${githubInfo.lastEditor.name}.png`
      }
      : undefined
  } as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  // sort posts by date in descending order
  const sortedPosts = posts
    .filter((post): post is Post => post !== undefined)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return sortedPosts;
}
