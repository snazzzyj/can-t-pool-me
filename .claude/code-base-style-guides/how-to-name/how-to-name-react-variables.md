# Naming React Variables

## **Type/Scope/Context Pattern**

A systematic pattern for naming React variables:

```typescript
prefix? + type indicator? + high context (HC) + low context? (LC) + suffix?
```

Example applications of this pattern:

| **Name**                 | **Prefix** | **Type**   | **High context (HC)** | **Low context (LC)** | **Suffix** |
| ------------------------ | ---------- | ---------- | --------------------- | -------------------- | ---------- |
| `user`                   |            |            | `User`                |                      |            |
| `isLoading`              | `is`       | boolean    | `Loading`             |                      |            |
| `hasUserPermission`      | `has`      | boolean    | `User`                | `Permission`         |            |
| `userCount`              |            | number     | `User`                |                      | `Count`    |
| `activeUserId`           |            | identifier | `Active` + `User`     |                      | `Id`       |
| `onUserClick`            | `on`       | handler    | `User`                | `Click`              |            |
| `handleUserSubmit`       |            | handler    | `User`                | `Submit`             |            |
| `UserList`               |            | component  | `User`                | `List`               |            |
| `userListRef`            |            | ref        | `User` + `List`       |                      | `Ref`      |
| `previousUserState`      | `previous` | state      | `User`                | `State`              |            |
| `MAXIMUM_RETRY_ATTEMPTS` |            | constant   | `Maximum` + `Retry`   | `Attempts`           |            |

> **Note:** Context ordering creates semantic meaning. `userActiveStatus` suggests a status belonging to a user, while `activeUserStatus` emphasizes the active state as the primary qualifier.

---

## **Boolean Variables**

Variables representing true/false states, typically used for conditional rendering or logic flow.

### **`is`**

Describes a current state or condition. Most common boolean prefix.

```tsx
const [isOpen, setIsOpen] = useState(false)
const [isLoading, setIsLoading] = useState(true)
const [isAuthenticated, setIsAuthenticated] = useState(false)

// Usage in JSX
{isLoading && <Spinner />}
{isAuthenticated ? <Dashboard /> : <Login />}
```

### **`has`**

Indicates possession or presence of something.

```tsx
const [hasError, setHasError] = useState(false)
const [hasPermission, setHasPermission] = useState(false)
const hasChildren = React.Children.count(children) > 0

// Usage
{hasError && <ErrorMessage />}
{hasPermission && <AdminPanel />}
```

### **`should`**

Expresses intention or conditional logic for future actions.

```tsx
const shouldFetchData = isAuthenticated && !data
const shouldShowModal = isOpen && hasContent
const [shouldAutoSave, setShouldAutoSave] = useState(true)

// Usage
useEffect(() => {
  if (shouldFetchData) {
    fetchUserData()
  }
}, [shouldFetchData])
```

### **`can`**

Indicates capability or permission to perform an action.

```tsx
const canEdit = user.role === 'admin' || user.id === post.authorId
const canSubmit = isValid && !isSubmitting
const [canUndo, setCanUndo] = useState(false)

// Usage
<Button disabled={!canSubmit}>Submit</Button>
```

### **`will`**

Describes a future state or planned action (use sparingly).

```tsx
const willRedirect = !isAuthenticated && isProtectedRoute
const willExpire = expiryDate < Date.now() + ONE_DAY

// Usage in effects
useEffect(() => {
  if (willExpire) {
    showExpiryWarning()
  }
}, [willExpire])
```

---

## **State Variables**

Variables managed by React's state system.

### **Plain State**

Direct, descriptive names for state values without prefixes.

```tsx
const [user, setUser] = useState<User | null>(null)
const [count, setCount] = useState(0)
const [filters, setFilters] = useState<Filter[]>([])
const [selectedId, setSelectedId] = useState<string>()

// Clear, semantic naming
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
```

### **Complex State Objects**

Use singular names for objects, plural for arrays.

```tsx
// Objects - singular
const [formData, setFormData] = useState<FormData>({})
const [userProfile, setUserProfile] = useState<Profile | null>(null)
const [configuration, setConfiguration] = useState<Config>(defaultConfig)

// Arrays - plural
const [users, setUsers] = useState<User[]>([])
const [messages, setMessages] = useState<Message[]>([])
const [selectedItems, setSelectedItems] = useState<string[]>([])
```

### **Derived State**

State computed from other state (consider if truly needed).

