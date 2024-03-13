// .eleventy.js

module.exports = function (eleventyConfig) {
  return {
    /**
     * Markdown 文件在转换为 HTML 之前先运行的模板引擎
     * @type {}
     * @default 'liquid'
     */
    markdownTemplateEngine: 'liquid'
  }
}
