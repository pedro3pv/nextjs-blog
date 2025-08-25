import markdownStyles from "./markdown-styles.module.css"

type Props = {
  content: string
}

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-none">
      <div
        className={`${markdownStyles["markdown"]} prose prose-lg max-w-none`}
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ color: "#eaeaea" }}
      />
    </div>
  )
}