```tsx
// Prefer computed values over derived state
const filteredUsers = users.filter(user => user.isActive)
const totalPrice = items.reduce((sum, item) => sum + item.price, 0)
const hasSelectedItems = selectedItems.length > 0

// Only use derived state when memoization is needed
const expensiveComputation = useMemo(
  () => complexCalculation(data),
  [data]
)
```

---

## **Event Handlers**

Functions that respond to user interactions or system events.

### **`handle`&#32;prefix**

Standard convention for event handler functions defined in components.

```tsx
function UserForm() {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // Submit logic
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleUserDelete = (userId: string) => {
    deleteUser(userId)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <button onClick={() => handleUserDelete(user.id)}>Delete</button>
    </form>
  )
}
```

### **`on`&#32;prefix**

Used for handler props passed to child components (callback interface).

```tsx
interface UserCardProps {
  user: User
  onEdit: (user: User) => void
  onClick: () => void
  onDelete: (userId: string) => void
}

function UserCard({ user, onEdit, onClick, onDelete }: UserCardProps) {
  return (
    <div onClick={onClick}>
      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  )
}

// Usage
<UserCard
  user={user}
  onEdit={handleUserEdit}
  onClick={handleCardClick}
  onDelete={handleUserDelete}
/>
```

> **Pattern:** Components define internal handlers with `handle`, expose callback props with `on`.

---

## **Refs**

References to DOM elements or mutable values that persist across renders.

### **`Ref`&#32;suffix**

Clearly identifies ref variables.

```tsx
const inputRef = useRef<HTMLInputElement>(null)
const containerRef = useRef<HTMLDivElement>(null)
const previousValueRef = useRef<string>()
const timeoutRef = useRef<NodeJS.Timeout>()

// Usage
useEffect(() => {
  inputRef.current?.focus()
}, [])

// Forwarded refs
const ForwardedInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <input ref={ref} {...props} />
)
```

### **Callback Refs**

Functions used as refs (less common pattern).

```tsx
const [node, setNode] = useState<HTMLElement | null>(null)

const measureRef = useCallback((node: HTMLDivElement | null) => {
  if (node) {
    const { width, height } = node.getBoundingClientRect()
    setDimensions({ width, height })
  }
}, [])

return <div ref={measureRef}>Content</div>
```

---

## **Constants**

Immutable values defined outside component scope or as configuration.

### **`SCREAMING_SNAKE_CASE`**

For true constants (configuration, magic numbers, enums).

```tsx
const MAXIMUM_RETRY_ATTEMPTS = 3
const DEFAULT_PAGE_SIZE = 20
const API_BASE_URL = 'https://api.example.com'
const ANIMATION_DURATION_MS = 300

const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const

const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
} as const
```

### **`camelCase`&#32;constants**

For configuration objects or complex constants.

```tsx
const defaultFormValues = {
  email: '',
  password: '',
  rememberMe: false,
}

const validationRules = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: { minLength: 8, requireSpecialChar: true },
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: true } },
}
```

---

## **Collections**

Arrays, Sets, Maps, and other data structures.

### **Plural Names**

Arrays and array-like collections use plural forms.

```tsx
const [users, setUsers] = useState<User[]>([])
const [messages, setMessages] = useState<Message[]>([])
const activeUsers = users.filter(u => u.isActive)
const userIds = users.map(u => u.id)

// Specific collection types
const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
const [userMap, setUserMap] = useState<Map<string, User>>(new Map())
```

### **Count/Length Suffixes**

For numeric quantities derived from collections.

```tsx
const userCount = users.length
const activeUserCount = users.filter(u => u.isActive).length
const totalMessageCount = messages.reduce((sum, m) => sum + m.count, 0)

// In state
const [itemCount, setItemCount] = useState(0)
const [pageCount, setPageCount] = useState(1)
```

### **Index Variables**

For iteration and position tracking.

```tsx
// Loop indices
items.map((item, itemIndex) => (
  <Item key={item.id} index={itemIndex} />
))

// State for tracking position
const [currentIndex, setCurrentIndex] = useState(0)
const [activeTabIndex, setActiveTabIndex] = useState(0)
const [selectedIndex, setSelectedIndex] = useState<number>()
```

---

## **Async & Loading States**

Variables related to asynchronous operations.

### **Loading States**

```tsx
const [isLoading, setIsLoading] = useState(false)
const [isFetching, setIsFetching] = useState(false)
const [isSubmitting, setIsSubmitting] = useState(false)
const [isPending, setIsPending] = useState(false)

// Specific operation loading states
const [isUserLoading, setIsUserLoading] = useState(false)
const [isSaving, setIsSaving] = useState(false)
const [isDeleting, setIsDeleting] = useState(false)
```

