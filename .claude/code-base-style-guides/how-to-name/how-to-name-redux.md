# Naming Redux Slice Selectors and Actions

## **Selector Naming Pattern**

Redux selectors follow a consistent pattern to ensure clarity and discoverability:

```typescript
select + [Slice?] + HighContext + [LowContext?] + [Modifier?]
```

All selectors **must** begin with `select` prefix to distinguish them from other functions and enable IDE autocomplete.

### **Basic Selectors**

| **Name**                       | **Prefix** | **Slice** | **High Context** | **Low Context** | **Modifier**    |
| ------------------------------ | ---------- | --------- | ---------------- | --------------- | --------------- |
| `selectUser`                   | `select`   |           | `User`           |                 |                 |
| `selectUserById`               | `select`   |           | `User`           |                 | `ById`          |
| `selectCartItems`              | `select`   | `Cart`    | `Items`          |                 |                 |
| `selectCartItemsCount`         | `select`   | `Cart`    | `Items`          | `Count`         |                 |
| `selectActiveCartItems`        | `select`   | `Cart`    | `Items`          |                 | `Active`        |
| `selectUserPreferences`        | `select`   | `User`    | `Preferences`    |                 |                 |
| `selectIsAuthenticated`        | `select`   |           | `Is`             | `Authenticated` |                 |
| `selectHasUnreadNotifications` | `select`   |           | `Has`            | `Unread`        | `Notifications` |

### **Selector Categories**

#### **`select[Entity]`** - Direct State Access

Returns raw state slice or entity without transformation.

```typescript
// userSlice.ts
export const selectUser = (state: RootState) => state.user.currentUser

export const selectUsers = (state: RootState) => state.user.entities
```

#### **`select[Entity]By[Criteria]`** - Parameterized Selectors

Returns specific entity based on provided criteria.

```typescript
// Memoized selector with parameter
export const selectUserById = createSelector(
  [selectUsers, (_state: RootState, userId: string) => userId],
  (users, userId) => users[userId]
)

export const selectPostsByAuthor = createSelector(
  [selectPosts, (_state: RootState, authorId: string) => authorId],
  (posts, authorId) => posts.filter(post => post.authorId === authorId)
)
```

#### **`selectIs[State]`** - Boolean State Checks

Returns boolean indicating a specific state condition.

```typescript
export const selectIsLoading = (state: RootState) => state.user.isLoading

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.token !== null

export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0
)
```

#### **`selectHas[Entity]`** - Existence Checks

Returns boolean indicating presence of entities or conditions.

```typescript
export const selectHasUnreadMessages = createSelector(
  [selectMessages],
  (messages) => messages.some(msg => !msg.isRead)
)

export const selectHasActiveSubscription = (state: RootState) =>
  state.user.subscription?.status === 'active'
```

#### **`select[Computed][Entity]`** - Derived/Computed State

Returns transformed or computed data from base state.

```typescript
export const selectSortedProducts = createSelector(
  [selectProducts],
  (products) => [...products].sort((a, b) => a.price - b.price)
)

export const selectFilteredTasks = createSelector(
  [selectTasks, selectActiveFilter],
  (tasks, filter) => tasks.filter(task => task.status === filter)
)

export const selectTotalCartPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
)
```

---

## **Action Creator Naming Pattern**

Redux Toolkit actions follow domain-driven naming that describes **what happened**, not what should happen:

```typescript
[entity] + [event/action] + [context?]
```

### **Action Categories**

| **Name**                | **Entity**     | **Event**   | **Context** | **Meaning**                       |
| ----------------------- | -------------- | ----------- | ----------- | --------------------------------- |
| `userLoggedIn`          | `user`         | `LoggedIn`  |             | User completed login              |
| `userUpdated`           | `user`         | `Updated`   |             | User data was updated             |
| `cartItemAdded`         | `cartItem`     | `Added`     |             | Item was added to cart            |
| `cartItemRemoved`       | `cartItem`     | `Removed`   |             | Item was removed from cart        |
| `cartCleared`           | `cart`         | `Cleared`   |             | Cart was emptied                  |
| `productsFetched`       | `products`     | `Fetched`   |             | Products retrieved from API       |
| `notificationDismissed` | `notification` | `Dismissed` |             | User dismissed notification       |
| `filterApplied`         | `filter`       | `Applied`   |             | Filter was applied to list        |
| `themeToggled`          | `theme`        | `Toggled`   |             | Theme switched between light/dark |

### **Standard Action Patterns**

#### **Async Thunk Actions** - API/Side Effects

Use past tense to describe completed events. RTK generates `/pending`, `/fulfilled`, `/rejected` automatically.

```typescript
// productsSlice.ts
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (categoryId: string) => {
    const response = await api.getProducts(categoryId)
    return response.data
  }
)

// Generated actions:
// - fetchProducts.pending
// - fetchProducts.fulfilled
// - fetchProducts.rejected

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: CreateProductDto) => {
    const response = await api.createProduct(productData)
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }: { id: string; data: UpdateProductDto }) => {
    const response = await api.updateProduct(id, data)
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string) => {
    await api.deleteProduct(productId)
    return productId
  }
)
```

#### **Synchronous Actions** - Immediate State Updates

Use past tense for events that already occurred.

```typescript
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adding/Removing entities
    itemAdded: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload)
    },

    itemRemoved: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    itemQuantityUpdated: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) item.quantity = action.payload.quantity
    },

    // Clearing/Resetting state
    cartCleared: (state) => {
      state.items = []
    },

    cartReset: () => initialState,

    // Toggling boolean state
    checkoutModeToggled: (state) => {
      state.isCheckoutMode = !state.isCheckoutMode
    },

    // Setting specific values
    discountApplied: (state, action: PayloadAction<string>) => {
      state.discountCode = action.payload
    },

    discountRemoved: (state) => {
      state.discountCode = null
    },
  },
})
```

