import React from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';
import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import BlogPostItem from '@theme/BlogPostItem';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import ContentVisibility from '@theme/ContentVisibility';

function BlogPostPageContent({sidebar, children}) {
  const {metadata} = useBlogPost();
  const {title, nextItem, prevItem} = metadata;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  return (
    <Layout>
      <div className="container margin-vert--lg">
        <div className="row">
          <BlogSidebar sidebar={sidebar} />
          <main className={clsx('col', hasSidebar ? 'col--10' : 'col--12')}>
            <nav className="page-breadcrumb" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/updates">Updates</Link>
                </li>
                <li aria-current="page">{title}</li>
              </ol>
            </nav>
            <ContentVisibility metadata={metadata} />
            <BlogPostItem>{children}</BlogPostItem>
            {(nextItem || prevItem) && (
              <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default function BlogPostPage(props) {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}>
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogPostPageContent sidebar={props.sidebar}>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
