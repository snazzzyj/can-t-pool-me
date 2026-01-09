# Data Access Layer Naming Conventions Guide

## Core Principles (S-I-D)

Names must be **Short**, **Intuitive**, and **Descriptive**:

- **Short** — Quick to type and remember
- **Intuitive** — Reads naturally, reflects data operations
- **Descriptive** — Clearly indicates data source, operation, and entity

```tsx
/* Bad */
const d = useQuery(['u'], getU) // Meaningless abbreviations
const isFetchable = hasPermission // Unnatural phrasing
const shouldQueryize = true // Made-up verb

/* Good */
const userData = useQuery(['user'], fetchUser)
const canFetchUser = hasPermission
const shouldRefetch = true
```

---

## Universal Naming Rules

### ❌ Never Use Contractions

```tsx
/* Bad */
const usrQry = useQuery(['user'], fetchUsr)
const invldCache = () => {}

/* Good */
const userQuery = useQuery(['user'], fetchUser)
const invalidateCache = () => {}
```

### ❌ Avoid Context Duplication

Remove redundant context that doesn't improve clarity:

```tsx
/* Bad - Hook context */
const useUserData = () => {
  const userQuery = useQuery(['user'], fetchUser) // Redundant "user"
  const invalidateUserQuery = () => {} // Redundant
}

/* Good */
const useUserData = () => {
  const query = useQuery(['user'], fetchUser)
  const invalidate = () => {}
}

/* Bad - Service context */
class UserService {
  fetchUser() {} // Redundant "User"
  updateUser() {} // Redundant
}

/* Good */
class UserService {
  fetch() {}
  update() {}
}
```

### ✅ Reflect Expected Result

Name variables based on their actual state or value:

```tsx
/* Bad */
const isNotLoading = !query.isLoading
const hasNoError = query.error === null

/* Good */
const isReady = !query.isLoading
const isSuccess = query.error === null

/* Bad */
const shouldNotRefetch = isStale === false

/* Good */
const shouldUseCache = isStale === false
```

---

## Prefixes for Data Access Logic

### **`is`** — Current State or Characteristic

Describes the current state of a data operation (usually `boolean`):

```tsx
const isLoading = query.status === 'loading'
const isFetching = query.isFetching
const isStale = query.isStale
const isSuccess = query.status === 'success'
const isError = query.status === 'error'
const isPending = mutation.isPending
const isInvalidated = queryState.isInvalidated
const isCached = queryClient.getQueryData(key) !== undefined
```

### **`has`** — Possession or Presence

Indicates the presence of data, errors, or capabilities:

```tsx
const hasData = query.data !== undefined
const hasError = query.error !== null
const hasNextPage = infiniteQuery.hasNextPage
const hasPreviousPage = infiniteQuery.hasPreviousPage
const hasCachedData = !!queryClient.getQueryData(key)
const hasActiveQueries = queryClient.isFetching() > 0
const hasPendingMutations = mutationCache.getAll().length > 0
```

### **`should`** — Conditional Action

Represents a positive conditional for data operations:

```tsx
const shouldRefetch = isStale && isOnline
const shouldRetry = failureCount < maxRetries
const shouldInvalidate = mutationSuccess && affectsQuery
const shouldPrefetch = isHovering && !isCached
const shouldBatch = requestCount > batchThreshold
const shouldUseCache = cacheAge < staleTime
const shouldPoll = isActive && hasSubscription
```

### **`can`** — Permission or Capability

Indicates whether a data operation is possible:

```tsx
const canRefetch = !isLoading && isOnline
const canRetry = failureCount < maxRetries && !isAborted
const canMutate = !isPending && hasValidData
const canPrefetch = !isFetching && hasQueryKey
const canInvalidate = hasCachedData && !isInvalidating
const canFetchMore = hasNextPage && !isFetchingNextPage
const canAbort = isLoading && hasAbortController
```

### **`will`** — Future State Prediction

Indicates an upcoming data operation (use sparingly):

```tsx
const willRefetch = shouldRefetch && !isRefetching
const willInvalidate = shouldInvalidate && !isInvalidating
const willRetry = shouldRetry && retryDelay > 0
```

---

## Data Access Action Verbs

