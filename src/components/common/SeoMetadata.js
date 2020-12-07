import React, { Fragment } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

const totalKeywordsAllowed = 5;

const SeoMetadata = props => {
  const { title, description, image, url, twitterImage, keywords } = props;
  const twitterSeoImage = twitterImage ? twitterImage : image;
  const keywordsCommaDelimitedString = keywords
    ? keywords
        .map(el => el && el.tag_name)
        .slice(0, totalKeywordsAllowed)
        .join(",")
    : undefined;
  console.log("keywordsCommaDelimitedString", keywordsCommaDelimitedString);
  return (
    <Fragment>
      <Helmet>
        {/* <!-- HTML Meta Tags --> */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* <!-- Google / Search Engine Tags --> */}
        <meta itemprop="name" content={title} />
        <meta itemprop="description" content={description} />
        <meta itemprop="image" content={image} />
        {keywordsCommaDelimitedString ? <meta itemprop="keywords" content={keywordsCommaDelimitedString} /> : null}

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image:secure" content={image} />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={twitterSeoImage} />
      </Helmet>
    </Fragment>
  );
};

SeoMetadata.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  twitterImage: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
};

export default SeoMetadata;