#### **UI State Actions** - User Interactions

Describe the user action or resulting state change.

```typescript
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    modalOpened: (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload
    },

    modalClosed: (state) => {
      state.activeModal = null
    },

    sidebarToggled: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },

    notificationShown: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload)
    },

    notificationDismissed: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },

    filterChanged: (state, action: PayloadAction<FilterState>) => {
      state.activeFilters = action.payload
    },
  },
})
```

---

## **Complete Slice Example**

```typescript
// features/products/productsSlice.ts
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

interface Product {
  id: string
  name: string
  price: number
  category: string
  inStock: boolean
}

interface ProductsState {
  entities: Record<string, Product>
  ids: string[]
  isLoading: boolean
  error: string | null
  selectedCategory: string | null
}

const initialState: ProductsState = {
  entities: {},
  ids: [],
  isLoading: false,
  error: null,
  selectedCategory: null,
}

// Async Actions
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (category?: string) => {
    const response = await api.getProducts(category)
    return response.data
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData: Omit<Product, 'id'>) => {
    const response = await api.createProduct(productData)
    return response.data
  }
)

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Synchronous actions
    categorySelected: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },

    categoryCleared: (state) => {
      state.selectedCategory = null
    },

    productUpdated: (state, action: PayloadAction<Product>) => {
      const { id } = action.payload
      if (state.entities[id]) {
        state.entities[id] = action.payload
      }
    },

    productRemoved: (state, action: PayloadAction<string>) => {
      const id = action.payload
      delete state.entities[id]
      state.ids = state.ids.filter(existingId => existingId !== id)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        action.payload.forEach(product => {
          state.entities[product.id] = product
          if (!state.ids.includes(product.id)) {
            state.ids.push(product.id)
          }
        })
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message ?? 'Failed to fetch products'
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        const product = action.payload
        state.entities[product.id] = product
        state.ids.push(product.id)
      })
  },
})

// Base Selectors
export const selectProductsState = (state: RootState) => state.products

export const selectProductEntities = (state: RootState) =>
  state.products.entities

export const selectProductIds = (state: RootState) =>
  state.products.ids

export const selectIsLoadingProducts = (state: RootState) =>
  state.products.isLoading

export const selectProductsError = (state: RootState) =>
  state.products.error

export const selectSelectedCategory = (state: RootState) =>
  state.products.selectedCategory

// Memoized Selectors
export const selectAllProducts = createSelector(
  [selectProductEntities, selectProductIds],
  (entities, ids) => ids.map(id => entities[id])
)

export const selectProductById = createSelector(
  [selectProductEntities, (_state: RootState, productId: string) => productId],
  (entities, productId) => entities[productId]
)

export const selectProductsByCategory = createSelector(
  [selectAllProducts, (_state: RootState, category: string) => category],
  (products, category) => products.filter(p => p.category === category)
)

export const selectInStockProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter(p => p.inStock)
)

export const selectHasProducts = createSelector(
  [selectProductIds],
  (ids) => ids.length > 0
)

export const selectIsProductsEmpty = createSelector(
  [selectProductIds],
  (ids) => ids.length === 0
)

// Export actions
export const {
  categorySelected,
  categoryCleared,
  productUpdated,
  productRemoved,
} = productsSlice.actions

export default productsSlice.reducer
```

---

## **Key Principles**

### **Selectors**

- ✅ **Always** prefix with `select`
- ✅ Use `selectIs` for boolean checks
- ✅ Use `selectHas` for existence checks
- ✅ Use memoized selectors (`createSelector`) for derived data
- ✅ Co-locate selectors with their slice
- ❌ Don't use `get` prefix (use `select` instead)
- ❌ Don't compute expensive operations in non-memoized selectors

### **Actions**

- ✅ Use **past tense** (events that happened)
- ✅ Name describes **what happened**, not what to do
- ✅ Be specific: `userLoggedIn` not `login`
- ✅ Use domain language: `cartItemAdded` not `addToCart`
- ❌ Don't use imperative verbs (`setUser`, `updateCart`)
- ❌ Don't use `handle` prefix (that's for event handlers)

### **Consistency**

- ✅ Group related selectors together
- ✅ Export base selectors before memoized ones
- ✅ Keep action names aligned with reducer case names
- ✅ Use TypeScript for type-safe selectors and actions

---

## **Usage in Components**

```typescript
// ProductList.tsx
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import {
  selectAllProducts,
  selectIsLoadingProducts,
  selectSelectedCategory,
  fetchProducts,
  categorySelected,
} from './productsSlice'

export function ProductList() {
  const dispatch = useAppDispatch()

  // Selectors
  const products = useAppSelector(selectAllProducts)
  const isLoading = useAppSelector(selectIsLoadingProducts)
  const selectedCategory = useAppSelector(selectSelectedCategory)

  // Parameterized selector
  const inStockProducts = useAppSelector(selectInStockProducts)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleCategoryChange = (category: string) => {
    // Dispatch action (past tense)
    dispatch(categorySelected(category))
  }

  return (
    <div>
      {isLoading ? <Spinner /> : <ProductGrid products={products} />}
    </div>
  )
}
```

---

### **References**

- [Redux Style Guide](https://redux.js.org/style-guide/)
- [Redux Toolkit Best Practices](https://redux-toolkit.js.org/usage/usage-guide)
- [Reselect Documentation](https://github.com/reduxjs/reselect)
