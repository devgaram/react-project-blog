import React from "react";
import marked from "marked";
import createDOMPurify from "dompurify";

const ConvertHTML = ({ html, className, maxLength }) => {
  const DOMPurify = createDOMPurify(window);
  const convertedHTML = html
    ? DOMPurify.sanitize(marked(html).substr(0, maxLength))
    : "";

  return (
    <>
      <div
        className={className}
        dangerouslySetInnerHTML={{
          __html: convertedHTML
        }}
      ></div>
    </>
  );
};

export default ConvertHTML;
