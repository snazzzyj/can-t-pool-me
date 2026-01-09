## Table of Contents

1. Core Principles
2. Types vs Interfaces
3. Naming Conventions
4. Single Responsibility Principle
5. Component Props
6. Data Modeling
7. Utility Types
8. Advanced Patterns

## Core Principles

### 1. **Prefer Type Composition Over Extension**

Build complex types from smaller, focused pieces.

```tsx
// ❌ Avoid: Monolithic interface
interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  role: 'admin' | 'user';
  permissions: string[];
  lastLogin: Date;
}

// ✅ Prefer: Composed types following SRP
type EntityTimestamps = {
  readonly createdAt: Date;
  readonly updatedAt: Date;
};

type UserIdentity = {
  readonly id: string;
  readonly email: string;
};

type UserProfile = {
  firstName: string;
  lastName: string;
};

type UserAuth = {
  readonly role: 'admin' | 'user';
  readonly permissions: ReadonlyArray<string>;
  readonly lastLogin: Date;
};

// Compose as needed
type User = UserIdentity & UserProfile & UserAuth & EntityTimestamps;

// Or create specific views
type PublicUser = UserIdentity & UserProfile;
type UserSession = UserIdentity & Pick<UserAuth, 'role' | 'permissions'>;

```

---

## Types vs Interfaces

### When to Use `type`

- **Union and intersection types**
- **Primitive aliases**
- **Tuple types**
- **Mapped types**
- **Conditional types**

```tsx
// ✅ Use type for unions
type Status = 'idle' | 'loading' | 'success' | 'error';

// ✅ Use type for intersections
type WithTimestamps<T> = T & EntityTimestamps;

// ✅ Use type for tuples
type Coordinates = readonly [number, number];

// ✅ Use type for mapped types
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

```

### When to Use `interface`

- **Object shapes that may be extended by consumers**
- **Public API contracts**
- **Declaration merging scenarios** (rare, but useful for libraries)

```tsx
// ✅ Use interface for extensible contracts
interface ApiResponse<T> {
  data: T;
  status: number;
}

// Consumers can extend
interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number;
    totalPages: number;
  };
}

```

### Default Recommendation

**Prefer `type` by default** for consistency and flexibility. Use `interface` only when you need declaration merging or want to signal extensibility.

---

## Naming Conventions

```tsx
// ✅ Types: PascalCase, descriptive nouns
type UserRole = 'admin' | 'user' | 'guest';
type ApiError = { message: string; code: string };

// ✅ Generic type parameters: Single uppercase letter or descriptive PascalCase
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
type AsyncData<TData, TError = Error> = {
  data: TData | null;
  error: TError | null;
  isLoading: boolean;
};

// ✅ Props: Component name + "Props" suffix
type ButtonProps = {
  variant: 'primary' | 'secondary';
  onClick: () => void;
};

// ✅ Event handlers: "on" + EventName
type FormEvents = {
  onSubmit: (data: FormData) => void;
  onValidationError: (errors: ValidationError[]) => void;
};

// ✅ Discriminated unions: Use "type" or "kind" as discriminator
type Action =
  | { type: 'INCREMENT'; payload: number }
  | { type: 'DECREMENT'; payload: number }
  | { type: 'RESET' };

// ❌ Avoid: Hungarian notation, prefixes like "I" or "T"
type IUser = {}; // Don't do this
type TUser = {}; // Don't do this

```

---

## Single Responsibility Principle

### Split Types by Concern

```tsx
// ❌ Avoid: Type doing too much
type ProductCardProps = {
  // Display concerns
  id: string;
  name: string;
  price: number;
  imageUrl: string;

  // Interaction concerns
  onAddToCart: (id: string) => void;
  onViewDetails: (id: string) => void;

  // State concerns
  isInCart: boolean;
  isFavorite: boolean;

  // Style concerns
  variant: 'compact' | 'detailed';
  className?: string;
};

// ✅ Prefer: Separated concerns
type ProductData = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly imageUrl: string;
};

type ProductActions = {
  onAddToCart: (id: string) => void;
  onViewDetails: (id: string) => void;
};

type ProductState = {
  readonly isInCart: boolean;
  readonly isFavorite: boolean;
};

type ProductCardVariant = {
  variant: 'compact' | 'detailed';
  className?: string;
};

// Compose for the component with
// nested structure for clarity
type ProductCardPropsAlt = {
  product: ProductData;
  state: ProductState;
  actions: ProductActions;
  variant: ProductCardVariant;
};

```

### Domain-Driven Type Organization

