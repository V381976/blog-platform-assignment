import Head from "next/head";

const BlogJsonLd = ({ blog }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.metaDescription,
    image: blog.featureImage,
    author: {
      "@type": "Person",
      name: blog.author?.name,
    },
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </Head>
  );
};

export default BlogJsonLd;