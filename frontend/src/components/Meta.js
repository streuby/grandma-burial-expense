import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Glorious Exit | Mrs. Lydia Ikachi Obaje",
  description: "We sell the best products for the cheapest prices",
  keywords: "electronics, buy electronics, cheap electroincs",
};

export default Meta;