```tsx
// ✅ Group related types by domain
// user.types.ts
export type UserId = string & { readonly __brand: 'UserId' };

export type UserRole = 'admin' | 'user' | 'guest';

export type UserProfile = {
  readonly id: UserId;
  readonly email: string;
  firstName: string;
  lastName: string;
};

export type UserPreferences = {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
};

// product.types.ts
export type ProductId = string & { readonly __brand: 'ProductId' };

export type ProductPrice = {
  readonly amount: number;
  readonly currency: string;
};

export type Product = {
  readonly id: ProductId;
  readonly name: string;
  readonly price: ProductPrice;
};

```

---

## Component Props

### Props Structure Best Practices

```tsx
// ✅ Separate data, callbacks, and configuration
type UserAvatarProps = {
  // Data (readonly when possible)
  readonly user: {
    readonly name: string;
    readonly avatarUrl?: string;
  };

  // Configuration
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'square';

  // Callbacks (always optional with clear names)
  onClick?: (userId: string) => void;

  // Style overrides (always optional)
  className?: string;
  style?: React.CSSProperties;
};

// ✅ Use discriminated unions for variant props
type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & (
  | { variant: 'primary'; onClick: () => void }
  | { variant: 'link'; href: string }
  | { variant: 'submit'; form: string }
);

// ✅ Extract common patterns
type WithClassName = {
  className?: string;
};

type WithTestId = {
  'data-testid'?: string;
};

type BaseComponentProps = WithClassName & WithTestId;

// ✅ Make children explicit
type ContainerProps = BaseComponentProps & {
  children: React.ReactNode;
  as?: 'div' | 'section' | 'article';
};

// ✅ Polymorphic component pattern
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'children'>;

type BoxProps<E extends React.ElementType = 'div'> = PolymorphicProps<E>;

const Box = <E extends React.ElementType = 'div'>({
  as,
  children,
  ...props
}: BoxProps<E>) => {
  const Component = as || 'div';
  return <Component {...props}>{children}</Component>;
};

```

### Props Extraction Patterns

```tsx
// ✅ Extract reusable prop patterns
type LoadingState = {
  isLoading: boolean;
  loadingText?: string;
};

type ErrorState = {
  error: Error | null;
  onRetry?: () => void;
};

type AsyncComponentState = LoadingState & ErrorState;

// ✅ Use for consistent async components
type DataTableProps<T> = AsyncComponentState & {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (row: T) => void;
};

// ✅ Conditional props based on state
type FormFieldProps = {
  label: string;
  name: string;
} & (
  | { type: 'text'; maxLength?: number }
  | { type: 'number'; min?: number; max?: number }
  | { type: 'select'; options: readonly string[] }
);

```

---

## Data Modeling

### Immutability by Default

```tsx
// ✅ Use readonly for data that shouldn't change
type Config = {
  readonly apiUrl: string;
  readonly timeout: number;
  readonly retries: number;
};

// ✅ Use ReadonlyArray for arrays
type TodoList = {
  readonly items: ReadonlyArray<Todo>;
  readonly filter: 'all' | 'active' | 'completed';
};

// ✅ Deep readonly for nested structures
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

type AppState = DeepReadonly<{
  user: UserProfile;
  settings: UserPreferences;
  cache: Record<string, unknown>;
}>;

```

### Branded Types for Type Safety

```tsx
// ✅ Prevent mixing of similar primitive types
type UserId = string & { readonly __brand: 'UserId' };
type ProductId = string & { readonly __brand: 'ProductId' };
type Email = string & { readonly __brand: 'Email' };

// Helper to create branded types
const createUserId = (id: string): UserId => id as UserId;
const createEmail = (email: string): Email => {
  if (!email.includes('@')) throw new Error('Invalid email');
  return email as Email;
};

// ✅ Type-safe at compile time
const getUserById = (id: UserId) => { /* ... */ };
const productId: ProductId = 'prod_123' as ProductId;

// getUserById(productId); // ❌ Type error!

```

### Result Types for Error Handling

```tsx
// ✅ Explicit success/failure modeling
type Result<T, E = Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

// Usage
const parseUser = (data: unknown): Result<User, ValidationError> => {
  try {
    // validation logic
    return { ok: true, value: validatedUser };
  } catch (error) {
    return { ok: false, error: error as ValidationError };
  }
};

// ✅ Pattern matching with type narrowing
const result = parseUser(data);
if (result.ok) {
  console.log(result.value.email); // Type-safe access
} else {
  console.error(result.error.message);
}

// ✅ Option type for nullable values
type Option<T> =
  | { readonly some: true; readonly value: T }
  | { readonly some: false };

const findUser = (id: string): Option<User> => {
  const user = users.find(u => u.id === id);
  return user
    ? { some: true, value: user }
    : { some: false };
};

```

