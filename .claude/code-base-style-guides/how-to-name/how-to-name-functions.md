# Naming Functions

## **A/HC/LC Pattern**

There is a useful pattern to follow when naming functions:

```javascript
prefix? + action (A) + high context (HC) + low context? (LC)
```

Example how this pattern may be applied in the table below.

| **Name**               | **Prefix** | **Action (A)** | **High context (HC)** | **Low context (LC)** |
| ---------------------- | ---------- | -------------- | --------------------- | -------------------- |
| `getUser`              |            | `get`          | `User`                |                      |
| `getUserMessages`      |            | `get`          | `User`                | `Messages`           |
| `handleClickOutside`   |            | `handle`       | `Click`               | `Outside`            |
| `shouldDisplayMessage` | `should`   | `Display`      | `Message`             |                      |

> **Note:** The order of context affects the meaning of a variable. For example, `shouldUpdateComponent` means you are about to update a component, while `shouldComponentUpdate` tells you that component will update itself, and you are only controlling when it should update. In other words, high context emphasizes the meaning of a variable.

## **Actions**

The verb of your function name, responsible for describing what the function **_does_**.

### **`get`**

Accesses data immediately (i.e. shorthand getter of internal data).

```jsx
function getFruitCount() {
  return this.fruits.length
}

async function getUser(id) {
  const user = await fetch(`/api/user/${id}`)
  return user
}
```

> See also compose.

### **`set`**

Sets a variable in a declarative way, with value `A` to value `B`.

```jsx
let fruits = 0

function setFruits(nextFruits) {
  fruits = nextFruits
}

setFruits(5)
```

### **`reset`**

Sets a variable back to its initial value or state.

```jsx
const initialFruits = 5
let fruits = initialFruits
setFruits(10)
console.log(fruits) // 10

function resetFruits() {
  fruits = initialFruits
}

resetFruits()
console.log(fruits) // 5
```

### **`remove`**

Removes something _from_ somewhere.

For example, if you have a collection of selected filters on a search page, removing one of them from the collection is `removeFilter`, **not** `deleteFilter` (and this is how you would naturally say it in English as well):

```jsx
function removeFilter(filterName, filters) {
  return filters.filter((name) => name !== filterName)
}

const selectedFilters = ["price", "availability", "size"]
removeFilter("price", selectedFilters)
```

> See also delete.

### **`delete`**

Completely erase something from existence.

Imagine you are a content editor, and there is that notorious post you wish to get rid of. Once you clicked a shiny "Delete post" button, the CMS performed `deletePost` action, **not** `removePost`.

```jsx
function deletePost(id) {
  return database.find({ id }).delete()
}
```

> See also remove.

> **Remove or Delete?**
>
> When the difference between `remove` and `delete` is not so obvious to you, I'd suggest looking at their opposite actions - `add` and `create`. The key difference between `add` and `create` is that `add` needs a destination while `create` **requires no destination**. You `add` an item _to somewhere_, but you don't "`create` it _to somewhere_". Simply pair `remove` with `add` and `delete` with `create`.

### **`compose`**

Create new data from the existing one (usually strings, objects, or functions).

```jsx
function composePageUrl(pageName, pageId) {
  return pageName.toLowerCase() + "-" + pageId
}
```

> See also get.

### **`handle`**

Handles an action. Often used when naming a callback method.

```jsx
function handleLinkClick() {
  console.log("Clicked a link!")
}

link.addEventListener("click", handleLinkClick)
```

## **Context**

A domain that a function operates on.

A function is often an action on _something_. It is important to state what its operable domain is, or at least an expected data type.

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

> Some language-specific assumptions may allow omitting the context. For example, in JavaScript, it's common that filter operates on Array. Adding explicit filterArray would be unnecessary.

---

### References

https://github.com/kettanaito/naming-cheatsheet
