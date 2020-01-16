const { series, src, dest, watch } = require('gulp');
const markdownToJSON  = require('gulp-markdown-to-json');
const hljs = require('highlight.js');
const merge = require('gulp-merge-json');

function render(string) {
  const md = require('markdown-it')({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch(__) {}
      }
      return '';
    },
    html: true,
    linkify: true,
    typographer: true
  })

  return md.render(string);
}

function allMarkdownToJson() {
  return src('src/content/**/*.md')
  .pipe(markdownToJSON(render))
  .pipe(dest('public/dist/content'))
}

function jsonMerge() {
  return src('public/dist/content/**/*.json')
  .pipe(merge({
    fileName: 'blog.json',
    startObj: [],
    concatArrays: true,
    edit: (parseJson, file) => {
      let path = file.path.split('\\')
      parseJson.id = path[path.length-1].replace('.json', '');
      parseJson.filename = path[path.length-2] + '\\' + path[path.length-1];
      return parseJson;
    }
  }))
  .pipe(dest('public/dist'))

}
exports.default = function() {
  watch('src/content/**/*.md',{ events: 'all', ignoreInitial: false }, series(allMarkdownToJson, jsonMerge));
}