### State Machine Types

```tsx
// ✅ Model state machines with discriminated unions
type FetchState<T, E = Error> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: E };

// ✅ Impossible states are impossible
type AuthState =
  | { status: 'unauthenticated' }
  | { status: 'authenticating' }
  | { status: 'authenticated'; user: User; token: string }
  | { status: 'error'; error: AuthError };

// ❌ Avoid: Boolean soup
type BadAuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: Error | null;
  // Can represent impossible states like:
  // isAuthenticated=true, user=null
  // isLoading=true, error=Error
};

```

---

## Utility Types

### Custom Utility Types

```tsx
// ✅ Make specific fields optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type User = {
  id: string;
  email: string;
  name: string;
};

type UserUpdate = PartialBy<User, 'name' | 'email'>; // id required, others optional

// ✅ Make specific fields required
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// ✅ Nullable fields
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// ✅ Extract function parameter types
type ExtractParams<T> = T extends (...args: infer P) => any ? P : never;

type MyFunc = (a: string, b: number) => void;
type Params = ExtractParams<MyFunc>; // [string, number]

// ✅ Extract async return type
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type AsyncFunc = () => Promise<User>;
type SyncReturn = UnwrapPromise<ReturnType<AsyncFunc>>; // User

// ✅ Non-nullable deep
type NonNullableDeep<T> = {
  [K in keyof T]: NonNullable<T[K]> extends object
    ? NonNullableDeep<NonNullable<T[K]>>
    : NonNullable<T[K]>;
};

// ✅ Exact type (no excess properties)
type Exact<T, Shape> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : never
  : never;

```

### React-Specific Utilities

```tsx
// ✅ Extract component props
type ButtonElement = React.ComponentPropsWithoutRef<'button'>;
type DivElement = React.ComponentPropsWithoutRef<'div'>;

// ✅ Merge component props with custom props
type CustomButtonProps = ButtonElement & {
  variant: 'primary' | 'secondary';
  isLoading?: boolean;
};

// ✅ Polymorphic component helper
type PropsWithAs<E extends React.ElementType, P = {}> = P &
  Omit<React.ComponentPropsWithoutRef<E>, keyof P> & {
    as?: E;
  };

// ✅ Forward ref component type
type ForwardRefComponent<T, P = {}> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

// ✅ Children utilities
type WithChildren<T = {}> = T & { children: React.ReactNode };
type WithOptionalChildren<T = {}> = T & { children?: React.ReactNode };
type WithRenderProp<T, P = {}> = P & { children: (props: T) => React.ReactNode };

```

---

## Advanced Patterns

### Template Literal Types

```tsx
// ✅ Type-safe CSS properties
type CSSUnit = 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw';
type CSSValue = `${number}${CSSUnit}`;

type SpacingProps = {
  margin?: CSSValue;
  padding?: CSSValue;
};

// ✅ Event handler naming
type EventName = 'click' | 'focus' | 'blur' | 'change';
type EventHandler = `on${Capitalize<EventName>}`;

type EventHandlers = {
  [K in EventHandler]?: () => void;
};
// Results in: onClick?, onFocus?, onBlur?, onChange?

// ✅ API endpoint types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = `/api/${string}`;
type ApiRoute = `${HttpMethod} ${Endpoint}`;

const route: ApiRoute = 'GET /api/users'; // ✅
// const invalid: ApiRoute = 'INVALID /api/users'; // ❌ Type error

```

### Conditional Types

```tsx
// ✅ Type-safe form field values
type FieldValue<T extends string> =
  T extends 'email' ? Email :
  T extends 'age' ? number :
  T extends 'isActive' ? boolean :
  string;

type FormField<T extends string> = {
  name: T;
  value: FieldValue<T>;
};

const emailField: FormField<'email'> = {
  name: 'email',
  value: 'test@example.com' as Email, // Must be Email type
};

// ✅ Extract specific property types
type ExtractByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type User = {
  id: string;
  name: string;
  age: number;
  isActive: boolean;
};

type StringFields = ExtractByType<User, string>; // { id: string; name: string }
type NumberFields = ExtractByType<User, number>; // { age: number }

```

### Recursive Types

```tsx
// ✅ Nested menu structure
type MenuItem = {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly children?: ReadonlyArray<MenuItem>;
};

// ✅ JSON type
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

type JSONObject = { [key: string]: JSONValue };

// ✅ Deep partial
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

// ✅ Path type for nested objects
type PathImpl<T, K extends keyof T> =
  K extends string
    ? T[K] extends Record<string, any>
      ? K | `${K}.${PathImpl<T[K], keyof T[K]> & string}`
      : K
    : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

type User = {
  profile: {
    name: string;
    address: {
      city: string;
    };
  };
};

type UserPath = Path<User>;
// 'profile' | 'profile.name' | 'profile.address' | 'profile.address.city'

```

