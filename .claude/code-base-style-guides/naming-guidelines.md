## **Follow naming conventions**

Pick **one** naming convention and follow it.

`camelCase`

- functions

`PascalCase`

- Components
- Context
- Classes
- Interfaces
- Types

`snake_case` + `UPPER_CASE`

- Constants
- Enums?

`kebab-case`

- folder names `folder-names`

## **S-I-D**

Names must be *short*, *intuitive* and *descriptive*:

- **Short** — must not take long to type and, therefore, remember;
- **Intuitive** — must read naturally, as close to spoken speech as possible;
- **Descriptive** — must reflect what it does/possesses in the most efficient way.

```jsx
/* Bad */
const a = 5 // "a" could mean anything
const isPaginatable = a > 10 // "Paginatable" sounds extremely unnatural
const shouldPaginatize = a > 10 // Made up verbs are so much fun!

/* Good */
const postCount = 5
const hasPagination = postCount > 10
const shouldPaginate = postCount > 10 // alternatively
```

## Naming No no’s

**Never** use contractions.

```jsx
/* Bad */
const onItmClk = () => {}

/* Good */
const onItemClick = () => {}
```

**Avoid context duplication**

A name should not duplicate the context in which it is defined. Always remove the context from a name if that doesn't decrease its readability.

```jsx
class MenuItem {
  /* Method name duplicates the context (which is "MenuItem") */
  handleMenuItemClick = (event) => { ... }

  /* Reads nicely as `MenuItem.handleClick()` */
  handleClick = (event) => { ... }
}
```

**Reflect the expected result**

A name should reflect the expected result.

```jsx
/* Bad */
const isEnabled = itemCount > 3
return <Button disabled={!isEnabled} />

/* Good */
const isDisabled = itemCount <= 3
return <Button disabled={isDisabled} />
```

---

# **Naming functions**

**A/HC/LC Pattern**

There is a useful pattern to follow when naming functions:

```
prefix? + action (A) + high context (HC) + low context? (LC)
```

Example how this pattern may be applied in the table below.

| **Name**               | **Prefix** | **Action (A)** | **High context (HC)** | **Low context (LC)** |
| ---------------------- | ---------- | -------------- | --------------------- | -------------------- |
| `getUser`              |            | `get`          | `User`                |                      |
| `getUserMessages`      |            | `get`          | `User`                | `Messages`           |
| `handleClickOutside`   |            | `handle`       | `Click`               | `Outside`            |
| `shouldDisplayMessage` | `should`   | `Display`      | `Message`             |                      |

> Note: The order of context affects the meaning of a variable. For example, `shouldUpdateComponent` means you are about to update a component, while `shouldComponentUpdate` tells you that component will update itself, and you are only controlling when it should update. In other words, high context emphasizes the meaning of a variable.

---

**Actions**

The verb of your function name, responsible for describing what the function **_does_**.

**`get`** — Accesses data immediately (i.e. shorthand getter of internal data).

```jsx

function **getFruitCount**() {
  return this.fruits.length
}

async function **getUser**(id) {
  const user = await fetch(`/api/user/${id}`)
  return user
}
```

> See also compose.

**`set`** — Sets a variable in a declarative way, with value `A` to value `B`.

```jsx
let fruits = 0

function **setFruits**(nextFruits) {
  fruits = nextFruits
}

**setFruits**(5)
```

**`reset`** — Sets a variable back to its initial value or state.

```jsx
const initialFruits = 5
let fruits = initialFruits
setFruits(10)
console.log(fruits) // 10

function **resetFruits**() {
  fruits = initialFruits
}

**resetFruits**()
console.log(fruits) // 5
```

**`remove`** — Removes something *from* somewhere.

For example, if you have a collection of selected filters on a search page, removing one of them from the collection is `removeFilter`, **not** `deleteFilter` (and this is how you would naturally say it in English as well):

```jsx
function **removeFilter**(filterName, filters) {
  return filters.filter((name) => name !== filterName)
}

const selectedFilters = ['price', 'availability', 'size']
**removeFilter**('price', selectedFilters)
```

> See also delete.

**`delete`** — Completely erase something

Imagine you are a content editor, and there is that notorious post you wish to get rid of. Once you clicked a shiny "Delete post" button, the CMS performed `deletePost` action, **not** `removePost`.

```jsx
function **deletePost**(id) {
  return database.find({ id }).delete()
}
```

> See also remove.

> **Remove or Delete?**
>
> When the difference between `remove` and `delete` is not so obvious to you, I'd suggest looking at their opposite actions - `add` and `create`. The key difference between `add` and `create` is that `add` needs a destination while `create` **requires no destination**. You `add` an item *to somewhere*, but you don't "`create` it *to somewhere*". Simply pair `remove` with `add` and `delete` with `create`.

**`compose`** — Create new data from the existing one (usually strings, objects, or functions).

```jsx
function composePageUrl(pageName, pageId) {
  return pageName.toLowerCase() + "-" + pageId
}
```

> See also get.

**`handle`**

Handles an action. Often used when naming a callback method.

```jsx
function handleLinkClick() {
  console.log("Clicked a link!")
}

link.addEventListener("click", handleLinkClick)
```

---

**Context**

A domain that a function operates on.

A function is often an action on *something*. It is important to state what its operable domain is, or at least an expected data type.

```jsx
/* A pure function operating with primitives */
function filter(list, predicate) {
  return list.filter(predicate)
}

/* Function operating exactly on posts */
function getRecentPosts(posts) {
  return filter(posts, (post) => post.date === Date.now())
}
```

> Some language-specific assumptions may allow omitting the context. For example, in JavaScript, it's common that filter operates on Array. Adding explicit filterArray would be unnecessary.

---

**Prefixes**

Prefix enhances the meaning of a variable. It is rarely used in function names.

**`is`**

Describes a characteristic or state of the current context (usually `boolean`).

```jsx
const color = "blue"
const isBlue = color === "blue" // characteristic
const isPresent = true // state

if (isBlue && isPresent) {
  console.log("Blue is present!")
}
```

**`has`**

Describes whether the current context possesses a certain value or state (usually `boolean`).

```jsx
/* Bad */
const isProductsExist = productsCount > 0
const areProductsPresent = productsCount > 0

/* Good */
const hasProducts = productsCount > 0
```

**`should`**

Reflects a positive conditional statement (usually `boolean`) coupled with a certain action.

```jsx
function shouldUpdateUrl(url, expectedUrl) {
  return url !== expectedUrl
}
```

**`min`/`max`**

Represents a minimum or maximum value. Used when describing boundaries or limits.

```jsx
/**
 * Renders a random amount of posts within
 * the given min/max boundaries.
 */
function renderPosts(posts, minPosts, maxPosts) {
  return posts.slice(0, randomBetween(minPosts, maxPosts))
}
```

**`prev`/`next`**

Indicate the previous or the next state of a variable in the current context. Used when describing state transitions.

```jsx
async function getPosts() {
  const prevPosts = this.state.posts

  const latestPosts = await fetch("...")
  const nextPosts = concat(prevPosts, latestPosts)

  this.setState({ posts: nextPosts })
}
```

**Singular and Plurals**

Like a prefix, variable names can be made singular or plural depending on whether they hold a single value or multiple values.

```jsx
/* Bad */
const friends = "Bob"
const friend = ["Bob", "Tony", "Tanya"]

/* Good */
const friend = "Bob"
const friends = ["Bob", "Tony", "Tanya"]
```

---

### References

https://github.com/kettanaito/naming-cheatsheet
