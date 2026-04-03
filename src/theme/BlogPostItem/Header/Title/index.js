import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItemHeaderTitle({className}) {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {permalink, title} = metadata;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';

  return (
    <h1
      className={clsx(
        'blog-post-title',
        isBlogPostPage && 'blog-post-title--page',
        className,
      )}>
      {isBlogPostPage ? title : <Link to={permalink}>{title}</Link>}
    </h1>
  );
}