| Action            | Usage                            | Example                                      |
| ----------------- | -------------------------------- | -------------------------------------------- |
| **`fetch`**       | Retrieve data from remote source | `fetchUser()`, `fetchPosts()`                |
| **`prefetch`**    | Load data before needed          | `prefetchUser()`, `prefetchNextPage()`       |
| **`refetch`**     | Re-retrieve current data         | `refetchUser()`, `refetchQueries()`          |
| **`mutate`**      | Modify remote data               | `mutateUser()`, `mutateAsync()`              |
| **`invalidate`**  | Mark cache as stale              | `invalidateUser()`, `invalidateQueries()`    |
| **`update`**      | Modify existing data             | `updateUser()`, `updateCache()`              |
| **`create`**      | Create new data                  | `createUser()`, `createPost()`               |
| **`delete`**      | Remove data permanently          | `deleteUser()`, `deletePost()`               |
| **`remove`**      | Remove from collection/cache     | `removeQuery()`, `removeFromCache()`         |
| **`reset`**       | Return to initial state          | `resetQuery()`, `resetMutation()`            |
| **`cancel`**      | Abort ongoing operation          | `cancelQuery()`, `cancelRequest()`           |
| **`abort`**       | Stop operation immediately       | `abortFetch()`, `abortController()`          |
| **`sync`**        | Synchronize with remote          | `syncData()`, `syncCache()`                  |
| **`batch`**       | Combine multiple operations      | `batchFetch()`, `batchUpdate()`              |
| **`normalize`**   | Transform to standard format     | `normalizeUser()`, `normalizeResponse()`     |
| **`denormalize`** | Transform from normalized        | `denormalizePost()`, `denormalizeCache()`    |
| **`subscribe`**   | Listen to real-time updates      | `subscribeToMessages()`, `subscribeToUser()` |
| **`unsubscribe`** | Stop listening to updates        | `unsubscribeFromMessages()`                  |
| **`poll`**        | Repeatedly fetch at interval     | `pollStatus()`, `pollUpdates()`              |
| **`retry`**       | Attempt operation again          | `retryFetch()`, `retryMutation()`            |
| **`rollback`**    | Revert to previous state         | `rollbackOptimistic()`, `rollbackMutation()` |

---

## Category-Specific Patterns

### 1. Query Management & Data Fetching

**Pattern:** `prefix? + action + entity + context?`

| Name                   | Prefix   | Action     | Entity  | Context   |
| ---------------------- | -------- | ---------- | ------- | --------- |
| `fetchUser`            | —        | `fetch`    | `User`  | —         |
| `fetchUserPosts`       | —        | `fetch`    | `User`  | `Posts`   |
| `prefetchNextPage`     | —        | `prefetch` | `Next`  | `Page`    |
| `refetchStaleQueries`  | —        | `refetch`  | `Stale` | `Queries` |
| `shouldRefetchOnFocus` | `should` | `Refetch`  | `On`    | `Focus`   |

```tsx
/* Query hooks */
const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })
}

/* Fetch functions */
const fetchUser = async (userId: string): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`)
  if (!response.ok) throw new Error('Failed to fetch user')
  return response.json()
}

const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  const response = await fetch(`/api/users/${userId}/posts`)
  return response.json()
}

/* Prefetch utilities */
const prefetchUser = (queryClient: QueryClient, userId: string) => {
  return queryClient.prefetchQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })
}
```

### 2. Mutation & Data Modification

**Pattern:** `action + entity + context?`

| Name                       | Action     | Entity       | Context   |
| -------------------------- | ---------- | ------------ | --------- |
| `createUser`               | `create`   | `User`       | —         |
| `updateUser`               | `update`   | `User`       | —         |
| `deletePost`               | `delete`   | `Post`       | —         |
| `mutateUserProfile`        | `mutate`   | `User`       | `Profile` |
| `rollbackOptimisticUpdate` | `rollback` | `Optimistic` | `Update`  |

```tsx
/* Mutation hooks */
const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

/* Mutation functions */
const createUser = async (userData: CreateUserInput): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  })
  return response.json()
}

const updateUser = async (userId: string, updates: Partial<User>): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  })
  return response.json()
}

