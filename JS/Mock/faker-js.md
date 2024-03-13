# Faker

<img src="https://fakerjs.dev/logo.svg" width="60px" style="float: right;">

- <https://fakerjs.dev/>
- <https://github.com/faker-js/faker>

为测试和开发生成大量虚假（但写实的）数据。

> Generate massive amounts of fake data in the browser and node.js
>
> 在浏览器和 node.js 中生成大量的假数据。

```sh
yarn add @faker-js/faker --dev
```

## 📝 使用 Usage

```ts
import { faker } from '@faker-js/faker'

export function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past()
  }
}
```

## 🌏 本地化 Localization

```ts
import { fakerEN, fakerDE, fakerZH_CN } from '@faker-js/faker'

export function getMultinationalUsers(): User {
  return [fakerEN, fakerDE, fakerZH_CN].map((faker) => {
    return {
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      backgroundImage: faker.image.url(),
      phone: faker.phone.number(),
      location: {
        state: faker.location.state(),
        city: faker.location.city(),
        street: faker.location.streetAddress()
      }
    }
  })
}
```
