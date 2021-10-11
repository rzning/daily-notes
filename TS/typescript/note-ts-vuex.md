# 1

- [陪尤雨溪一起，实现 Vuex 无限层级类型推断。（TS 4.1 新特性） - SegmentFault 思否](https://segmentfault.com/a/1190000023931783)

目标：实现在 Vuex 嵌套 modules 下 dispatch 的类型推断。

Store 示例结构：

```ts
const store = Vuex({
  mutations: {
    root() {}
  },
  modules: {
    cart: {
      mutations: {
        add() {},
        remove() {}
      }
    },
    user: {
      mutations: {
        login() {}
      },
      modules: {
        admin: {
          mutations: {
            login() {}
          }
        }
      }
    }
  }
})
```

定义函数骨架：

```ts
type Store<Mutations, Modules> = {
  commit(mutation: Mutation<Mutations, Modules>): void
}

type VuexOptions<Mutations, Modules> = {
  mutations: Mutations
  modules: Modules
}

declare function Vuex<Mutations, Modules>(
  options: VuexOptions<Mutations, Modules>
): Store<Mutations, Modules>
```

获取对象成员值类型：

```ts
type GetValues<T> = {
  [K in keyof T]: T[K]
}[keyof T]

type A = GetValues<{ a: 'abc'; b: 123 }>
// => type A = "abc" | 123
```

推断单个 Module 中 Mutation Keys ：

```ts
// 单个 Module
// cart: {
//   mutations: {
//     add() {},
//     remove() {}
//   }
// }

type GetMutations<Module> = Module extends { mutations: infer M } ? M : never

// 通过 `keyof GetMutations<Module>` 可以拿到 `'add' | 'remove'`

type AddPrefix<Prefix, Keys> = `${Prefix & string}/${Keys & string}`

// 通过 AddPrefix<'cart', 'add' | 'remove'> 拼接出 `"cart/add" | "cart/remove"`

type GetMutationKeys<Key, Module> = AddPrefix<Key, keyof GetMutations<Module>>
```

推断嵌套 Modules 以及完整代码：

```ts
type GetMutations<Module> = Module extends { mutations: infer M } ? M : never

type AddPrefix<Prefix, Keys> = `${Prefix & string}/${Keys & string}`

type GetMutationKeys<Key, Module> = AddPrefix<Key, keyof GetMutations<Module>>

type GetSubModules<Module> = Module extends { modules: infer SubModules }
  ? SubModules
  : never

type GetModuleMutationKeys<Key, Module> =
  | GetMutationKeys<Key, Module>
  | GetSubModulesMutationKeys<Key, GetSubModules<Module>>

type GetModulesMutationKeys<Modules> = {
  [K in keyof Modules]: GetModuleMutationKeys<K, Modules[K]>
}[keyof Modules]

type GetSubModulesMutationKeys<Key, SubModules> = AddPrefix<
  Key,
  GetModulesMutationKeys<SubModules>
>

type Mutation<Mutations, Modules> =
  | keyof Mutations
  | GetModulesMutationKeys<Modules>

type Store<Mutations, Modules> = {
  commit(mutation: Mutation<Mutations, Modules>): void
}

type VuexOptions<Mutations, Modules> = {
  mutations?: Mutations
  modules?: Modules
}

declare function Vuex<Mutations, Modules>(
  options: VuexOptions<Mutations, Modules>
): Store<Mutations, Modules>
```

# 2

2021-10-11

```ts
type VuexOptions<M, N> = {
  namespace: N
  mutations: M
}

type Action<M, N> = N extends string ? `${N}/${keyof M & string}` : keyof M

type Store<M, N> = {
  dispatch(action: Action<M, N>): void
}

declare function Vuex<M, N>(options: VuexOptions<M, N>): Store<M, N>

const store = Vuex({
  namespace: 'cart' as const,
  mutations: {
    add() {},
    remove() {}
  }
})

store.dispatch('cart/add')
store.dispatch('cart/remove')
```

# 3

- [typescript 对 vuex 的全面支持 | Wynnyo Blog](http://wynnyo.com/archives/ts-vuex)
- [vuex-ts-prompt - npm](https://www.npmjs.com/package/vuex-ts-prompt)
