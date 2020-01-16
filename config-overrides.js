const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      '@primary-color': '#BC61F4',
      '@font-size-base': '16px',
      '@text-color': '#000',
      '@font-family': 'Noto Serif KR, serif',
      '@layout-header-background': '#BC61F4',
      '@layout-body-background': '#fff',
    },
  }),
);