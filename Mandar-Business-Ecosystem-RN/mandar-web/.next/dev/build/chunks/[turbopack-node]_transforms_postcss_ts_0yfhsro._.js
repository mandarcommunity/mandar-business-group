module.exports = [
"[turbopack-node]/transforms/postcss.ts?config=[project]/mandar-web/postcss.config.js { CONFIG => \"[project]/mandar-web/postcss.config.js_.loader.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/1bo9_1cv2wuz._.js",
  "chunks/[root-of-the-server]__18v3s4q._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts?config=[project]/mandar-web/postcss.config.js { CONFIG => \"[project]/mandar-web/postcss.config.js_.loader.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];