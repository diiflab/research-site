import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useBlogTagsPostsPageTitle} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import Unlisted from '@theme/ContentVisibility/Unlisted';
import Heading from '@theme/Heading';

function BlogTagsPostsPageMetadata({tag}) {
  const title = useBlogTagsPostsPageTitle(tag);
  return (
    <>
      <PageMetadata title={title} description={tag.description} />
      <SearchMetadata tag="blog_tags_posts" />
    </>
  );
}

function BlogTagsPostsPageContent({tag, items, sidebar, listMetadata}) {
  const title = useBlogTagsPostsPageTitle(tag);
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
                <li>
                  <Link to={tag.allTagsPath}>Tags</Link>
                </li>
                <li aria-current="page">{tag.label}</li>
              </ol>
            </nav>
            {tag.unlisted && <Unlisted />}
            <header className="margin-bottom--xl">
              <Heading as="h1">{title}</Heading>
              {tag.description && <p>{tag.description}</p>}
              <Link href={tag.allTagsPath}>
                <Translate
                  id="theme.tags.tagsPageLink"
                  description="The label of the link targeting the tag list page">
                  View All Tags
                </Translate>
              </Link>
            </header>
            <BlogPostItems items={items} />
            <BlogListPaginator metadata={listMetadata} />
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default function BlogTagsPostsPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}>
      <BlogTagsPostsPageMetadata {...props} />
      <BlogTagsPostsPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