const deletePost = async (postId: string): Promise<void> => {
  await fetch(`/api/posts/${postId}`, { method: 'DELETE' })
}
```

### 3. Cache Management & Invalidation

**Pattern:** `action + cache/query + entity?`

| Name                | Action       | Target    | Entity  |
| ------------------- | ------------ | --------- | ------- |
| `invalidateUser`    | `invalidate` | —         | `User`  |
| `invalidateQueries` | `invalidate` | `Queries` | —       |
| `updateUserCache`   | `update`     | `Cache`   | `User`  |
| `resetQueryCache`   | `reset`      | `Query`   | `Cache` |
| `removeQueryData`   | `remove`     | `Query`   | `Data`  |

```tsx
/* Cache invalidation */
const invalidateUser = (queryClient: QueryClient, userId: string) => {
  queryClient.invalidateQueries({ queryKey: ['user', userId] })
}

const invalidateUserQueries = (queryClient: QueryClient, userId: string) => {
  queryClient.invalidateQueries({ queryKey: ['user', userId] })
  queryClient.invalidateQueries({ queryKey: ['posts', userId] })
}

/* Cache updates */
const updateUserCache = (
  queryClient: QueryClient,
  userId: string,
  updates: Partial<User>
) => {
  queryClient.setQueryData(['user', userId], (old: User | undefined) =>
    old ? { ...old, ...updates } : undefined
  )
}

/* Cache removal */
const removeUserCache = (queryClient: QueryClient, userId: string) => {
  queryClient.removeQueries({ queryKey: ['user', userId] })
}

/* Cache reset */
const resetQueryCache = (queryClient: QueryClient) => {
  queryClient.clear()
}
```

### 4. Pagination & Infinite Loading

**Pattern:** `action + page/data + context?`

| Name                 | Action  | Target     | Context    |
| -------------------- | ------- | ---------- | ---------- |
| `fetchNextPage`      | `fetch` | `Next`     | `Page`     |
| `fetchPreviousPage`  | `fetch` | `Previous` | `Page`     |
| `hasNextPage`        | `has`   | `Next`     | `Page`     |
| `isFetchingNextPage` | `is`    | `Fetching` | `NextPage` |
| `getNextPageParam`   | `get`   | `NextPage` | `Param`    |

```tsx
/* Infinite query hooks */
const useInfiniteProducts = (filters: ProductFilters) => {
  return useInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam }) => fetchProductsPage(pageParam, filters),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
  })
}

/* Page fetching */
const fetchProductsPage = async (
  cursor: string | undefined,
  filters: ProductFilters
): Promise<ProductsPage> => {
  const params = new URLSearchParams({
    ...filters,
    ...(cursor && { cursor }),
  })
  const response = await fetch(`/api/products?${params}`)
  return response.json()
}

/* Page navigation */
const fetchNextPage = (infiniteQuery: UseInfiniteQueryResult) => {
  if (infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage) {
    infiniteQuery.fetchNextPage()
  }
}

const fetchPreviousPage = (infiniteQuery: UseInfiniteQueryResult) => {
  if (infiniteQuery.hasPreviousPage && !infiniteQuery.isFetchingPreviousPage) {
    infiniteQuery.fetchPreviousPage()
  }
}
```

### 5. Real-time Data Synchronization

**Pattern:** `action + subscription/sync + entity?`

| Name                  | Action        | Type        | Entity     |
| --------------------- | ------------- | ----------- | ---------- |
| `subscribeToMessages` | `subscribe`   | `To`        | `Messages` |
| `unsubscribeFromUser` | `unsubscribe` | `From`      | `User`     |
| `syncUserData`        | `sync`        | `User`      | `Data`     |
| `pollOrderStatus`     | `poll`        | `Order`     | `Status`   |
| `connectWebSocket`    | `connect`     | `WebSocket` | —          |

```tsx
/* WebSocket subscriptions */
const subscribeToMessages = (
  channelId: string,
  onMessage: (message: Message) => void
): (() => void) => {
  const ws = new WebSocket(`wss://api.example.com/channels/${channelId}`)

  ws.onmessage = (event) => {
    const message = JSON.parse(event.data)
    onMessage(message)
  }

  return () => ws.close()
}

const unsubscribeFromChannel = (ws: WebSocket) => {
  ws.close()
}

/* Polling */
const pollOrderStatus = (orderId: string, interval = 5000) => {
  return useQuery({
    queryKey: ['order', orderId, 'status'],
    queryFn: () => fetchOrderStatus(orderId),
    refetchInterval: interval,
  })
}

