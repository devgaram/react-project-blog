import React, { useEffect } from "react";

const Utteranc = () => {
  useEffect(() => {
    const script = document.createElement("script");
    const attr = {
      src: "https://utteranc.es/client.js",
      repo: "devgaram/blog-comments",
      "issue-term": "pathname",
      theme: "github-light",
      crossorigin: "anonymous",
      async: true
    };
    for (let prop in attr) {
      script.setAttribute(prop, attr[prop]);
    }
    document.getElementsByClassName("utteranc")[0].appendChild(script);
  }, []);

  return (
    <>
      <div className="utteranc"></div>
    </>
  );
};

export default Utteranc;
