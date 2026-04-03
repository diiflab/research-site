import React from 'react';
import clsx from 'clsx';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  translateTagsPageTitle,
} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import TagsListByLetter from '@theme/TagsListByLetter';
import SearchMetadata from '@theme/SearchMetadata';
import Heading from '@theme/Heading';

export default function BlogTagsListPage({tags, sidebar}) {
  const title = translateTagsPageTitle();
  const hasSidebar = sidebar && sidebar.items.length > 0;
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogTagsListPage,
      )}>
      <PageMetadata title={title} />
      <SearchMetadata tag="blog_tags_list" />
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
                  <li aria-current="page">Tags</li>
                </ol>
              </nav>
              <Heading as="h1">{title}</Heading>
              <TagsListByLetter tags={tags} />
            </main>
          </div>
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
}