/* Sync utilities */
const syncCacheWithServer = async (
  queryClient: QueryClient,
  queryKey: QueryKey
) => {
  await queryClient.refetchQueries({ queryKey })
}
```

### 6. Request Optimization

**Pattern:** `action + request/batch + context?`

| Name                    | Action        | Type      | Context    |
| ----------------------- | ------------- | --------- | ---------- |
| `batchFetchUsers`       | `batch`       | `Fetch`   | `Users`    |
| `deduplicateRequest`    | `deduplicate` | `Request` | —          |
| `cancelPendingRequests` | `cancel`      | `Pending` | `Requests` |
| `abortFetch`            | `abort`       | `Fetch`   | —          |
| `retryFailedRequest`    | `retry`       | `Failed`  | `Request`  |

```tsx
/* Batching */
const batchFetchUsers = async (userIds: string[]): Promise<User[]> => {
  const response = await fetch('/api/users/batch', {
    method: 'POST',
    body: JSON.stringify({ ids: userIds }),
  })
  return response.json()
}

const createBatchedFetcher = <T,>(
  fetchFn: (ids: string[]) => Promise<T[]>,
  windowMs = 10
) => {
  let batch: string[] = []
  let timeoutId: NodeJS.Timeout | null = null

  return (id: string): Promise<T> => {
    return new Promise((resolve, reject) => {
      batch.push(id)

      if (!timeoutId) {
        timeoutId = setTimeout(async () => {
          const currentBatch = [...batch]
          batch = []
          timeoutId = null

          try {
            const results = await fetchFn(currentBatch)
            resolve(results[currentBatch.indexOf(id)])
          } catch (error) {
            reject(error)
          }
        }, windowMs)
      }
    })
  }
}

/* Request cancellation */
const cancelQuery = (queryClient: QueryClient, queryKey: QueryKey) => {
  queryClient.cancelQueries({ queryKey })
}

const abortFetch = (controller: AbortController) => {
  controller.abort()
}

/* Retry logic */
const retryFetch = async <T,>(
  fetchFn: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> => {
  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetchFn()
    } catch (error) {
      lastError = error as Error
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, attempt)))
      }
    }
  }

  throw lastError!
}
```

### 7. Data Transformation

**Pattern:** `action + entity + format?`

| Name                | Action        | Entity     | Format |
| ------------------- | ------------- | ---------- | ------ |
| `normalizeUser`     | `normalize`   | `User`     | —      |
| `denormalizePost`   | `denormalize` | `Post`     | —      |
| `transformResponse` | `transform`   | `Response` | —      |
| `parseUserData`     | `parse`       | `User`     | `Data` |
| `serializeQuery`    | `serialize`   | `Query`    | —      |

```tsx
/* Normalization */
const normalizeUser = (user: UserResponse): NormalizedUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    postIds: user.posts.map(p => p.id),
  }
}

const denormalizeUser = (
  userId: string,
  cache: NormalizedCache
): User | null => {
  const user = cache.users[userId]
  if (!user) return null

  return {
    ...user,
    posts: user.postIds.map(id => cache.posts[id]),
  }
}

/* Response transformation */
const transformUserResponse = (response: ApiResponse<User>): User => {
  return {
    id: response.data.id,
    name: response.data.attributes.name,
    email: response.data.attributes.email,
  }
}

/* Parsing */
const parseUserData = (raw: unknown): User => {
  // Validation and parsing logic
  return userSchema.parse(raw)
}

/* Serialization */
const serializeQueryParams = (params: QueryParams): string => {
  return new URLSearchParams(params).toString()
}
```

---

## TypeScript-Specific Conventions

### Type/Interface Naming

```tsx
/* Query/Mutation options - suffix with Options */
interface FetchUserOptions {
  includeDeleted?: boolean
  fields?: string[]
}

interface CreateUserOptions {
  sendWelcomeEmail?: boolean
}

/* Response types - suffix with Response */
interface UserResponse {
  data: User
  meta: ResponseMeta
}

interface PaginatedResponse<T> {
  data: T[]
  pagination: PaginationMeta
}

/* Query key types - suffix with Key or Keys */
type UserQueryKey = ['user', string]
type UsersQueryKey = ['users', UserFilters?]