### **Error States**

```tsx
const [error, setError] = useState<Error | null>(null)
const [errorMessage, setErrorMessage] = useState<string>()
const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])

// Boolean error flags
const [hasError, setHasError] = useState(false)
const [isError, setIsError] = useState(false)
```

### **Data States**

```tsx
const [data, setData] = useState<Data | null>(null)
const [response, setResponse] = useState<ApiResponse>()
const [result, setResult] = useState<Result>()

// Specific data naming
const [userData, setUserData] = useState<User | null>(null)
const [apiResponse, setApiResponse] = useState<Response>()
```

---

## **Temporal Variables**

Variables representing time-related or previous states.

### **`previous`&#32;prefix**

For tracking previous values (typically in refs or effects).

```tsx
const previousValue = usePrevious(value)
const previousCountRef = useRef<number>()

useEffect(() => {
  previousCountRef.current = count
}, [count])

const previousCount = previousCountRef.current
```

### **`initial`&#32;prefix**

For original or starting values.

```tsx
const initialValues = { email: '', password: '' }
const [formData, setFormData] = useState(initialValues)

const initialCount = 0
const [count, setCount] = useState(initialCount)

// Reset to initial
const handleReset = () => setFormData(initialValues)
```

### **Time-related suffixes**

```tsx
const [startTime, setStartTime] = useState<number>()
const [endTime, setEndTime] = useState<number>()
const [lastUpdated, setLastUpdated] = useState<Date>()
const [createdAt, setCreatedAt] = useState<Date>(new Date())
const [expiresAt, setExpiresAt] = useState<Date>()
```

---

## **Type Indicators**

Suffixes that clarify variable types or purposes.

### **`Id`&#32;/&#32;`Ids`&#32;suffix**

For identifier values.

```tsx
const [userId, setUserId] = useState<string>()
const [selectedId, setSelectedId] = useState<string>()
const [activeItemId, setActiveItemId] = useState<number>()
const [selectedIds, setSelectedIds] = useState<string[]>([])

// In props
interface UserCardProps {
  userId: string
  organizationId: string
}
```

### **`Key`&#32;suffix**

For object keys or unique identifiers (especially in maps).

```tsx
const [activeKey, setActiveKey] = useState<string>('tab1')
const cacheKey = `user-${userId}`
const storageKey = 'app-preferences'

// React keys
const itemKey = `item-${item.id}-${index}`
```

### **`List`&#32;suffix**

For arrays when clarity is needed (use sparingly).

```tsx
// Prefer plural: users over userList
const users = await fetchUsers()

// Use List suffix when plural is ambiguous
const [dataList, setDataList] = useState<Data[]>([])
const [itemList, setItemList] = useState<Item[]>([])

// Or when emphasizing it's a specific list structure
const [todoList, setTodoList] = useState<Todo[]>([])
```

### **`Map`&#32;/&#32;`Set`&#32;suffix**

For specific collection types.

```tsx
const [userMap, setUserMap] = useState<Map<string, User>>(new Map())
const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set())
const idToUserMap = new Map(users.map(u => [u.id, u]))
```

### **`Config`&#32;/&#32;`Options`&#32;suffix**

For configuration objects.

```tsx
const chartConfig = { responsive: true, maintainAspectRatio: false }
const fetchOptions = { method: 'POST', headers: { ... } }
const [userPreferences, setUserPreferences] = useState<Preferences>()

interface ComponentProps {
  config?: Config
  options?: Options
}
```

---

## **Component-Specific Variables**

Variables unique to React component patterns.

### **Props Destructuring**

Clear, semantic names matching the component's domain.

```tsx
interface UserProfileProps {
  user: User
  isEditable: boolean
  onSave: (user: User) => void
  className?: string
  children?: ReactNode
}

function UserProfile({
  user,
  isEditable,
  onSave,
  className,
  children
}: UserProfileProps) {
  // Implementation
}
```

### **Render Props**

Functions that return JSX, typically prefixed with `render`.

```tsx
interface DataProviderProps {
  renderLoading?: () => ReactNode
  renderError?: (error: Error) => ReactNode
  renderData: (data: Data) => ReactNode
}

// Usage
<DataProvider
  renderLoading={() => <Spinner />}
  renderError={(error) => <ErrorMessage error={error} />}
  renderData={(data) => <DataDisplay data={data} />}
/>
```

### **Children Variants**

Specific naming for different child content.

```tsx
interface ModalProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  actions?: ReactNode
}

interface LayoutProps {
  sidebar: ReactNode
  main: ReactNode
  aside?: ReactNode
}
```