### Variance and Covariance

```tsx
// ✅ Covariant (read-only) positions
type ReadOnlyBox<out T> = {
  readonly value: T;
  get: () => T;
};

// ✅ Contravariant (write-only) positions
type WriteOnlyBox<in T> = {
  set: (value: T) => void;
};

// ✅ Invariant (read-write) positions
type Box<T> = {
  value: T;
  get: () => T;
  set: (value: T) => void;
};

// ✅ Practical example: Event handlers
type EventHandler<in T> = (event: T) => void;

// More specific handlers can be assigned to less specific
const handleMouseEvent: EventHandler<MouseEvent> = (e) => {};
const handleEvent: EventHandler<Event> = handleMouseEvent; // ✅ OK

```

---

## File Organization

```tsx
// ✅ Recommended structure

// types/
//   ├── common.types.ts          # Shared utility types
//   ├── api.types.ts             # API-related types
//   ├── domain/
//   │   ├── user.types.ts        # User domain types
//   │   ├── product.types.ts     # Product domain types
//   │   └── order.types.ts       # Order domain types
//   └── components/
//       ├── button.types.ts      # Button component types
//       └── form.types.ts        # Form component types

// common.types.ts
export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export type AsyncData<T, E = Error> = {
  data: T | null;
  error: E | null;
  isLoading: boolean;
};

// user.types.ts
import type { EntityTimestamps } from '../common.types';

export type UserId = string & { readonly __brand: 'UserId' };

export type UserProfile = {
  readonly id: UserId;
  readonly email: string;
  firstName: string;
  lastName: string;
} & EntityTimestamps;

// button.types.ts
import type { WithClassName } from '../common.types';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = WithClassName & {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

```

---

## Testing Types

```tsx
// ✅ Use type assertions in tests
import { expectType, expectError } from 'tsd';

// Type should match exactly
expectType<User>({ id: '1', email: 'test@example.com', name: 'Test' });

// Should produce type error
expectError<User>({ id: 1, email: 'test@example.com' });

// ✅ Test utility types
type TestPartialBy = PartialBy<User, 'email'>;
expectType<TestPartialBy>({ id: '1', name: 'Test' }); // email optional

// ✅ Mock types for testing
type MockUser = {
  -readonly [K in keyof User]: User[K];
};

const createMockUser = (): MockUser => ({
  id: 'test-id' as UserId,
  email: 'test@example.com',
  name: 'Test User',
  createdAt: new Date(),
});

```

---

## Common Pitfalls to Avoid

```tsx
// ❌ Don't use any
const processData = (data: any) => {}; // Loses all type safety

// ✅ Use unknown and narrow
const processData = (data: unknown) => {
  if (typeof data === 'string') {
    return data.toUpperCase(); // Type-safe
  }
};

// ❌ Don't use non-null assertion carelessly
const user = users.find(u => u.id === id)!; // Might crash

// ✅ Handle null cases explicitly
const user = users.find(u => u.id === id);
if (!user) throw new Error('User not found');

// ❌ Don't create overly complex types
type ComplexType<T, U, V, W> = T extends U ? V extends W ? ... // Hard to understand

// ✅ Break down into smaller, named types
type IsExtending<T, U> = T extends U ? true : false;
type ConditionalType<V, W> = V extends W ? V : W;

// ❌ Don't use enums (prefer union types)
enum Status { Idle, Loading, Success } // Runtime overhead

// ✅ Use const objects or union types
const Status = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
} as const;

type Status = typeof Status[keyof typeof Status];

// ❌ Don't make everything optional
type BadUser = {
  id?: string;
  email?: string;
  name?: string;
};

// ✅ Be explicit about what's required
type User = {
  readonly id: string;
  readonly email: string;
  name: string;
};

type PartialUser = Partial<User>;

```

---

## Summary Checklist

- [ ] Use `type` by default, `interface` for extensibility
- [ ] Apply SRP: one type, one responsibility
- [ ] Prefer composition over extension
- [ ] Make data `readonly` by default
- [ ] Use discriminated unions for state machines
- [ ] Brand primitive types for domain modeling
- [ ] Extract reusable prop patterns
- [ ] Use utility types to transform types
- [ ] Organize types by domain, not by kind
- [ ] Avoid `any`, prefer `unknown`
- [ ] Model errors explicitly with Result types
- [ ] Use template literals for type-safe strings
- [ ] Test your types with `tsd` or similar tools
