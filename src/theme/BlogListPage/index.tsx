import React from "react";
import BlogListPage from "@theme-original/BlogListPage";
import type BlogListPageType from "@theme/BlogListPage";
import type { WrapperProps } from "@docusaurus/types";

type Props = WrapperProps<typeof BlogListPageType>;

export default function BlogListPageWrapper(props: Props): JSX.Element {
  const { items } = props;

  // Sort blog posts: sticky posts come first, then by date
  const sortedItems = [...items].sort((a, b) => {
    const stickyA = a.content.metadata.frontMatter.sticky || false;
    const stickyB = b.content.metadata.frontMatter.sticky || false;

    // If both are sticky or non-sticky, sort by date
    if (stickyA === stickyB) {
      return (
        new Date(b.content.metadata.date).getTime() -
        new Date(a.content.metadata.date).getTime()
      );
    }

    // Sticky posts come first
    return stickyB ? 1 : -1;
  });
  return (
    <>
      <BlogListPage {...props} items={sortedItems} />
    </>
  );
}