---

## **Custom Hook Variables**

Variables returned from or used within custom hooks.

### **Hook Return Values**

Descriptive names for returned values and functions.

```tsx
// Tuple returns (array destructuring)
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)
  const toggle = () => setValue(v => !v)
  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)

  return [value, toggle, setTrue, setFalse] as const
}

const [isOpen, toggleOpen, open, close] = useToggle()

// Object returns (object destructuring)
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refetch = () => { /* ... */ }
  const update = (data: Partial<User>) => { /* ... */ }

  return { user, isLoading, error, refetch, update }
}

const { user, isLoading, error, refetch, update } = useUser(id)
```

### **Hook Internal State**

Clear naming for internal hook logic.

```tsx
function useDebounce<T>(value: T, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    return () => clearTimeout(timeoutRef.current)
  }, [value, delayMs])

  return debouncedValue
}
```

---

## **Context Variables**

Variables related to React Context API.

### **Context Creation**

```tsx
// Context object - typically suffixed with Context
const UserContext = createContext<UserContextValue | undefined>(undefined)
const ThemeContext = createContext<ThemeContextValue>(defaultTheme)
const AuthContext = createContext<AuthContextValue | null>(null)

// Context value type
interface UserContextValue {
  user: User | null
  login: (credentials: Credentials) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}
```

### **Context Provider**

```tsx
// Provider component - typically suffixed with Provider
function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const contextValue: UserContextValue = {
    user,
    login,
    logout,
    isAuthenticated,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}
```

### **Context Consumer Hook**

```tsx
// Custom hook for consuming context
function useUser() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider')
  }

  return context
}

// Usage
const { user, isAuthenticated, login, logout } = useUser()
```

---

## **Anti-Patterns to Avoid**

### **Avoid Redundant Prefixes**

```tsx
// ❌ Avoid
const [userState, setUserState] = useState<User>()
const userData = user // Redundant 'data'
const userVariable = getUser() // Redundant 'variable'

// ✅ Prefer
const [user, setUser] = useState<User>()
const currentUser = user
const activeUser = getUser()
```

### **Avoid Abbreviations**

```tsx
// ❌ Avoid
const usrMsg = getUserMessages()
const btnClk = () => {}
const isAuth = checkAuth()

// ✅ Prefer
const userMessages = getUserMessages()
const handleButtonClick = () => {}
const isAuthenticated = checkAuth()
```

### **Avoid Ambiguous Names**

```tsx
// ❌ Avoid
const data = fetchUsers() // What data?
const temp = user.name // Temporary what?
const flag = true // What flag?

// ✅ Prefer
const users = fetchUsers()
const previousName = user.name
const isVisible = true
```

### **Avoid Inconsistent Patterns**

```tsx
// ❌ Avoid mixing patterns
const handleClick = () => {}
const onHover = () => {} // Inconsistent with handleClick
const clickButton = () => {} // Inconsistent verb placement

// ✅ Prefer consistent patterns
const handleClick = () => {}
const handleHover = () => {}
const handleButtonClick = () => {}
```

---

## **Quick Reference**

| **Variable Type**        | **Pattern**                  | **Example**                       |
| ------------------------ | ---------------------------- | --------------------------------- |
| Boolean                  | `is/has/should/can/will`     | `isLoading`, `hasError`           |
| State                    | `noun` or `adjective + noun` | `user`, `selectedId`              |
| State setter             | `set + StateName`            | `setUser`, `setIsLoading`         |
| Event handler (internal) | `handle + Action + Context`  | `handleSubmit`, `handleUserClick` |
| Event handler (prop)     | `on + Action + Context`      | `onSubmit`, `onClick`             |
| Ref                      | `context + Ref`              | `inputRef`, `containerRef`        |
| Constant                 | `SCREAMING_SNAKE_CASE`       | `MAX_RETRIES`, `API_URL`          |
| Collection               | `plural noun`                | `users`, `messages`               |
| Count                    | `context + Count`            | `userCount`, `totalItems`         |
| ID                       | `context + Id`               | `userId`, `selectedId`            |
| Loading state            | `is + action + ing`          | `isLoading`, `isFetching`         |
| Error state              | `error` or `has/isError`     | `error`, `hasError`               |
| Previous value           | `previous + Context`         | `previousValue`, `previousCount`  |
| Initial value            | `initial + Context`          | `initialValues`, `initialState`   |

---

### References

- React Documentation: https://react.dev/
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- Naming Cheatsheet: https://github.com/kettanaito/naming-cheatsheet