/* Hook return types - suffix with Result or Return */
interface UseUserQueryResult {
  user: User | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/* Mutation input types - suffix with Input or Data */
interface CreateUserInput {
  name: string
  email: string
}

interface UpdateUserInput {
  name?: string
  email?: string
}

/* Cache types - suffix with Cache or State */
interface NormalizedCache {
  users: Record<string, User>
  posts: Record<string, Post>
}

interface QueryCacheState {
  queries: Map<string, QueryState>
  mutations: Map<string, MutationState>
}
```

### Generic Type Parameters

```tsx
/* Use descriptive names for data types */
type FetchFunction<TData> = () => Promise<TData>
type QueryResult<TData, TError = Error> = {
  data: TData | undefined
  error: TError | null
  isLoading: boolean
}

/* Multiple related types */
type MutationFunction<TData, TVariables> = (variables: TVariables) => Promise<TData>
type MutationResult<TData, TError, TVariables> = {
  mutate: (variables: TVariables) => void
  data: TData | undefined
  error: TError | null
}

/* Normalized data structures */
type NormalizedEntity<TEntity> = {
  byId: Record<string, TEntity>
  allIds: string[]
}

/* Cache operations */
type CacheUpdater<TData> = (oldData: TData | undefined) => TData | undefined
```

---

## Anti-Patterns to Avoid

### ❌ Ambiguous Action Names

```tsx
/* Bad - unclear what the function does */
const getData = () => {} // Get from where? What data?
const updateData = () => {} // Update what? Where?
const processUser = () => {} // Process how?

/* Good - specific action and entity */
const fetchUser = () => {}
const updateUserCache = () => {}
const normalizeUserResponse = () => {}
```

### ❌ Mixing Concerns in Names

```tsx
/* Bad - mixing data access with business logic */
const fetchAndCalculateUserDiscount = () => {} // Two concerns
const getUserWithFormattedName = () => {} // Data + presentation
const updateUserAndShowToast = () => {} // Data + UI

/* Good - single responsibility */
const fetchUser = () => {}
const calculateUserDiscount = () => {} // Business logic layer
const formatUserName = () => {} // Presentation layer
```

### ❌ Inconsistent Verb Usage

```tsx
/* Bad - mixing get/fetch inconsistently */
const getUser = () => fetch('/api/users/1')
const fetchPosts = () => fetch('/api/posts')
const retrieveComments = () => fetch('/api/comments')

/* Good - consistent verb choice */
const fetchUser = () => fetch('/api/users/1')
const fetchPosts = () => fetch('/api/posts')
const fetchComments = () => fetch('/api/comments')
```

### ❌ Unclear Query/Mutation Distinction

```tsx
/* Bad - unclear if read or write operation */
const useUserData = () => {} // Query or mutation?
const handleUser = () => {} // What action?
const userOperation = () => {} // Too generic

/* Good - clear operation type */
const useUserQuery = () => {} // Read operation
const useUpdateUser = () => {} // Write operation
const useCreateUser = () => {} // Create operation
```

### ❌ Overly Generic Hook Names

```tsx
/* Bad - too generic */
const useData = () => {}
const useFetch = () => {}
const useApi = () => {}

/* Good - specific entity and operation */
const useUserQuery = () => {}
const useFetchProducts = () => {}
const useApiClient = () => {}
```

### ❌ Confusing Boolean Names

```tsx
/* Bad - unclear meaning */
const loading = true // Is it loading or should load?
const fetched = false // Has it fetched or should fetch?
const cached = true // Is it cached or should cache?

/* Good - clear state indication */
const isLoading = true
const hasFetched = false
const isCached = true
const shouldRefetch = false
```

### ❌ Mixing Tenses

```tsx
/* Bad - inconsistent tenses */
const fetchedUser = () => {} // Past tense
const fetchingPosts = () => {} // Present continuous
const willFetchComments = () => {} // Future tense

/* Good - consistent present tense */
const fetchUser = () => {}
const fetchPosts = () => {}
const fetchComments = () => {}
```

### ❌ Redundant Suffixes/Prefixes

```tsx
/* Bad - redundant naming */
const fetchUserData = () => {} // "Data" is implied
const getUserInfo = () => {} // "Info" is vague
const queryUserQuery = () => {} // "Query" repeated
const mutationUpdateMutation = () => {} // "Mutation" repeated

/* Good - concise and clear */
const fetchUser = () => {}
const getUser = () => {}
const useUserQuery = () => {}
const useUpdateUser = () => {}
```

---

## Practical Examples by Category

### Query Hooks

```tsx
/* Basic query */
const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })
}

