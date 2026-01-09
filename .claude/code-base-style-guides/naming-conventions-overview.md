# General Guidelines

## **Follow naming conventions**

Pick **one** naming convention and follow it.

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

Names must be _short_, _intuitive_ and _descriptive_:

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

## Naming No no's

**Never** use contractions.

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

## **Prefixes**

Prefix enhances the meaning of a variable. It is rarely used in function names.

**`is`**

Describes a characteristic or state of the current context (usually `boolean`).

```jsx
const color = "blue"
const isBlue = color === "blue" // characteristic
const isPresent = true // state

if (isBlue && isPresent) {
  console.log("Blue is present!")
}
```

**`has`**

Describes whether the current context possesses a certain value or state (usually `boolean`).

```jsx
/* Bad */
const isProductsExist = productsCount > 0
const areProductsPresent = productsCount > 0

/* Good */
const hasProducts = productsCount > 0
```

**`should`**

Reflects a positive conditional statement (usually `boolean`) coupled with a certain action.

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

## **Singular and Plurals**

Like a prefix, variable names can be made singular or plural depending on whether they hold a single value or multiple values.

```jsx
/* Bad */
const friends = "Bob"
const friend = ["Bob", "Tony", "Tanya"]

/* Good */
const friend = "Bob"
const friends = ["Bob", "Tony", "Tanya"]
```
