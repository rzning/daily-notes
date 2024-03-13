# unplugin-auto-import

- <https://github.com/unplugin/unplugin-auto-import>

自动导入 api 按需为 Vite, Webpack 和 Rollup

为 Vite, Webpack, Rspack, Rollup 和 esbuild 按需自动导入 APIs 。

without：

```js
import { computed, ref } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
```

with:

```js
const count = ref(0)
const doubled = computed(() => count.value * 2)
```

## 安装 Install

```sh
yarn add unplugin-auto-import
```

### Vite

```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      /* options */
    })
  ]
})
```

## 配置 Configuration

```ts
AutoImport({
  // 转换目标
  include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/, // .vue
    /\.md$/ // .md
  ],

  // 要注册的全局导入
  imports: [
    // 预设
    'vue',
    'vue-router',
    // 自定义
    {
      '@vueuse/core': [
        // 具名导入
        'useMouse', // import { useMouse } from '@vueuse/core',
        // 别名导入
        ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
      ],
      'axios': [
        // 默认导入
        ['default', 'axios'] // import { default as axios } from 'axios',
      ],
      '[package-name]': [
        '[import-names]', // named
        ['[from]', '[alias]'] // alias
      ]
    },
    // 类型导入
    {
      from: 'vue-router',
      imports: ['RouteLocationRaw'],
      type: true
    }
  ],

  // 指定要忽略的导入，支持正则
  ignore: ['useMouse', 'useFetch'],

  // 为目录下的默认模块导出，启用按文件名自动导入
  defaultExportByFilename: false,

  // 自动导入目录的路径
  dirs: [
    // './hooks',
    // './composables' // only root modules
    // './composables/**', // all nested modules
    // ...
  ],

  // 生成 DTS 文件的路径
  dts: './auto-imports.d.ts',

  // 这些标识符不会放在 DTS 文件中
  ignoreDts: ['ignoredFunction', /^ignore_/],

  // 自动导入内置 Vue 模板
  vueTemplate: false,

  // 自定义解析器，与 unplugin-vue-components 兼容
  // 传递一个自定义函数，从组件名称解析组件导入路径。
  resolvers: [
    // ...
  ],

  // 在其他导入的末尾注入导入
  injectAtEnd: true,

  // 生成相应的 .eslintrc-auto-import.json 文件
  eslintrc: {
    enabled: false,
    filepath: './.eslintrc-auto-import.json',
    // boolean | 'readonly' | 'readable' | 'writable' | 'writeable'
    globalsPropValue: true
  }
})
```

## 导入预设 Imports Presets

```ts
import { builtinPresets } from 'unimport'

export const presets = {
  ...builtinPresets,
  'ahooks': ahooks,
  '@vueuse/core': vueuseCore,
  '@vueuse/math': vueuseMath,
  '@vueuse/head': vueuseHead,
  'mobx': mobx,
  'mobx-react-lite': mobxReactLite,
  'preact': preact,
  'quasar': quasar,
  'react': react,
  'react-router': reactRouter,
  'react-router-dom': reactRouterDom,
  'react-i18next': reactI18next,
  'svelte': svelte,
  'svelte/animate': svelteAnimate,
  'svelte/easing': svelteEasing,
  'svelte/motion': svelteMotion,
  'svelte/store': svelteStore,
  'svelte/transition': svelteTransition,
  'vee-validate': veeValidate,
  'vitepress': vitepress,
  'vue-router': vueRouter,
  'vue-router/composables': vueRouterComposables,
  'vuex': vuex,
  'uni-app': uniApp,
  'solid-js': solid,
  '@solidjs/router': solidRouter,
  'solid-app-router': solidAppRouter,
  'jotai': jotai,
  'jotai/utils': jotaiUtils,
  'recoil': recoil
}

export type PresetName = keyof typeof presets
```