/* Query with options */
const useUsersQuery = (filters?: UserFilters) => {
  return useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
    enabled: !!filters,
  })
}

/* Dependent query */
const useUserPostsQuery = (userId: string) => {
  const userQuery = useUserQuery(userId)

  return useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userQuery.data,
  })
}
```

### Mutation Hooks

```tsx
/* Create mutation */
const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

/* Update mutation with optimistic update */
const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, updates }: UpdateUserParams) =>
      updateUser(userId, updates),
    onMutate: async ({ userId, updates }) => {
      await queryClient.cancelQueries({ queryKey: ['user', userId] })
      const previousUser = queryClient.getQueryData(['user', userId])

      queryClient.setQueryData(['user', userId], (old: User) => ({
        ...old,
        ...updates,
      }))

      return { previousUser }
    },
    onError: (err, { userId }, context) => {
      queryClient.setQueryData(['user', userId], context?.previousUser)
    },
    onSettled: (data, error, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] })
    },
  })
}

/* Delete mutation */
const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (data, postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.removeQueries({ queryKey: ['post', postId] })
    },
  })
}
```

### Cache Management

```tsx
/* Cache utilities */
const useCacheManager = () => {
  const queryClient = useQueryClient()

  const invalidateUser = useCallback((userId: string) => {
    queryClient.invalidateQueries({ queryKey: ['user', userId] })
  }, [queryClient])

  const updateUserCache = useCallback((userId: string, updates: Partial<User>) => {
    queryClient.setQueryData(['user', userId], (old: User | undefined) =>
      old ? { ...old, ...updates } : undefined
    )
  }, [queryClient])

  const prefetchUser = useCallback(async (userId: string) => {
    await queryClient.prefetchQuery({
      queryKey: ['user', userId],
      queryFn: () => fetchUser(userId),
    })
  }, [queryClient])

  const removeUserCache = useCallback((userId: string) => {
    queryClient.removeQueries({ queryKey: ['user', userId] })
  }, [queryClient])

  return {
    invalidateUser,
    updateUserCache,
    prefetchUser,
    removeUserCache,
  }
}
```

### Infinite Queries

```tsx
/* Infinite scroll */
const useInfiniteProductsQuery = (filters: ProductFilters) => {
  return useInfiniteQuery({
    queryKey: ['products', 'infinite', filters],
    queryFn: ({ pageParam }) => fetchProductsPage(pageParam, filters),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.previousCursor,
    initialPageParam: undefined,
  })
}

/* Load more helper */
const useLoadMoreProducts = () => {
  const query = useInfiniteProductsQuery({})

  const loadMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage()
    }
  }, [query])

  const canLoadMore = query.hasNextPage && !query.isFetchingNextPage

  return { loadMore, canLoadMore }
}
```

---

## Quick Reference: A/HC/LC Pattern for Data Access

**Pattern:** `prefix? + action (A) + highContext (HC) + lowContext? (LC)`

| Name                    | Prefix   | Action       | High Context | Low Context |
| ----------------------- | -------- | ------------ | ------------ | ----------- |
| `fetchUser`             | —        | `fetch`      | `User`       | —           |
| `fetchUserPosts`        | —        | `fetch`      | `User`       | `Posts`     |
| `invalidateUserCache`   | —        | `invalidate` | `User`       | `Cache`     |
| `updateUserProfile`     | —        | `update`     | `User`       | `Profile`   |
| `prefetchNextPage`      | —        | `prefetch`   | `Next`       | `Page`      |
| `shouldRefetchOnFocus`  | `should` | `Refetch`    | `On`         | `Focus`     |
| `canFetchMore`          | `can`    | `Fetch`      | `More`       | —           |
| `isFetchingNextPage`    | `is`     | `Fetching`   | `Next`       | `Page`      |
| `hasNextPage`           | `has`    | `Next`       | `Page`       | —           |
| `subscribeToMessages`   | —        | `subscribe`  | `To`         | `Messages`  |
| `batchFetchUsers`       | —        | `batch`      | `Fetch`      | `Users`     |
| `normalizeUserResponse` | —        | `normalize`  | `User`       | `Response`  |

---

**Remember:** Data Access Layer naming should make data flow self-documenting. A developer should understand what data is being accessed, from where, and what operation is being performed—purely from reading the names. Keep data access concerns separate from business logic and presentation concerns.
