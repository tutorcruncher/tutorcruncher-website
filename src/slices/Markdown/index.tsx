import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ReactMarkdown from "react-markdown";
import { RichText } from "prismic-reactjs";
import { Body } from "@/components/ui/body";
import remarkGfm from "remark-gfm";

/**
 * Props for `Markdown`.
 */
export type MarkdownProps = SliceComponentProps<Content.MarkdownSlice>;

/**
 * Component for "Markdown" Slices.
 */
const Markdown = ({ slice, index, context }: MarkdownProps): JSX.Element => {
  const rawMarkdown = Array.isArray(slice.primary.markdown)
    ? slice.primary.markdown.map((block) => block.text).join("\n")
    : "";
  
  const isPrivacyPage = (context as any)?.isPrivacyPage === true;
  // Inside a blog article the content should flow with the surrounding text,
  // so drop the section padding.
  const isArticle = (context as any)?.isArticle === true;
  const spacing =
    (isPrivacyPage && index > 0) || isArticle ? "none" : "small";
  
  return (
    <section>
      <Body containerSize="small" spacing={spacing}>
        <div className="main-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {rawMarkdown}
          </ReactMarkdown>
        </div>
      </Body>
    </section>
  );
};

export default Markdown;
