# Naming Compound Components

## **Pattern Structure**

Compound components follow a hierarchical naming pattern:

```typescript
namespace + semantic role + context?
```

The namespace groups related components, while semantic roles describe each component's purpose within the composition.

| **Name**         | **Namespace** | **Semantic Role** | **Context** |
| ---------------- | ------------- | ----------------- | ----------- |
| `Select.Root`    | `Select`      | `Root`            |             |
| `Select.Trigger` | `Select`      | `Trigger`         |             |
| `Select.Content` | `Select`      | `Content`         |             |
| `Select.Option`  | `Select`      | `Option`          |             |
| `Accordion.Item` | `Accordion`   | `Item`            |             |
| `Tabs.List`      | `Tabs`        | `List`            |             |
| `Tabs.Trigger`   | `Tabs`        | `Trigger`         |             |
| `Dialog.Overlay` | `Dialog`      | `Overlay`         |             |

## **Namespace**

The parent object that groups all related compound components. Should be a singular noun representing the complete UI pattern.

### **Naming Guidelines**

```tsx
// ✅ Good - Clear, singular nouns
const Select = { Root, Trigger, Content, Option }
const Accordion = { Root, Item, Trigger, Content }
const Tabs = { Root, List, Trigger, Panel }

// ❌ Avoid - Plural or overly generic names
const Selects = { ... }
const Component = { ... }
const UI = { ... }
```

## **Semantic Roles**

Component parts that describe their function within the composition. Use established UI terminology when possible.

### **`Root`**

The outermost container that provides context and manages shared state.

```tsx
const Root = ({ children, value, onValueChange }: RootProps) => {
  const contextValue = useMemo(() => ({
    value,
    onChange: onValueChange
  }), [value, onValueChange])

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  )
}
```

### **`Trigger`**

An interactive element that controls visibility or state changes.

```tsx
const Trigger = ({ children }: TriggerProps) => {
  const { toggle, value } = useSelectContext()
  return (
    <button onClick={toggle}>
      {children ?? value ?? 'Select...'}
    </button>
  )
}
```

### **`Content`**

The main content area that appears/disappears or contains primary information.

```tsx
const Content = ({ children }: ContentProps) => {
  const { isOpen } = useSelectContext()
  if (!isOpen) return null
  return <div className="select__content">{children}</div>
}
```

### **`Item`**

A repeatable element within a collection.

```tsx
const Item = ({ value, children }: ItemProps) => {
  const { value: selected } = useAccordionContext()
  return (
    <div data-state={value === selected ? 'open' : 'closed'}>
      {children}
    </div>
  )
}
```

### **`Option`**

A selectable choice within a selection component.

```tsx
const Option = ({ value, children }: OptionProps) => {
  const { onChange, value: selected } = useSelectContext()
  return (
    <div
      role="option"
      aria-selected={value === selected}
      onClick={() => onChange(value)}
    >
      {children}
    </div>
  )
}
```

### **`Panel`**

A content area associated with a specific trigger (tabs, accordion).

```tsx
const Panel = ({ value, children }: PanelProps) => {
  const { activeTab } = useTabsContext()
  if (value !== activeTab) return null
  return <div role="tabpanel">{children}</div>
}
```

### **`List`**

A container for multiple related items or triggers.

```tsx
const List = ({ children }: ListProps) => {
  return (
    <div role="tablist" className="tabs__list">
      {children}
    </div>
  )
}
```

### **`Overlay`**

A backdrop or background layer (modals, dialogs).

```tsx
const Overlay = ({ onClick }: OverlayProps) => {
  return <div className="dialog__overlay" onClick={onClick} />
}
```

### **`Header`&#32;/&#32;`Footer`**

Semantic sections within a component.

```tsx
const Header = ({ children }: HeaderProps) => {
  return <header className="card__header">{children}</header>
}

const Footer = ({ children }: FooterProps) => {
  return <footer className="card__footer">{children}</footer>
}
```

## **Context Hooks**

Internal hooks that access shared state follow the pattern:

```typescript
use + Namespace + Context
```

```tsx
// ✅ Good - Clear relationship to namespace
const useSelectContext = () => {
  const ctx = useContext(SelectContext)
  if (!ctx) throw new Error('Must be used within Select.Root')
  return ctx
}

const useAccordionContext = () => { ... }
const useTabsContext = () => { ... }

// ❌ Avoid - Generic or unclear names
const useContext = () => { ... }
const useData = () => { ... }
```

## **Context Objects**

Context objects follow the pattern:

```typescript
Namespace + Context
```

```tsx
// ✅ Good
const SelectContext = createContext<SelectContextValue | null>(null)
const AccordionContext = createContext<AccordionContextValue | null>(null)

// ❌ Avoid
const Context = createContext(...)
const SelectCtx = createContext(...)
```

## **Assembly Pattern**

Export compound components as a single namespace object:

```tsx
// ✅ Good - Clear namespace with semantic parts
const Select = {
  Root,
  Trigger,
  Content,
  Option
}

const Accordion = {
  Root,
  Item,
  Trigger,
  Content
}

// Usage is self-documenting
<Select.Root value={value} onValueChange={setValue}>
  <Select.Trigger />
  <Select.Content>
    <Select.Option value="1">Option 1</Select.Option>
  </Select.Content>
</Select.Root>
```

## **Variant Components**

When creating specialized versions, use descriptive suffixes:

```tsx
// ✅ Good - Clear specialization
const IconTrigger = ({ icon, children }: IconTriggerProps) => (
  <Select.Trigger>
    <span className="icon">{icon}</span>
    {children}
  </Select.Trigger>
)

const SearchableContent = ({ onSearch, children }: SearchableContentProps) => (
  <Select.Content>
    <input type="search" onChange={onSearch} />
    {children}
  </Select.Content>
)

// ❌ Avoid - Unclear relationship
const Trigger2 = () => { ... }
const CustomContent = () => { ... }
```

## **Common Patterns**

| **UI Pattern**  | **Namespace** | **Common Roles**                                                |
| --------------- | ------------- | --------------------------------------------------------------- |
| Select/Dropdown | `Select`      | `Root`, `Trigger`, `Content`, `Option`                          |
| Accordion       | `Accordion`   | `Root`, `Item`, `Trigger`, `Content`                            |
| Tabs            | `Tabs`        | `Root`, `List`, `Trigger`, `Panel`                              |
| Dialog/Modal    | `Dialog`      | `Root`, `Trigger`, `Overlay`, `Content`, `Title`, `Description` |
| Menu            | `Menu`        | `Root`, `Trigger`, `Content`, `Item`, `Separator`               |
| Card            | `Card`        | `Root`, `Header`, `Content`, `Footer`                           |
| Popover         | `Popover`     | `Root`, `Trigger`, `Content`, `Arrow`                           |

---

# Naming Render Props

## **Pattern Structure**

Render props follow a function-based naming pattern:

```typescript
render + Context + semantic role?
```

The render prefix clearly indicates a function that returns UI, while context describes what is being rendered.

| **Name**             | **Prefix** | **Context** | **Semantic Role** |
| -------------------- | ---------- | ----------- | ----------------- |
| `renderItem`         | `render`   | `Item`      |                   |
| `renderHeader`       | `render`   | `Header`    |                   |
| `renderEmpty`        | `render`   | Empty       |                   |
| `renderLoadingState` | `render`   | Loading     | `State`           |
| `renderRow`          | `render`   | `Row`       |                   |
| `children`           |            |             | (special case)    |

## **Render Functions**

Props that accept functions returning ReactNode. Use `render` prefix for explicit render props.

### **`renderItem`**

Renders individual items in a collection.

```tsx
interface VirtualListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
}

// Usage
<VirtualList
  items={users}
  renderItem={(user, index) => (
    <UserCard user={user} index={index} />
  )}
/>
```

### **`renderHeader`&#32;/&#32;`renderFooter`**

Renders optional header or footer sections.

```tsx
interface TableProps<T> {
  data: T[]
  renderHeader?: () => ReactNode
  renderFooter?: (totalCount: number) => ReactNode
}

// Usage
<Table
  data={items}
  renderHeader={() => <TableHeader />}
  renderFooter={(count) => <div>Total: {count}</div>}
/>
```

### **`renderEmpty`**

Renders content when collection is empty.

```tsx
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  renderEmpty?: () => ReactNode
}

// Usage
<List
  items={[]}
  renderItem={(item) => <Item {...item} />}
  renderEmpty={() => <EmptyState message="No items found" />}
/>
```

### **`renderLoadingState`&#32;/&#32;`renderErrorState`**

Renders specific UI states.

```tsx
interface DataFetcherProps<T> {
  renderData: (data: T) => ReactNode
  renderLoadingState?: () => ReactNode
  renderErrorState?: (error: Error) => ReactNode
}

// Usage
<DataFetcher
  renderData={(data) => <DataView data={data} />}
  renderLoadingState={() => <Spinner />}
  renderErrorState={(error) => <ErrorMessage error={error} />}
/>
```

## **Children as Render Prop**

When the primary purpose is rendering with provided data, use `children` as a function.

### **`children`**

Function that receives state/data and returns UI.

```tsx
interface ToggleProps {
  children: (isOn: boolean, toggle: () => void) => ReactNode
}

// Usage - More natural for primary render function
<Toggle>
  {(isOn, toggle) => (
    <button onClick={toggle}>
      {isOn ? 'On' : 'Off'}
    </button>
  )}
</Toggle>
```

```tsx
interface MousePositionProps {
  children: (position: { x: number; y: number }) => ReactNode
}

// Usage
<MousePosition>
  {({ x, y }) => (
    <div>Mouse at {x}, {y}</div>
  )}
</MousePosition>
```

## **Callback Parameters**

Parameters passed to render functions should be descriptive and ordered by importance.

### **Naming Guidelines**

```tsx
// ✅ Good - Clear, descriptive parameters
renderItem: (item: User, index: number, array: User[]) => ReactNode
renderCell: (value: string, row: Row, column: Column) => ReactNode
children: (state: FormState, helpers: FormHelpers) => ReactNode

// ❌ Avoid - Generic or unclear names
renderItem: (data: any, i: number) => ReactNode
children: (props: any) => ReactNode
```

### **Common Parameter Patterns**

```tsx
// Item rendering - item first, then metadata
renderItem: (item: T, index: number, style?: CSSProperties) => ReactNode

// State rendering - state first, then actions
children: (state: State, actions: Actions) => ReactNode

// Row/Cell rendering - value first, then context
renderCell: (value: CellValue, row: Row, column: Column) => ReactNode

// Conditional rendering - boolean first, then helpers
children: (isOpen: boolean, { open, close, toggle }: Helpers) => ReactNode
```

## **Generic Type Parameters**

Use single uppercase letters for simple generics, descriptive names for complex ones.

```tsx
// ✅ Good - Standard single letter for simple cases
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
}

// ✅ Good - Descriptive for multiple or complex generics
interface TableProps<TRow, TColumn> {
  rows: TRow[]
  columns: TColumn[]
  renderCell: (row: TRow, column: TColumn) => ReactNode
}

interface DataGridProps<TData, TFilter, TSortKey> {
  data: TData[]
  filters: TFilter
  sortBy: TSortKey
  renderRow: (item: TData) => ReactNode
}

// ❌ Avoid - Unclear or inconsistent
interface ListProps<Item> { ... }
interface TableProps<T1, T2> { ... }
```

## **Extractor Functions**

Functions that extract keys or values from items.

### **Pattern:&#32;`extract`&#32;+ Context**

```tsx
// ✅ Good - Clear extraction purpose
interface ListProps<T> {
  items: T[]
  keyExtractor: (item: T) => string
  labelExtractor?: (item: T) => string
}

// Usage
<List
  items={users}
  keyExtractor={(user) => user.id}
  labelExtractor={(user) => user.fullName}
  renderItem={(user) => <UserCard user={user} />}
/>

// ❌ Avoid - Unclear purpose
getKey: (item: T) => string
toLabel: (item: T) => string
```

## **Predicate Functions**

Functions that return boolean values for filtering or validation.

### **Pattern:&#32;`should`&#32;+ Action or&#32;`is`&#32;+ State**

```tsx
interface FilterableListProps<T> {
  items: T[]
  shouldIncludeItem?: (item: T) => boolean
  isItemDisabled?: (item: T) => boolean
  renderItem: (item: T, isDisabled: boolean) => ReactNode
}

// Usage
<FilterableList
  items={products}
  shouldIncludeItem={(product) => product.inStock}
  isItemDisabled={(product) => product.price > budget}
  renderItem={(product, isDisabled) => (
    <ProductCard product={product} disabled={isDisabled} />
  )}
/>
```

## **Comparison Functions**

Functions for sorting or comparing items.

### **Pattern:&#32;`compare`&#32;+ Context**

```tsx
interface SortableListProps<T> {
  items: T[]
  compareItems?: (a: T, b: T) => number
  renderItem: (item: T) => ReactNode
}

// Usage
<SortableList
  items={users}
  compareItems={(a, b) => a.name.localeCompare(b.name)}
  renderItem={(user) => <UserCard user={user} />}
/>
```

## **Render Prop Component Naming**

Components primarily using render props should have descriptive names indicating their purpose.

```tsx
// ✅ Good - Clear purpose
const VirtualList = <T,>({ renderItem, ... }: VirtualListProps<T>) => { ... }
const DataFetcher = <T,>({ renderData, ... }: DataFetcherProps<T>) => { ... }
const MouseTracker = ({ children }: MouseTrackerProps) => { ... }
const WindowSize = ({ children }: WindowSizeProps) => { ... }

// ❌ Avoid - Generic or unclear
const List = ({ render }: ListProps) => { ... }
const Component = ({ children }: Props) => { ... }
```

## **Combining Patterns**

When combining render props with other patterns, maintain clarity.

```tsx
interface DataTableProps<T> {
  // Primary data rendering
  data: T[]
  renderRow: (item: T, index: number) => ReactNode

  // Optional state rendering
  renderEmpty?: () => ReactNode
  renderLoading?: () => ReactNode

  // Extractors
  keyExtractor: (item: T) => string

  // Predicates
  isRowDisabled?: (item: T) => boolean

  // Callbacks
  onRowClick?: (item: T) => void
}

// Usage - Clear separation of concerns
<DataTable
  data={users}
  keyExtractor={(user) => user.id}
  isRowDisabled={(user) => !user.active}
  renderRow={(user, index) => (
    <UserRow user={user} index={index} />
  )}
  renderEmpty={() => <EmptyState />}
  renderLoading={() => <Spinner />}
  onRowClick={(user) => navigate(`/users/${user.id}`)}
/>
```

---

# Naming Polymorphic Components

## **Pattern Structure**

Polymorphic components use a combination of type parameters and props:

```typescript
Component + as + Element + ref
```

The `as` prop controls the rendered element, while type parameters ensure type safety.

| **Name**           | **Type**       | **Purpose**                              |
| ------------------ | -------------- | ---------------------------------------- |
| `as`               | prop           | Specifies element/component to render as |
| `E`                | type parameter | Element type being rendered              |
| `PolymorphicProps` | type           | Props with element-specific attributes   |
| `PolymorphicRef`   | type           | Ref type for the element                 |

## **Type Parameters**

Generic type parameters for polymorphic components.

### **`E`&#32;(Element)**

Represents the element type being rendered. Use `E` as the standard convention.

```tsx
// ✅ Good - Standard E for element type
type ButtonProps<E extends ElementType = 'button'> =
  PolymorphicComponentProps<E, ButtonOwnProps>

const Button = <E extends ElementType = 'button'>({
  as,
  ...props
}: ButtonProps<E>) => {
  const Component = as ?? 'button'
  return <Component {...props} />
}

// ❌ Avoid - Non-standard or unclear names
type ButtonProps<T extends ElementType> = ...
type ButtonProps<Element extends ElementType> = ...
```

### **Default Element Type**

Always provide a sensible default element type.

```tsx
// ✅ Good - Semantic defaults
const Button = <E extends ElementType = 'button'>
const Heading = <E extends ElementType = 'h2'>
const Text = <E extends ElementType = 'span'>
const Link = <E extends ElementType = 'a'>

// ❌ Avoid - Generic defaults
const Button = <E extends ElementType = 'div'>
const Component = <E extends ElementType>
```

## **Props**

Props specific to polymorphic components.

### **`as`**

Specifies which element or component to render as.

```tsx
interface PolymorphicProps<E extends ElementType> {
  as?: E
}

// Usage - Clear element transformation
<Button as="a" href="/home">Home</Button>
<Button as={Link} to="/dashboard">Dashboard</Button>
<Heading as="h1">Page Title</Heading>
```

### **Component Own Props**

Props specific to the component, separate from element props.

```tsx
// ✅ Good - Clear separation with "OwnProps" suffix
interface ButtonOwnProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

interface HeadingOwnProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  visualLevel?: 1 | 2 | 3 | 4 | 5 | 6
}

// ❌ Avoid - Unclear or conflicting names
interface ButtonProps { ... } // Conflicts with polymorphic ButtonProps
interface ButtonCustomProps { ... }
```

## **Type Utilities**

Helper types for building polymorphic components.

### **`PolymorphicProps`**

Combines own props with element-specific props.

```tsx
// ✅ Good - Clear, reusable type utility
type PolymorphicProps<E extends ElementType, P = {}> = P & {
  as?: E
} & Omit<ComponentPropsWithoutRef<E>, keyof P | 'as'>

// Usage
type ButtonProps<E extends ElementType = 'button'> =
  PolymorphicProps<E, ButtonOwnProps>
```

### **`PolymorphicRef`**

Extracts the correct ref type for the element.

```tsx
// ✅ Good - Dedicated ref type utility
type PolymorphicRef<E extends ElementType> =
  ComponentPropsWithRef<E>['ref']

// Usage in forwardRef
const Button = forwardRef(<E extends ElementType = 'button'>({
  as,
  ...props
}: ButtonProps<E>, ref: PolymorphicRef<E>) => {
  // Implementation
})
```

### **`PolymorphicComponentProps`**

Combines props and ref types.

```tsx
// ✅ Good - Complete polymorphic props with ref
type PolymorphicComponentProps<E extends ElementType, P = {}> =
  PolymorphicProps<E, P> & { ref?: PolymorphicRef<E> }

// Usage
type ButtonProps<E extends ElementType = 'button'> =
  PolymorphicComponentProps<E, ButtonOwnProps>
```

## **Component Naming**

Polymorphic components should have clear, semantic names.

```tsx
// ✅ Good - Clear semantic names
const Button = forwardRef(...)
const Heading = forwardRef(...)
const Text = forwardRef(...)
const Box = forwardRef(...)
const Link = forwardRef(...)

// ❌ Avoid - Generic or unclear
const PolymorphicComponent = forwardRef(...)
const Component = forwardRef(...)
const Element = forwardRef(...)
```

## **Type Assertion**

Cast the component to preserve generic type parameter.

```tsx
// ✅ Good - Explicit type assertion preserving generics
const Button = forwardRef(<E extends ElementType = 'button'>({
  as,
  variant = 'primary',
  ...props
}: ButtonProps<E>, ref: PolymorphicRef<E>) => {
  const Component = as ?? 'button'
  return <Component ref={ref} {...props} />
}) as <E extends ElementType = 'button'>(
  props: ButtonProps<E>
) => ReactElement | null

// ❌ Avoid - Losing generic type information
const Button = forwardRef(({ as, ...props }: any, ref: any) => {
  // Implementation
})
```

## **Internal Variables**

Variables within polymorphic components.

### **`Component`**

The resolved element/component to render.

```tsx
// ✅ Good - Clear, capitalized for JSX usage
const Component = as ?? 'button'
return <Component ref={ref} {...props} />

// ❌ Avoid - Lowercase or unclear
const element = as ?? 'button'
const comp = as ?? 'button'
```

## **Variant Props**

Props that modify component appearance or behavior.

```tsx
interface ButtonOwnProps {
  // ✅ Good - Clear variant naming
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'

  // ✅ Good - Boolean states with "is" prefix
  isLoading?: boolean
  isDisabled?: boolean
  isFullWidth?: boolean

  // ❌ Avoid - Unclear or inconsistent
  type?: string
  loading?: boolean
  disabled?: boolean
}
```

## **Composed Polymorphic Components**

Building specialized versions of polymorphic components.

```tsx
// ✅ Good - Descriptive composition names
const IconButton = <E extends ElementType = 'button'>({
  icon,
  children,
  ...props
}: ButtonProps<E> & { icon: ReactNode }) => (
  <Button {...props}>
    <span className="icon">{icon}</span>
    {children}
  </Button>
)

const PrimaryButton = <E extends ElementType = 'button'>(
  props: ButtonProps<E>
) => <Button variant="primary" {...props} />

// ❌ Avoid - Generic or unclear
const Button2 = <E extends ElementType>(...) => { ... }
const CustomButton = <E extends ElementType>(...) => { ... }
```

## **Class Name Composition**

Building class names for polymorphic components.

```tsx
// ✅ Good - Clear class name building
const Button = <E extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  isLoading,
  className,
  ...props
}: ButtonProps<E>, ref: PolymorphicRef<E>) => {
  const Component = as ?? 'button'

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    isLoading && 'btn--loading',
    className
  ].filter(Boolean).join(' ')

  return <Component ref={ref} className={classes} {...props} />
}

// ❌ Avoid - Unclear or inconsistent
const cls = `btn ${variant} ${size}`
const buttonClass = className + ' btn'
```

## **Common Polymorphic Patterns**

| **Component** | **Default Element** | **Common "as" Values**        |
| ------------- | ------------------- | ----------------------------- |
| `Button`      | `button`            | `a`, `Link`, `div`            |
| `Heading`     | `h2`                | `h1`, `h3`, `h4`, `h5`, `h6`  |
| `Text`        | `span`              | `p`, `div`, `label`           |
| `Box`         | `div`               | `section`, `article`, `aside` |
| `Link`        | `a`                 | `Link`, `NavLink`, `button`   |
| `Container`   | `div`               | `section`, `main`, `article`  |

---

# Naming Slot Pattern Components

## **Pattern Structure**

Slot pattern components use named props or compound components for content injection:

```typescript
Component + slot name + "Slot"? suffix
```

Slot names should be semantic and describe the content's purpose or position.

| **Name**     | **Type**  | **Purpose**                        |
| ------------ | --------- | ---------------------------------- |
| `header`     | prop      | Content for header area            |
| `footer`     | prop      | Content for footer area            |
| `actions`    | prop      | Action buttons or controls         |
| `aside`      | prop      | Sidebar or supplementary content   |
| `CardHeader` | component | Compound component for header slot |

## **Slot Props**

Props that accept ReactNode for specific content areas.

### **Semantic Slot Names**

Use clear, semantic names that describe the slot's purpose.

```tsx
// ✅ Good - Clear semantic slot names
interface CardProps {
  children: ReactNode
  header?: ReactNode
  footer?: ReactNode
  actions?: ReactNode
  aside?: ReactNode
}

interface LayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  toolbar?: ReactNode
  breadcrumbs?: ReactNode
}

// ❌ Avoid - Generic or unclear names
interface CardProps {
  children: ReactNode
  top?: ReactNode
  bottom?: ReactNode
  slot1?: ReactNode
}
```

### **Positional Slot Names**

When position is the primary characteristic, use directional names.

```tsx
// ✅ Good - Clear positional slots
interface SplitPaneProps {
  left: ReactNode
  right: ReactNode
  divider?: ReactNode
}

interface StackProps {
  top?: ReactNode
  middle: ReactNode
  bottom?: ReactNode
}

// ❌ Avoid - Ambiguous positions
interface SplitPaneProps {
  first: ReactNode
  second: ReactNode
}
```

## **Slot Components**

Dedicated components for composing slot content.

### **Pattern: Component + Slot Name**

```tsx
// ✅ Good - Clear component-slot relationship
const CardHeader = ({ title, subtitle }: CardHeaderProps) => (
  <div className="card__header">
    <h3>{title}</h3>
    {subtitle && <p className="subtitle">{subtitle}</p>}
  </div>
)

const CardActions = ({ children }: CardActionsProps) => (
  <div className="card__actions">{children}</div>
)

const CardFooter = ({ children }: CardFooterProps) => (
  <footer className="card__footer">{children}</footer>
)

// Usage
<Card
  header={<CardHeader title="Product" subtitle="In Stock" />}
  actions={<CardActions><Button>Buy</Button></CardActions>}
>
  <p>Product description</p>
</Card>

// ❌ Avoid - Unclear relationship
const Header = () => { ... }
const Actions = () => { ... }
```

## **Compound Component Slots**

Using compound components for slot pattern.

### **Pattern: Namespace.SlotName**

```tsx
// ✅ Good - Clear compound component slots
const Card = ({ children }: { children: ReactNode }) => (
  <article className="card">{children}</article>
)

Card.Header = ({ children }: { children: ReactNode }) => (
  <header className="card__header">{children}</header>
)

Card.Content = ({ children }: { children: ReactNode }) => (
  <div className="card__content">{children}</div>
)

Card.Footer = ({ children }: { children: ReactNode }) => (
  <footer className="card__footer">{children}</footer>
)

Card.Actions = ({ children }: { children: ReactNode }) => (
  <div className="card__actions">{children}</div>
)

// Usage - Self-documenting structure
<Card>
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Content>
    <p>Content here</p>
  </Card.Content>
  <Card.Footer>
    <Card.Actions>
      <Button>Action</Button>
    </Card.Actions>
  </Card.Footer>
</Card>
```

## **Optional vs Required Slots**

Clearly indicate which slots are required through TypeScript.

```tsx
// ✅ Good - Clear required vs optional slots
interface ModalProps {
  children: ReactNode          // Required: main content
  title: ReactNode            // Required: modal title
  actions?: ReactNode         // Optional: action buttons
  description?: ReactNode     // Optional: description
}

interface PageLayoutProps {
  children: ReactNode         // Required: main content
  header: ReactNode          // Required: page header
  sidebar?: ReactNode        // Optional: sidebar
  footer?: ReactNode         // Optional: footer
}

// ❌ Avoid - Unclear requirements
interface ModalProps {
  content?: ReactNode
  title?: ReactNode
  actions?: ReactNode
}
```

## **Slot Composition Helpers**

Helper components for common slot patterns.

### **Pattern: Slot + Purpose**

```tsx
// ✅ Good - Clear helper purpose
const SlotWithDivider = ({
  children,
  showDivider = true
}: SlotWithDividerProps) => (
  <>
    {showDivider && <hr className="divider" />}
    {children}
  </>
)

const ConditionalSlot = ({
  condition,
  children
}: ConditionalSlotProps) => (
  condition ? <>{children}</> : null
)

// Usage
<Card
  header={<CardHeader title="Product" />}
  footer={
    <ConditionalSlot condition={hasActions}>
      <CardActions>
        <Button>Action</Button>
      </CardActions>
    </ConditionalSlot>
  }
>
  <p>Content</p>
</Card>
```

## **Slot Props Interfaces**

Naming interfaces for slot-specific props.

```tsx
// ✅ Good - Clear slot prop interfaces
interface CardHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
}

interface CardActionsProps {
  children: ReactNode
  align?: 'left' | 'center' | 'right'
}

interface CardFooterProps {
  children: ReactNode
  variant?: 'default' | 'compact'
}

// ❌ Avoid - Generic or unclear
interface HeaderProps { ... }
interface Props1 { ... }
```

## **Slot Rendering Logic**

Internal logic for conditional slot rendering.

```tsx
// ✅ Good - Clear slot rendering helpers
const Card = ({
  children,
  header,
  footer,
  actions
}: CardProps) => {
  const hasHeader = header !== undefined
  const hasFooter = footer !== undefined || actions !== undefined

  return (
    <article className="card">
      {hasHeader && (
        <header className="card__header">{header}</header>
      )}
      <div className="card__content">{children}</div>
      {hasFooter && (
        <footer className="card__footer">
          {footer}
          {actions && (
            <div className="card__actions">{actions}</div>
          )}
        </footer>
      )}
    </article>
  )
}

// ❌ Avoid - Unclear conditions
const Card = ({ children, header, footer, actions }: CardProps) => (
  <article>
    {header}
    {children}
    {footer || actions ? <footer>{footer}{actions}</footer> : null}
  </article>
)
```

## **Slot Variants**

Props that modify slot appearance or behavior.

```tsx
// ✅ Good - Clear variant naming
interface CardProps {
  children: ReactNode
  header?: ReactNode
  headerVariant?: 'default' | 'compact' | 'prominent'
  footer?: ReactNode
  footerAlign?: 'left' | 'center' | 'right'
  actions?: ReactNode
  actionsPosition?: 'footer' | 'header'
}

// ❌ Avoid - Unclear or inconsistent
interface CardProps {
  header?: ReactNode
  headerType?: string
  footer?: ReactNode
  footerStyle?: string
}
```

## **Nested Slots**

Slots within slots for complex layouts.

```tsx
// ✅ Good - Clear nested slot structure
interface PageLayoutProps {
  children: ReactNode
  header: {
    logo?: ReactNode
    navigation: ReactNode
    actions?: ReactNode
  }
  sidebar?: {
    top?: ReactNode
    content: ReactNode
    bottom?: ReactNode
  }
  footer?: ReactNode
}

// Usage
<PageLayout
  header={{
    logo: <Logo />,
    navigation: <Navigation />,
    actions: <UserMenu />
  }}
  sidebar={{
    content: <SidebarNav />,
    bottom: <SidebarFooter />
  }}
>
  <MainContent />
</PageLayout>

// Alternative: Compound components for nested slots
<PageLayout>
  <PageLayout.Header>
    <PageLayout.Header.Logo><Logo /></PageLayout.Header.Logo>
    <PageLayout.Header.Navigation><Navigation /></PageLayout.Header.Navigation>
  </PageLayout.Header>
  <PageLayout.Content>
    <MainContent />
  </PageLayout.Content>
</PageLayout>
```

## **Common Slot Patterns**

| **Component** | **Common Slots**                                 |
| ------------- | ------------------------------------------------ |
| `Card`        | `header`, `footer`, `actions`, `aside`           |
| `Modal`       | `title`, `description`, `actions`, `closeButton` |
| `Layout`      | `header`, `sidebar`, `footer`, `toolbar`         |
| `Table`       | `header`, `footer`, `empty`, `loading`           |
| `Form`        | `header`, `footer`, `actions`, `errors`          |
| `Panel`       | `title`, `toolbar`, `footer`, `aside`            |

---

# Naming Controlled/Uncontrolled Components

## **Pattern Structure**

Controlled/uncontrolled components follow state management naming patterns:

```typescript
value/defaultValue + onChange/onChangeEvent
```

The naming clearly distinguishes between controlled (value + onChange) and uncontrolled (defaultValue) modes.

| **Name**         | **Type** | **Mode**     | **Purpose**                |
| ---------------- | -------- | ------------ | -------------------------- |
| `value`          | prop     | Controlled   | Current controlled value   |
| `defaultValue`   | prop     | Uncontrolled | Initial uncontrolled value |
| `onChange`       | prop     | Both         | Value change callback      |
| `checked`        | prop     | Controlled   | Boolean controlled state   |
| `defaultChecked` | prop     | Uncontrolled | Initial boolean state      |

## **Value Props**

Props for managing component state.

### **`value`**

The controlled value. When provided, component operates in controlled mode.

```tsx
// ✅ Good - Clear controlled value prop
interface InputProps {
  value?: string
  onChange?: (value: string) => void
}

interface SelectProps {
  value?: string | null
  onValueChange?: (value: string) => void
}

interface ToggleProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

// Usage - Controlled mode
const [text, setText] = useState('')
<Input value={text} onChange={setText} />

// ❌ Avoid - Unclear or inconsistent
interface InputProps {
  val?: string
  currentValue?: string
}
```

### **`defaultValue`**

The initial value for uncontrolled mode. Only used on mount.

```tsx
// ✅ Good - Clear uncontrolled initial value
interface InputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

// Usage - Uncontrolled mode
<Input defaultValue="Initial text" onChange={handleChange} />

// ❌ Avoid - Unclear or conflicting
interface InputProps {
  initialValue?: string
  startValue?: string
}
```

### **`checked`&#32;/&#32;`defaultChecked`**

Boolean state variants for toggles, checkboxes, switches.

```tsx
// ✅ Good - Clear boolean state naming
interface ToggleProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

// Usage
<Toggle checked={isOn} onCheckedChange={setIsOn} />
<Checkbox defaultChecked={false} onChange={handleCheck} />

// ❌ Avoid - Inconsistent with HTML standards
interface ToggleProps {
  value?: boolean
  defaultValue?: boolean
}
```

## **Change Handlers**

Callbacks for value changes.

### **`onChange`**

Generic change handler. Use for simple value changes.

```tsx
// ✅ Good - Standard onChange for simple cases
interface InputProps {
  value?: string
  onChange?: (value: string) => void
}

// Usage
<Input value={text} onChange={(newValue) => setText(newValue)} />

// ❌ Avoid - Overly specific for simple cases
interface InputProps {
  onInputChange?: (value: string) => void
  onTextChange?: (value: string) => void
}
```

### **`on[Property]Change`**

Specific change handlers for clarity in complex components.

```tsx
// ✅ Good - Specific handlers for multiple values
interface DateRangeProps {
  startDate?: Date
  endDate?: Date
  onStartDateChange?: (date: Date) => void
  onEndDateChange?: (date: Date) => void
}

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
}

interface ToggleProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

// Usage - Clear which value is changing
<DateRange
  startDate={start}
  endDate={end}
  onStartDateChange={setStart}
  onEndDateChange={setEnd}
/>

// ❌ Avoid - Ambiguous handlers
interface DateRangeProps {
  onChange?: (dates: [Date, Date]) => void
}
```

## **Controllable State Hook**

Custom hook for managing controlled/uncontrolled state.

### **`useControllableState`**

Hook that handles both controlled and uncontrolled modes.

```tsx
// ✅ Good - Clear controllable state hook
const useControllableState = <T,>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const setValue = useCallback((nextValue: T | ((prev: T) => T)) => {
    const resolvedValue = typeof nextValue === 'function'
      ? (nextValue as (prev: T) => T)(value)
      : nextValue

    if (!isControlled) {
      setInternalValue(resolvedValue)
    }
    onChange?.(resolvedValue)
  }, [isControlled, onChange, value])

  return [value, setValue] as const
}

// Usage in component
const Input = ({ value, defaultValue = '', onChange }: InputProps) => {
  const [currentValue, setValue] = useControllableState(
    value,
    defaultValue,
    onChange
  )

  return (
    <input
      value={currentValue}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

// ❌ Avoid - Unclear or inconsistent
const useValue = (val, def, cb) => { ... }
const useControlled = (props) => { ... }
```

## **Internal State Variables**

Variables for managing internal state.

### **`isControlled`**

Boolean indicating if component is in controlled mode.

```tsx
// ✅ Good - Clear controlled mode check
const isControlled = value !== undefined
const isControlled = controlledValue !== undefined

// Usage
if (!isControlled) {
  setInternalValue(nextValue)
}

// ❌ Avoid - Unclear or verbose
const controlled = value !== undefined
const isInControlledMode = value !== undefined
```

### **`internalValue`&#32;/&#32;`internalState`**

Internal state for uncontrolled mode.

```tsx
// ✅ Good - Clear internal state naming
const [internalValue, setInternalValue] = useState(defaultValue)
const [internalChecked, setInternalChecked] = useState(defaultChecked)

// ❌ Avoid - Unclear or conflicting
const [val, setVal] = useState(defaultValue)
const [state, setState] = useState(defaultValue)
```

## **Render Props for Controlled State**

Providing controlled state through render props.

```tsx
// ✅ Good - Clear render prop with state
interface ToggleProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  children?: (checked: boolean, toggle: () => void) => ReactNode
}

const Toggle = ({
  checked,
  defaultChecked = false,
  onCheckedChange,
  children
}: ToggleProps) => {
  const [isChecked, setIsChecked] = useControllableState(
    checked,
    defaultChecked,
    onCheckedChange
  )

  const toggle = useCallback(() => {
    setIsChecked(prev => !prev)
  }, [setIsChecked])

  if (children) {
    return <>{children(isChecked, toggle)}</>
  }

  return <button onClick={toggle}>{isChecked ? 'On' : 'Off'}</button>
}

// Usage - Full control over rendering
<Toggle checked={isOn} onCheckedChange={setIsOn}>
  {(checked, toggle) => (
    <CustomSwitch checked={checked} onToggle={toggle} />
  )}
</Toggle>
```

## **Form Integration**

Naming for form library integration.

```tsx
// ✅ Good - Clear form integration props
interface FormInputProps {
  name: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  error?: string
}

// Usage with form libraries
const FormInput = ({ name }: { name: string }) => {
  const { field, fieldState } = useController({ name })

  return (
    <Input
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={fieldState.error?.message}
    />
  )
}

// ❌ Avoid - Unclear integration
interface FormInputProps {
  fieldName: string
  val?: string
}
```

## **Validation Props**

Props for validation in controlled/uncontrolled components.

```tsx
// ✅ Good - Clear validation props
interface InputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onValidate?: (value: string) => string | undefined
  error?: string
  isInvalid?: boolean
}

// Usage
<Input
  value={email}
  onChange={setEmail}
  onValidate={(val) => isValidEmail(val) ? undefined : 'Invalid email'}
  error={emailError}
/>

// ❌ Avoid - Unclear validation
interface InputProps {
  validate?: (val: string) => boolean
  validationError?: string
}
```

## **Reset Functionality**

Methods for resetting to default state.

```tsx
// ✅ Good - Clear reset functionality
interface InputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onReset?: () => void
}

const Input = ({
  value,
  defaultValue = '',
  onChange,
  onReset
}: InputProps) => {
  const [currentValue, setValue] = useControllableState(
    value,
    defaultValue,
    onChange
  )

  const handleReset = useCallback(() => {
    setValue(defaultValue)
    onReset?.()
  }, [setValue, defaultValue, onReset])

  return (
    <div>
      <input value={currentValue} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

// ❌ Avoid - Unclear reset behavior
const handleClear = () => setValue('')
const handleDefault = () => setValue(defaultValue)
```

## **Common Controlled/Uncontrolled Patterns**

| **Component** | **Controlled Props**         | **Uncontrolled Props** |
| ------------- | ---------------------------- | ---------------------- |
| `Input`       | `value`, `onChange`          | `defaultValue`         |
| `Select`      | `value`, `onValueChange`     | `defaultValue`         |
| `Toggle`      | `checked`, `onCheckedChange` | `defaultChecked`       |
| `Checkbox`    | `checked`, `onChange`        | `defaultChecked`       |
| `Radio`       | `checked`, `onChange`        | `defaultChecked`       |
| `Slider`      | `value`, `onValueChange`     | `defaultValue`         |
| `DatePicker`  | `date`, `onDateChange`       | `defaultDate`          |

---

# Naming Optimistic UI Components

## **Pattern Structure**

Optimistic UI patterns use action-oriented naming with state indicators:

```typescript
action + Context + state indicators
```

Names should clearly indicate async operations, optimistic updates, and rollback capabilities.

| **Name**           | **Type**     | **Purpose**                     |
| ------------------ | ------------ | ------------------------------- |
| `execute`          | method       | Performs optimistic action      |
| `isPending`        | method/state | Checks if action is in progress |
| `rollback`         | callback     | Reverts optimistic update       |
| `optimisticUpdate` | callback     | Applies immediate UI update     |

## **Hook Naming**

Custom hooks for optimistic updates.

### **`useOptimistic[Action]`**

Hook that manages a specific optimistic action.

```tsx
// ✅ Good - Clear optimistic action hooks
const useOptimisticUpdate = <T,>(
  asyncFn: (item: T) => Promise<T>,
  onError?: (error: Error) => void
) => { ... }

const useOptimisticDelete = (
  deleteFn: (id: string) => Promise<void>
) => { ... }

const useOptimisticToggle = (
  toggleFn: (id: string) => Promise<boolean>
) => { ... }

// Usage
const { execute, isPending } = useOptimisticUpdate(updateTodo)
const { deleteItem, isDeleting } = useOptimisticDelete(deleteTodo)

// ❌ Avoid - Generic or unclear
const useOptimistic = () => { ... }
const useAsync = () => { ... }
```

### **`useOptimisticAction`**

Generic hook for any optimistic action.

```tsx
// ✅ Good - Generic optimistic action hook
const useOptimisticAction = <T,>(
  asyncFn: (item: T) => Promise<T>,
  onError?: (error: Error, rollback: () => void) => void
) => {
  const [pending, setPending] = useState<Set<string>>(new Set())

  const execute = useCallback(async (
    item: T & { id: string },
    optimisticUpdate: () => void,
    rollback: () => void
  ) => {
    setPending(prev => new Set(prev).add(item.id))
    optimisticUpdate()

    try {
      await asyncFn(item)
    } catch (error) {
      rollback()
      onError?.(error as Error, rollback)
    } finally {
      setPending(prev => {
        const next = new Set(prev)
        next.delete(item.id)
        return next
      })
    }
  }, [asyncFn, onError])

  const isPending = useCallback(
    (id: string) => pending.has(id),
    [pending]
  )

  return { execute, isPending }
}

// ❌ Avoid - Unclear purpose
const useAction = () => { ... }
const useAsync = () => { ... }
```

## **Action Methods**

Methods for executing optimistic updates.

### **`execute`**

Executes the optimistic action with rollback support.

```tsx
// ✅ Good - Clear execution method
interface OptimisticAction<T> {
  execute: (
    item: T,
    optimisticUpdate: () => void,
    rollback: () => void
  ) => Promise<void>
}

// Usage
await execute(
  todo,
  () => setTodos(prev => [...prev, todo]),
  () => setTodos(previousTodos)
)

// ❌ Avoid - Unclear or generic
interface OptimisticAction<T> {
  run: (item: T, update: () => void, undo: () => void) => Promise<void>
  perform: (item: T) => Promise<void>
}
```

### **`executeOptimistically`**

More explicit variant when context is unclear.

```tsx
// ✅ Good - Explicit optimistic execution
const executeOptimistically = async (
  action: () => Promise<void>,
  optimisticUpdate: () => void,
  rollback: () => void
) => {
  optimisticUpdate()
  try {
    await action()
  } catch (error) {
    rollback()
    throw error
  }
}

// Usage
await executeOptimistically(
  () => api.updateTodo(todo),
  () => updateTodoInState(todo),
  () => revertTodoInState(previousTodo)
)
```

## **State Indicators**

Methods and state for tracking pending operations.

### **`isPending`**

Checks if a specific item is being processed.

```tsx
// ✅ Good - Clear pending state check
interface OptimisticAction<T> {
  isPending: (id: string) => boolean
}

// Usage
const { execute, isPending } = useOptimisticAction(saveTodo)

<TodoItem
  todo={todo}
  isPending={isPending(todo.id)}
  onToggle={handleToggle}
/>

// ❌ Avoid - Unclear or inconsistent
interface OptimisticAction<T> {
  isLoading: (id: string) => boolean
  pending: (id: string) => boolean
}
```

### **`pendingIds`**

Set or array of IDs currently being processed.

```tsx
// ✅ Good - Clear pending collection
const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())
const [pendingOperations, setPendingOperations] = useState<string[]>([])

// Usage
const isPending = pendingIds.has(id)
const hasPendingOperations = pendingIds.size > 0

// ❌ Avoid - Unclear or generic
const [pending, setPending] = useState<Set<string>>(new Set())
const [loading, setLoading] = useState<string[]>([])
```

## **Callback Parameters**

Callbacks for optimistic update lifecycle.

### **`optimisticUpdate`**

Callback that applies the immediate UI update.

```tsx
// ✅ Good - Clear optimistic update callback
const addTodo = useCallback((todo: Todo) => {
  execute(
    todo,
    () => {
      // optimisticUpdate
      setPreviousState(todos)
      setTodos(prev => [...prev, todo])
    },
    () => setTodos(previousState)
  )
}, [execute, todos, previousState])

// ❌ Avoid - Unclear or generic
const addTodo = (todo: Todo) => {
  execute(
    todo,
    () => updateUI(todo),
    () => revert()
  )
}
```

### **`rollback`**

Callback that reverts the optimistic update on error.

```tsx
// ✅ Good - Clear rollback callback
const toggleTodo = useCallback((id: string) => {
  const todo = todos.find(t => t.id === id)
  if (!todo) return

  const updated = { ...todo, completed: !todo.completed }

  execute(
    updated,
    () => {
      setPreviousState(todos)
      setTodos(prev => prev.map(t => t.id === id ? updated : t))
    },
    () => {
      // rollback
      setTodos(previousState)
    }
  )
}, [execute, todos, previousState])

// ❌ Avoid - Unclear or generic
const toggleTodo = (id: string) => {
  execute(
    updated,
    () => update(),
    () => undo()
  )
}
```

## **State Management**

Variables for managing optimistic state.

### **`previousState`**

Stores the state before optimistic update for rollback.

```tsx
// ✅ Good - Clear previous state storage
const [todos, setTodos] = useState<Todo[]>([])
const [previousState, setPreviousState] = useState<Todo[]>([])

const addTodo = (todo: Todo) => {
  execute(
    todo,
    () => {
      setPreviousState(todos)
      setTodos(prev => [...prev, todo])
    },
    () => setTodos(previousState)
  )
}

// ❌ Avoid - Unclear or generic
const [backup, setBackup] = useState<Todo[]>([])
const [prev, setPrev] = useState<Todo[]>([])
```

### **`optimisticItems`**

Items that have been optimistically updated.

```tsx
// ✅ Good - Clear optimistic items tracking
const [items, setItems] = useState<Item[]>([])
const [optimisticItems, setOptimisticItems] = useState<Set<string>>(new Set())

const isOptimistic = (id: string) => optimisticItems.has(id)

// Usage in rendering
<ItemList
  items={items}
  renderItem={(item) => (
    <Item
      {...item}
      isOptimistic={isOptimistic(item.id)}
    />
  )}
/>

// ❌ Avoid - Unclear tracking
const [pending, setPending] = useState<Set<string>>(new Set())
const [temp, setTemp] = useState<Set<string>>(new Set())
```

## **Error Handling**

Callbacks and state for handling optimistic update failures.

### **`onError`**

Callback invoked when optimistic action fails.

```tsx
// ✅ Good - Clear error handling
const { execute } = useOptimisticAction(
  saveTodo,
  (error, rollback) => {
    toast.error(error.message)
    logError(error)
    // rollback is automatically called before this
  }
)

// Alternative: separate error handler
const handleError = useCallback((error: Error, rollback: () => void) => {
  toast.error('Failed to save todo')
  logErrorToService(error)
}, [])

const { execute } = useOptimisticAction(saveTodo, handleError)

// ❌ Avoid - Unclear error handling
const { execute } = useOptimisticAction(
  saveTodo,
  (err) => console.log(err)
)
```

### **`onSuccess`**

Optional callback for successful completion.

```tsx
// ✅ Good - Clear success handling
const { execute } = useOptimisticAction(
  saveTodo,
  {
    onError: (error) => toast.error(error.message),
    onSuccess: (todo) => {
      toast.success('Todo saved!')
      analytics.track('todo_saved', { id: todo.id })
    }
  }
)

// ❌ Avoid - Unclear or inconsistent
const { execute } = useOptimisticAction(
  saveTodo,
  {
    error: (e) => { ... },
    success: (t) => { ... }
  }
)
```

## **Composition Patterns**

Combining optimistic updates with other patterns.

### **`useOptimistic[Entity]`**

Entity-specific optimistic hooks.

```tsx
// ✅ Good - Entity-specific optimistic hooks
const useOptimisticTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [previousState, setPreviousState] = useState<Todo[]>([])

  const { execute, isPending } = useOptimisticAction<Todo>(
    saveTodo,
    (error) => toast.error(error.message)
  )

  const addTodo = useCallback((todo: Todo) => {
    execute(
      todo,
      () => {
        setPreviousState(todos)
        setTodos(prev => [...prev, todo])
      },
      () => setTodos(previousState)
    )
  }, [execute, todos, previousState])

  const toggleTodo = useCallback((id: string) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    const updated = { ...todo, completed: !todo.completed }
    execute(
      updated,
      () => {
        setPreviousState(todos)
        setTodos(prev => prev.map(t => t.id === id ? updated : t))
      },
      () => setTodos(previousState)
    )
  }, [execute, todos, previousState])

  return { todos, addTodo, toggleTodo, isPending }
}

// Usage
const TodoList = () => {
  const { todos, addTodo, toggleTodo, isPending } = useOptimisticTodos()

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          isPending={isPending(todo.id)}
        />
      ))}
    </div>
  )
}
```

## **UI State Props**

Props for indicating optimistic state in components.

```tsx
// ✅ Good - Clear optimistic UI state props
interface TodoItemProps {
  todo: Todo
  isPending?: boolean
  isOptimistic?: boolean
  onToggle: (id: string) => void
}

const TodoItem = ({ todo, isPending, isOptimistic, onToggle }: TodoItemProps) => (
  <div
    className={cn(
      'todo-item',
      isPending && 'todo-item--pending',
      isOptimistic && 'todo-item--optimistic'
    )}
  >
    <span style={{ opacity: isPending ? 0.5 : 1 }}>
      {todo.text}
    </span>
    {isPending && <Spinner size="sm" />}
  </div>
)

// ❌ Avoid - Unclear state indicators
interface TodoItemProps {
  todo: Todo
  loading?: boolean
  temp?: boolean
}
```

---

# Naming Deferred Rendering Components

## **Pattern Structure**

Deferred rendering uses React 18+ concurrent features with clear state indicators:

```typescript
deferred + Context + state indicators
```

Names should indicate delayed updates and stale state transitions.

| **Name**          | **Type** | **Purpose**                           |
| ----------------- | -------- | ------------------------------------- |
| `deferredValue`   | value    | Delayed version of a value            |
| `isStale`         | boolean  | Indicates if deferred value is behind |
| `isPending`       | boolean  | Indicates transition in progress      |
| `startTransition` | method   | Marks updates as non-urgent           |

## **Hook Naming**

Custom hooks for deferred rendering.

### **`useDeferred[Context]`**

Hook that manages deferred state for a specific context.

```tsx
// ✅ Good - Clear deferred context hooks
const useDeferredSearch = (searchTerm: string) => {
  const deferredTerm = useDeferredValue(searchTerm)
  const isStale = searchTerm !== deferredTerm

  return { deferredTerm, isStale }
}

const useDeferredFilter = <T,>(
  data: T[],
  filterTerm: string,
  filterFn: (item: T, term: string) => boolean
) => {
  const deferredTerm = useDeferredValue(filterTerm)
  const isStale = filterTerm !== deferredTerm

  const filtered = useMemo(
    () => deferredTerm ? data.filter(item => filterFn(item, deferredTerm)) : data,
    [data, deferredTerm, filterFn]
  )

  return { filtered, isStale, searchTerm: deferredTerm }
}

// Usage
const { deferredTerm, isStale } = useDeferredSearch(search)
const { filtered, isStale } = useDeferredFilter(items, search, matchesSearch)

// ❌ Avoid - Generic or unclear
const useDeferred = (value: string) => { ... }
const useDelayed = (term: string) => { ... }
```

### **`useFilteredData`**

Generic hook for filtered data with deferred updates.

```tsx
// ✅ Good - Clear filtered data hook
interface UseFilteredDataOptions<T> {
  data: T[]
  searchTerm: string
  filterFn: (item: T, term: string) => boolean
  debounceMs?: number
}

const useFilteredData = <T,>({
  data,
  searchTerm,
  filterFn,
  debounceMs = 0
}: UseFilteredDataOptions<T>) => {
  const deferredTerm = useDeferredValue(searchTerm)
  const isStale = searchTerm !== deferredTerm

  const stableFilterFn = useCallback(filterFn, [])

  const filtered = useMemo(
    () => deferredTerm
      ? data.filter(item => stableFilterFn(item, deferredTerm))
      : data,
    [data, deferredTerm, stableFilterFn]
  )

  return { filtered, isStale, searchTerm: deferredTerm }
}

// Usage
const { filtered, isStale } = useFilteredData({
  data: users,
  searchTerm: search,
  filterFn: (user, term) => user.name.includes(term)
})

// ❌ Avoid - Unclear purpose
const useFilter = (data, term, fn) => { ... }
const useData = (options) => { ... }
```

## **Deferred Values**

Variables holding deferred state.

### **`deferredValue`**

The delayed version of a frequently changing value.

```tsx
// ✅ Good - Clear deferred value naming
const deferredSearchTerm = useDeferredValue(searchTerm)
const deferredFilter = useDeferredValue(filterValue)
const deferredQuery = useDeferredValue(query)

// Usage
const results = useMemo(
  () => data.filter(item => matches(item, deferredSearchTerm)),
  [data, deferredSearchTerm]
)

// ❌ Avoid - Unclear or inconsistent
const delayedSearch = useDeferredValue(searchTerm)
const search2 = useDeferredValue(searchTerm)
```

### **`deferredTerm`&#32;/&#32;`deferredQuery`**

Specific deferred values for search/query contexts.

```tsx
// ✅ Good - Context-specific deferred values
const useDeferredSearch = (searchTerm: string) => {
  const deferredTerm = useDeferredValue(searchTerm)
  const isStale = searchTerm !== deferredTerm
  return { deferredTerm, isStale }
}

const useDeferredQuery = (query: SearchQuery) => {
  const deferredQuery = useDeferredValue(query)
  const isStale = query !== deferredQuery
  return { deferredQuery, isStale }
}

// ❌ Avoid - Generic naming
const value = useDeferredValue(searchTerm)
const deferred = useDeferredValue(query)
```

## **State Indicators**

Boolean flags indicating deferred state status.

### **`isStale`**

Indicates the deferred value is behind the current value.

```tsx
// ✅ Good - Clear stale state indicator
const deferredTerm = useDeferredValue(searchTerm)
const isStale = searchTerm !== deferredTerm

// Usage in UI
<div style={{ opacity: isStale ? 0.7 : 1 }}>
  <ResultsList items={filtered} />
</div>

{isStale && <LoadingIndicator />}

// ❌ Avoid - Unclear or inconsistent
const loading = searchTerm !== deferredTerm
const pending = searchTerm !== deferredTerm
```

### **`isPending`**

Indicates a transition is in progress (when using startTransition).

```tsx
// ✅ Good - Clear pending state with startTransition
const [isPending, startTransition] = useTransition()
const [search, setSearch] = useState('')

const handleSearchChange = (value: string) => {
  setSearch(value)
  startTransition(() => {
    // Non-urgent update
    setDeferredResults(filterResults(value))
  })
}

// Usage
<SearchInput
  value={search}
  onChange={handleSearchChange}
  isPending={isPending}
/>

// ❌ Avoid - Unclear state
const loading = isPending
const busy = isPending
```

## **Transition Methods**

Methods for marking updates as non-urgent.

### **`startTransition`**

Marks state updates as non-urgent, allowing React to interrupt them.

```tsx
// ✅ Good - Clear transition usage
const [isPending, startTransition] = useTransition()

const handleFilterChange = (newFilter: Filter) => {
  // Urgent: update input immediately
  setFilter(newFilter)

  // Non-urgent: defer expensive filtering
  startTransition(() => {
    setFilteredItems(applyFilter(items, newFilter))
  })
}

// ❌ Avoid - Unclear or misused
const [pending, transition] = useTransition()
transition(() => setFilter(newFilter)) // Wrong: input should be urgent
```

## **Filtered/Computed Values**

Results of deferred computations.

### **`filtered`&#32;/&#32;`filteredItems`**

Results after applying deferred filter.

```tsx
// ✅ Good - Clear filtered results
const { filtered, isStale } = useFilteredData({
  data: items,
  searchTerm: search,
  filterFn: matchesSearch
})

const filteredUsers = useMemo(
  () => users.filter(user => matches(user, deferredTerm)),
  [users, deferredTerm]
)

// Usage
<ResultsList items={filtered} isLoading={isStale} />

// ❌ Avoid - Unclear or generic
const results = useFilteredData(...)
const data = useMemo(...)
```

### **`deferredResults`**

Explicitly deferred computation results.

```tsx
// ✅ Good - Clear deferred results
const [results, setResults] = useState<Item[]>([])
const [deferredResults, setDeferredResults] = useState<Item[]>([])

const handleSearch = (term: string) => {
  setSearch(term)
  startTransition(() => {
    setDeferredResults(searchItems(term))
  })
}

// ❌ Avoid - Unclear relationship
const [results1, setResults1] = useState<Item[]>([])
const [results2, setResults2] = useState<Item[]>([])
```

## **Memoization**

Memoized values for deferred computations.

### **`stableFilterFn`**

Memoized filter function to prevent unnecessary recalculations.

```tsx
// ✅ Good - Stable function reference
const useFilteredData = <T,>({
  data,
  searchTerm,
  filterFn
}: UseFilteredDataOptions<T>) => {
  const deferredTerm = useDeferredValue(searchTerm)

  // Prevent filterFn from changing on every render
  const stableFilterFn = useCallback(filterFn, [])

  const filtered = useMemo(
    () => data.filter(item => stableFilterFn(item, deferredTerm)),
    [data, deferredTerm, stableFilterFn]
  )

  return { filtered, isStale: searchTerm !== deferredTerm }
}

// ❌ Avoid - Unstable references
const filtered = useMemo(
  () => data.filter(item => filterFn(item, deferredTerm)),
  [data, deferredTerm, filterFn] // filterFn changes every render
)
```

## **UI Component Props**

Props for components using deferred rendering.

```tsx
// ✅ Good - Clear deferred state props
interface SearchListProps {
  items: Item[]
  searchTerm: string
  isSearching?: boolean
  isStale?: boolean
}

const SearchList = ({ items, searchTerm, isSearching, isStale }: SearchListProps) => {
  const { filtered, isStale: isFilterStale } = useFilteredData({
    data: items,
    searchTerm,
    filterFn: matchesSearch
  })

  return (
    <div style={{ opacity: isFilterStale ? 0.7 : 1 }}>
      <ResultsList items={filtered} />
      {isFilterStale && <LoadingSpinner />}
    </div>
  )
}

// ❌ Avoid - Unclear state props
interface SearchListProps {
  items: Item[]
  term: string
  loading?: boolean
  pending?: boolean
}
```

## **Composition Patterns**

Combining deferred rendering with other patterns.

### **`useSearch`**

Complete search hook with deferred filtering.

```tsx
// ✅ Good - Comprehensive search hook
const useSearch = <T,>(
  items: T[],
  searchFn: (item: T, term: string) => boolean
) => {
  const [search, setSearch] = useState('')

  const { filtered, isStale } = useFilteredData({
    data: items,
    searchTerm: search,
    filterFn: searchFn
  })

  return {
    search,
    setSearch,
    results: filtered,
    isSearching: isStale
  }
}

// Usage
const SearchableList = ({ items }: { items: Item[] }) => {
  const { search, setSearch, results, isSearching } = useSearch(
    items,
    (item, term) => item.name.toLowerCase().includes(term.toLowerCase())
  )

  return (
    <div>
      <SearchInput value={search} onChange={setSearch} />
      <ResultsList items={results} isLoading={isSearching} />
    </div>
  )
}
```

## **Performance Optimization Props**

Props for controlling deferred rendering behavior.

```tsx
// ✅ Good - Clear performance control props
interface UseDeferredDataOptions<T> {
  data: T[]
  searchTerm: string
  filterFn: (item: T, term: string) => boolean
  debounceMs?: number
  minSearchLength?: number
  maxResults?: number
}

const useDeferredData = <T,>({
  data,
  searchTerm,
  filterFn,
  debounceMs = 0,
  minSearchLength = 0,
  maxResults
}: UseDeferredDataOptions<T>) => {
  const deferredTerm = useDeferredValue(searchTerm)
  const isStale = searchTerm !== deferredTerm

  const filtered = useMemo(() => {
    if (deferredTerm.length < minSearchLength) return data

    const results = data.filter(item => filterFn(item, deferredTerm))
    return maxResults ? results.slice(0, maxResults) : results
  }, [data, deferredTerm, filterFn, minSearchLength, maxResults])

  return { filtered, isStale }
}

// ❌ Avoid - Unclear optimization props
interface Options<T> {
  data: T[]
  term: string
  fn: (item: T, term: string) => boolean
  delay?: number
  min?: number
  max?: number
}
```

---

# Naming Error Boundary Components

## **Pattern Structure**

Error boundaries use descriptive names indicating error handling scope:

```typescript
ErrorBoundary + scope? + purpose?
```

Names should clearly indicate what errors are caught and how they're handled.

| **Name**        | **Type**  | **Purpose**                     |
| --------------- | --------- | ------------------------------- |
| `ErrorBoundary` | component | Generic error boundary          |
| `error`         | state     | Caught error object             |
| `reset`         | method    | Clears error state              |
| `fallback`      | prop      | Error UI renderer               |
| `resetKeys`     | prop      | Dependencies that trigger reset |

## **Component Naming**

Error boundary component names.

### **`ErrorBoundary`**

Generic error boundary for catching React errors.

```tsx
// ✅ Good - Clear error boundary naming
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo)
  }

  reset = () => this.setState({ error: null })

  render() {
    if (this.state.error) {
      return this.props.fallback(this.state.error, this.reset)
    }
    return this.props.children
  }
}

// ❌ Avoid - Generic or unclear
class Boundary extends Component { ... }
class ErrorHandler extends Component { ... }
```

### **Scoped Error Boundaries**

Error boundaries for specific contexts.

```tsx
// ✅ Good - Context-specific error boundaries
const RouteErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary
    fallback={(error, reset) => <RouteError error={error} onRetry={reset} />}
    onError={(error) => logRouteError(error)}
  >
    {children}
  </ErrorBoundary>
)

const WidgetErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary
    fallback={(error, reset) => <WidgetError error={error} onRetry={reset} />}
  >
    {children}
  </ErrorBoundary>
)

const AsyncErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary
    fallback={(error, reset) => <AsyncError error={error} onRetry={reset} />}
    onError={(error) => logAsyncError(error)}
  >
    {children}
  </ErrorBoundary>
)

// ❌ Avoid - Unclear scope
const Boundary1 = () => { ... }
const CustomErrorBoundary = () => { ... }
```

## **Props**

Props for configuring error boundaries.

### **`fallback`**

Function that renders error UI.

```tsx
// ✅ Good - Clear fallback prop
interface ErrorBoundaryProps {
  children: ReactNode
  fallback: (error: Error, reset: () => void) => ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  resetKeys?: unknown[]
}

// Usage
<ErrorBoundary
  fallback={(error, reset) => (
    <ErrorFallback error={error} onRetry={reset} />
  )}
>
  <App />
</ErrorBoundary>

// ❌ Avoid - Unclear or inconsistent
interface ErrorBoundaryProps {
  renderError?: (error: Error) => ReactNode
  errorComponent?: ReactNode
}
```

### **`onError`**

Callback invoked when error is caught.

```tsx
// ✅ Good - Clear error callback
interface ErrorBoundaryProps {
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

// Usage
<ErrorBoundary
  fallback={(error, reset) => <ErrorUI error={error} />}
  onError={(error, errorInfo) => {
    logErrorToService(error, errorInfo)
    analytics.track('error_occurred', {
      message: error.message,
      componentStack: errorInfo.componentStack
    })
  }}
>
  <App />
</ErrorBoundary>

// ❌ Avoid - Unclear callback
interface ErrorBoundaryProps {
  handleError?: (error: Error) => void
  errorHandler?: (error: Error) => void
}
```

### **`resetKeys`**

Array of values that trigger error reset when changed.

```tsx
// ✅ Good - Clear reset dependencies
interface ErrorBoundaryProps {
  resetKeys?: unknown[]
}

// Usage - Reset error when user changes
const App = () => {
  const [userId, setUserId] = useState<string>()

  return (
    <ErrorBoundary
      fallback={(error, reset) => <ErrorUI error={error} onRetry={reset} />}
      resetKeys={[userId]}
    >
      <Dashboard userId={userId} />
    </ErrorBoundary>
  )
}

// Implementation
componentDidUpdate(prevProps: ErrorBoundaryProps) {
  const { resetKeys } = this.props
  const { error } = this.state

  if (error && resetKeys && prevProps.resetKeys) {
    const hasResetKeyChanged = resetKeys.some(
      (key, index) => key !== prevProps.resetKeys?.[index]
    )
    if (hasResetKeyChanged) {
      this.reset()
    }
  }
}

// ❌ Avoid - Unclear reset mechanism
interface ErrorBoundaryProps {
  dependencies?: unknown[]
  watchKeys?: unknown[]
}
```

## **State**

Error boundary internal state.

### **`error`**

The caught error object.

```tsx
// ✅ Good - Clear error state
interface ErrorBoundaryState {
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }
}

// ❌ Avoid - Unclear or generic
interface ErrorBoundaryState {
  err: Error | null
  hasError: boolean
}
```

### **`errorInfo`**

Additional error information from React.

```tsx
// ✅ Good - Storing error info for debugging
interface ErrorBoundaryState {
  error: Error | null
  errorInfo: ErrorInfo | null
}

componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  this.setState({ errorInfo })
  this.props.onError?.(error, errorInfo)
}

// Usage in fallback
render() {
  const { error, errorInfo } = this.state
  if (error) {
    return this.props.fallback(error, errorInfo, this.reset)
  }
  return this.props.children
}

// ❌ Avoid - Losing error context
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  this.props.onError?.(error, errorInfo)
  // errorInfo not stored
}
```

## **Methods**

Error boundary methods.

### **`reset`**

Clears error state to retry rendering.

```tsx
// ✅ Good - Clear reset method
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  reset = () => {
    this.setState({ error: null, errorInfo: null })
  }

  render() {
    if (this.state.error) {
      return this.props.fallback(this.state.error, this.reset)
    }
    return this.props.children
  }
}

// Usage in fallback
const ErrorFallback = ({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) => (
  <div>
    <h2>Something went wrong</h2>
    <pre>{error.message}</pre>
    <button onClick={reset}>Try again</button>
  </div>
)

// ❌ Avoid - Unclear or inconsistent
class ErrorBoundary extends Component {
  clear = () => this.setState({ error: null })
  retry = () => this.setState({ error: null })
}
```

## **Fallback Components**

Components for rendering error UI.

### **`ErrorFallback`**

Generic error fallback component.

```tsx
// ✅ Good - Clear fallback component
interface ErrorFallbackProps {
  error: Error
  reset: () => void
  title?: string
}

const ErrorFallback = ({
  error,
  reset,
  title = 'Something went wrong'
}: ErrorFallbackProps) => (
  <div className="error-fallback">
    <h2>{title}</h2>
    <pre className="error-message">{error.message}</pre>
    <button onClick={reset} className="retry-button">
      Try again
    </button>
  </div>
)

// Usage
<ErrorBoundary
  fallback={(error, reset) => (
    <ErrorFallback error={error} reset={reset} />
  )}
>
  <App />
</ErrorBoundary>

// ❌ Avoid - Generic or unclear
const Error = ({ error }: { error: Error }) => { ... }
const Fallback = ({ error }: { error: Error }) => { ... }
```

### **Context-Specific Fallbacks**

Fallback components for specific error contexts.

```tsx
// ✅ Good - Context-specific fallbacks
const RouteErrorFallback = ({
  error,
  reset
}: ErrorFallbackProps) => (
  <div className="route-error">
    <h2>Page Not Found</h2>
    <p>{error.message}</p>
    <button onClick={reset}>Go Home</button>
  </div>
)

const WidgetErrorFallback = ({
  error,
  reset
}: ErrorFallbackProps) => (
  <div className="widget-error">
    <p>Widget failed to load</p>
    <button onClick={reset}>Retry</button>
  </div>
)

const DataErrorFallback = ({
  error,
  reset
}: ErrorFallbackProps) => (
  <div className="data-error">
    <h3>Failed to load data</h3>
    <p>{error.message}</p>
    <button onClick={reset}>Reload</button>
  </div>
)

// ❌ Avoid - Generic naming
const Error1 = () => { ... }
const CustomError = () => { ... }
```

## **Error Logging**

Functions for logging errors.

### **`logErrorToService`**

Logs error to external service.

```tsx
// ✅ Good - Clear error logging
const logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
  // Send to error tracking service
  errorTracker.captureException(error, {
    extra: {
      componentStack: errorInfo.componentStack
    }
  })
}

// Usage
<ErrorBoundary
  fallback={(error, reset) => <ErrorFallback error={error} reset={reset} />}
  onError={(error, errorInfo) => {
    logErrorToService(error, errorInfo)
  }}
>
  <App />
</ErrorBoundary>

// ❌ Avoid - Unclear logging
const log = (error: Error) => { ... }
const sendError = (error: Error) => { ... }
```

## **Composition Patterns**

Combining multiple error boundaries.

### **Nested Boundaries**

Multiple error boundaries for granular error handling.

```tsx
// ✅ Good - Granular error boundaries
const App = () => (
  <ErrorBoundary
    fallback={(error, reset) => <AppErrorFallback error={error} reset={reset} />}
    onError={logErrorToService}
  >
    <Layout>
      <ErrorBoundary
        fallback={(error, reset) => <WidgetError onRetry={reset} />}
      >
        <StatsWidget />
      </ErrorBoundary>

      <ErrorBoundary
        fallback={(error, reset) => <WidgetError onRetry={reset} />}
      >
        <ChartWidget />
      </ErrorBoundary>
    </Layout>
  </ErrorBoundary>
)

// Benefits: Widget errors don't crash entire app
```

### **Error Boundary with Suspense**

Combining error boundaries with Suspense.

```tsx
// ✅ Good - Error boundary wrapping Suspense
const DataView = () => (
  <ErrorBoundary
    fallback={(error, reset) => <DataError error={error} onRetry={reset} />}
  >
    <Suspense fallback={<LoadingSpinner />}>
      <AsyncData />
    </Suspense>
  </ErrorBoundary>
)

// Handles both loading and error states
```

## **Hook-Based Error Boundaries**

Using hooks for error boundary logic (React 18+).

```tsx
// ✅ Good - Hook-based error handling
const useErrorHandler = () => {
  const [error, setError] = useState<Error | null>(null)

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  const handleError = useCallback((error: Error) => {
    setError(error)
    logErrorToService(error)
  }, [])

  return { error, resetError, handleError }
}

// Usage with error boundary
const App = () => {
  const { error, resetError, handleError } = useErrorHandler()

  if (error) {
    return <ErrorFallback error={error} reset={resetError} />
  }

  return (
    <ErrorBoundary onError={handleError}>
      <Content />
    </ErrorBoundary>
  )
}
```

---

# Naming Children Transformation Components

## **Pattern Structure**

Children transformation uses descriptive names indicating the transformation applied:

```typescript
transform/enhance + Children + purpose?
```

Names should clearly indicate what transformation is applied to children.

| **Name**        | **Type** | **Purpose**                             |
| --------------- | -------- | --------------------------------------- |
| `enhancedChild` | variable | Transformed child element               |
| `cloneElement`  | method   | React method for cloning with new props |
| `Children.map`  | method   | Iterates and transforms children        |
| `injectProps`   | function | Adds props to children                  |

## **Component Naming**

Components that transform children.

### **`[Context]Provider`&#32;Pattern**

Components that enhance children with context-specific props.

```tsx
// ✅ Good - Clear provider naming
const FormField = ({ children, label, error, required }: FormFieldProps) => {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  const enhancedChild = cloneElement(children, {
    id,
    'aria-invalid': !!error,
    'aria-describedby': [
      error && errorId,
      hint && hintId
    ].filter(Boolean).join(' ') || undefined,
    'aria-required': required
  })

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {enhancedChild}
      {error && <span id={errorId}>{error}</span>}
    </div>
  )
}

const AccessibilityProvider = ({ children }: { children: ReactElement }) => {
  const enhancedChild = cloneElement(children, {
    role: 'region',
    'aria-label': 'Main content'
  })
  return enhancedChild
}

// ❌ Avoid - Generic or unclear
const Wrapper = ({ children }: { children: ReactElement }) => { ... }
const Enhancer = ({ children }: { children: ReactElement }) => { ... }
```

## **Variables**

Variables for transformed children.

### **`enhancedChild`&#32;/&#32;`enhancedChildren`**

Child elements with additional props injected.

```tsx
// ✅ Good - Clear enhanced child naming
const FormField = ({ children, label, error }: FormFieldProps) => {
  const id = useId()

  const enhancedChild = cloneElement(children, {
    id,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined
  })

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {enhancedChild}
      {error && <span id={`${id}-error`}>{error}</span>}
    </div>
  )
}

// Multiple children
const FormFieldGroup = ({ children }: { children: ReactElement[] }) => {
  const enhancedChildren = Children.map(children, (child, index) =>
    cloneElement(child, {
      key: index,
      tabIndex: index
    })
  )

  return <div>{enhancedChildren}</div>
}

// ❌ Avoid - Unclear or generic
const newChild = cloneElement(children, { ... })
const child2 = cloneElement(children, { ... })
```

### **`clonedChild`&#32;/&#32;`clonedChildren`**

When emphasizing the cloning operation.

```tsx
// ✅ Good - Emphasizing clone operation
const WithTooltip = ({
  children,
  tooltip
}: {
  children: ReactElement
  tooltip: string
}) => {
  const clonedChild = cloneElement(children, {
    'aria-label': tooltip,
    title: tooltip
  })

  return clonedChild
}

// ❌ Avoid - Unclear relationship
const child = cloneElement(children, { ... })
const element = cloneElement(children, { ... })
```

## **Transformation Functions**

Functions that transform children.

### **`injectProps`**

Adds props to child elements.

```tsx
// ✅ Good - Clear prop injection
const injectProps = <P extends object>(
  child: ReactElement,
  props: P
): ReactElement => {
  return cloneElement(child, props)
}

// Usage
const FormField = ({ children, error }: FormFieldProps) => {
  const id = useId()

  const enhancedChild = injectProps(children, {
    id,
    'aria-invalid': !!error
  })

  return <div>{enhancedChild}</div>
}

// ❌ Avoid - Unclear purpose
const addProps = (child, props) => cloneElement(child, props)
const enhance = (child, props) => cloneElement(child, props)
```

### **`transformChild`&#32;/&#32;`transformChildren`**

Generic transformation function.

```tsx
// ✅ Good - Clear transformation function
const transformChild = (
  child: ReactElement,
  transformer: (props: any) => object
): ReactElement => {
  const additionalProps = transformer(child.props)
  return cloneElement(child, additionalProps)
}

// Usage
const FormField = ({ children }: { children: ReactElement }) => {
  const enhancedChild = transformChild(children, (props) => ({
    id: useId(),
    className: `${props.className} form-input`
  }))

  return enhancedChild
}

// ❌ Avoid - Generic or unclear
const modify = (child, fn) => cloneElement(child, fn(child.props))
const update = (child, fn) => cloneElement(child, fn(child.props))
```

### **`mapChildren`**

Maps over children with transformation.

```tsx
// ✅ Good - Clear children mapping
const mapChildren = (
  children: ReactNode,
  fn: (child: ReactElement, index: number) => ReactElement
): ReactNode => {
  return Children.map(children, fn)
}

// Usage
const List = ({ children }: { children: ReactNode }) => {
  const enhancedChildren = mapChildren(children, (child, index) =>
    cloneElement(child, {
      key: index,
      'data-index': index
    })
  )

  return <ul>{enhancedChildren}</ul>
}

// ❌ Avoid - Unclear mapping
const map = (children, fn) => Children.map(children, fn)
const iterate = (children, fn) => Children.map(children, fn)
```

## **Props for Injection**

Props that will be injected into children.

### **`injectedProps`&#32;/&#32;`additionalProps`**

Props object to be spread into children.

```tsx
// ✅ Good - Clear injected props
const FormField = ({ children, label, error }: FormFieldProps) => {
  const id = useId()

  const injectedProps = {
    id,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${id}-error` : undefined
  }

  const enhancedChild = cloneElement(children, injectedProps)

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {enhancedChild}
    </div>
  )
}

// Alternative naming
const additionalProps = {
  id,
  'aria-invalid': !!error
}

// ❌ Avoid - Unclear or generic
const props = { id, 'aria-invalid': !!error }
const newProps = { id, 'aria-invalid': !!error }
```

## **Accessibility Enhancement**

Transformations for accessibility.

### **`enhanceWithA11y`&#32;/&#32;`injectA11yProps`**

Adds accessibility props to children.

```tsx
// ✅ Good - Clear accessibility enhancement
const enhanceWithA11y = (
  child: ReactElement,
  a11yProps: {
    label?: string
    describedBy?: string
    invalid?: boolean
  }
): ReactElement => {
  return cloneElement(child, {
    'aria-label': a11yProps.label,
    'aria-describedby': a11yProps.describedBy,
    'aria-invalid': a11yProps.invalid
  })
}

// Usage
const FormField = ({ children, label, error }: FormFieldProps) => {
  const id = useId()

  const enhancedChild = enhanceWithA11y(children, {
    describedBy: error ? `${id}-error` : undefined,
    invalid: !!error
  })

  return <div>{enhancedChild}</div>
}

// ❌ Avoid - Unclear purpose
const addA11y = (child, props) => cloneElement(child, props)
const withAccessibility = (child, props) => cloneElement(child, props)
```

## **Event Handler Composition**

Composing event handlers when transforming children.

### **`composeEventHandlers`**

Combines parent and child event handlers.

```tsx
// ✅ Good - Clear event handler composition
const composeEventHandlers = <E,>(
  ourHandler?: (event: E) => void,
  theirHandler?: (event: E) => void
) => {
  return (event: E) => {
    theirHandler?.(event)
    if (!(event as any).defaultPrevented) {
      ourHandler?.(event)
    }
  }
}

// Usage in transformation
const FormField = ({ children, onChange }: FormFieldProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Field changed')
    onChange?.(e.target.value)
  }

  const enhancedChild = cloneElement(children, {
    onChange: composeEventHandlers(handleChange, children.props.onChange)
  })

  return enhancedChild
}

// ❌ Avoid - Overriding child handlers
const enhancedChild = cloneElement(children, {
  onChange: handleChange // Loses child's onChange
})
```

## **Type Guards**

Type checking for children transformation.

### **`isValidElement`**

Checks if child is a valid React element.

```tsx
// ✅ Good - Type-safe children transformation
const FormField = ({ children, label }: FormFieldProps) => {
  if (!isValidElement(children)) {
    console.warn('FormField children must be a valid React element')
    return children
  }

  const enhancedChild = cloneElement(children, {
    id: useId(),
    'aria-label': label
  })

  return enhancedChild
}

// ❌ Avoid - No type checking
const FormField = ({ children }: FormFieldProps) => {
  const enhancedChild = cloneElement(children, { ... }) // May error
  return enhancedChild
}
```

## **Conditional Transformation**

Transforming children based on conditions.

### **`shouldEnhance`&#32;/&#32;`shouldTransform`**

Boolean indicating if transformation should apply.

```tsx
// ✅ Good - Conditional transformation
const FormField = ({
  children,
  error,
  enhanceInput = true
}: FormFieldProps) => {
  const id = useId()
  const shouldEnhance = enhanceInput && isValidElement(children)

  if (!shouldEnhance) {
    return children
  }

  const enhancedChild = cloneElement(children, {
    id,
    'aria-invalid': !!error
  })

  return (
    <div>
      <label htmlFor={id}>Label</label>
      {enhancedChild}
    </div>
  )
}

// ❌ Avoid - Unclear conditions
const FormField = ({ children, error }: FormFieldProps) => {
  if (error) {
    return cloneElement(children, { ... })
  }
  return children
}
```

## **Composition Patterns**

Combining multiple transformations.

### **`composeTransformations`**

Applies multiple transformations in sequence.

```tsx
// ✅ Good - Composing transformations
const composeTransformations = (
  child: ReactElement,
  ...transformers: Array<(child: ReactElement) => ReactElement>
): ReactElement => {
  return transformers.reduce(
    (transformedChild, transformer) => transformer(transformedChild),
    child
  )
}

// Usage
const FormField = ({ children, label, error }: FormFieldProps) => {
  const id = useId()

  const addId = (child: ReactElement) =>
    cloneElement(child, { id })

  const addA11y = (child: ReactElement) =>
    cloneElement(child, {
      'aria-invalid': !!error,
      'aria-describedby': error ? `${id}-error` : undefined
    })

  const addClassName = (child: ReactElement) =>
    cloneElement(child, {
      className: `${child.props.className} form-input`
    })

  const enhancedChild = composeTransformations(
    children,
    addId,
    addA11y,
    addClassName
  )

  return <div>{enhancedChild}</div>
}

// ❌ Avoid - Nested cloneElement calls
const enhancedChild = cloneElement(
  cloneElement(
    cloneElement(children, { id }),
    { 'aria-invalid': !!error }
  ),
  { className: 'form-input' }
)
```

## **Common Transformation Patterns**

| **Pattern**      | **Transformation**           | **Use Case**        |
| ---------------- | ---------------------------- | ------------------- |
| `FormField`      | Injects `id`, `aria-*` props | Form accessibility  |
| `WithTooltip`    | Adds `title`, `aria-label`   | Tooltips            |
| `WithTracking`   | Adds analytics handlers      | Event tracking      |
| `WithStyles`     | Adds `className`, `style`    | Styling             |
| `WithValidation` | Adds validation props        | Form validation     |
| `WithFocus`      | Adds focus management        | Keyboard navigation |

---

# Naming Headless Components

## **Pattern Structure**

Headless components separate logic from presentation using hooks and render props:

```typescript
use + Context + purpose
```

Names should clearly indicate the logic provided without prescribing UI.

| **Name**         | **Type**    | **Purpose**                   |
| ---------------- | ----------- | ----------------------------- |
| `use[Feature]`   | hook        | Provides headless logic       |
| `[Feature]Props` | type        | Props returned by hook        |
| `children`       | render prop | Consumer-controlled rendering |
| `[action]Props`  | object      | Props for specific elements   |

## **Hook Naming**

Headless hooks that provide logic without UI.

### **`use[Feature]`**

Hook providing complete feature logic.

```tsx
// ✅ Good - Clear feature hooks
const useDisclosure = (options?: UseDisclosureOptions) => {
  const [isOpen, setIsOpen] = useState(options?.defaultOpen ?? false)
  const panelId = useId()

  const open = useCallback(() => {
    setIsOpen(true)
    options?.onOpenChange?.(true)
  }, [options])

  const close = useCallback(() => {
    setIsOpen(false)
    options?.onOpenChange?.(false)
  }, [options])

  const toggle = useCallback(() => {
    setIsOpen(prev => {
      const next = !prev
      options?.onOpenChange?.(next)
      return next
    })
  }, [options])

  return {
    isOpen,
    open,
    close,
    toggle,
    buttonProps: {
      'aria-expanded': isOpen,
      'aria-controls': panelId,
      onClick: toggle
    },
    panelProps: {
      id: panelId,
      hidden: !isOpen
    }
  }
}

const useCombobox = <T,>(options: UseComboboxOptions<T>) => { ... }
const useSelect = <T,>(options: UseSelectOptions<T>) => { ... }
const usePagination = (options: UsePaginationOptions) => { ... }

// ❌ Avoid - Generic or unclear
const useLogic = () => { ... }
const useComponent = () => { ... }
```

### **`use[Feature]State`**

Hook providing only state management.

```tsx
// ✅ Good - State-focused hooks
const useToggleState = (defaultValue = false) => {
  const [isOn, setIsOn] = useState(defaultValue)

  const toggle = useCallback(() => setIsOn(prev => !prev), [])
  const setOn = useCallback(() => setIsOn(true), [])
  const setOff = useCallback(() => setIsOn(false), [])

  return { isOn, toggle, setOn, setOff }
}

const useSelectionState = <T,>(items: T[]) => {
  const [selected, setSelected] = useState<Set<T>>(new Set())

  const select = useCallback((item: T) => {
    setSelected(prev => new Set(prev).add(item))
  }, [])

  const deselect = useCallback((item: T) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.delete(item)
      return next
    })
  }, [])

  return { selected, select, deselect }
}

// ❌ Avoid - Unclear state focus
const useToggle = () => { ... }
const useSelection = () => { ... }
```

## **Return Object Properties**

Properties returned by headless hooks.

### **State Properties**

Current state values.

```tsx
// ✅ Good - Clear state properties
interface UseDisclosureReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

interface UseSelectReturn<T> {
  value: T | null
  isOpen: boolean
  highlightedIndex: number
}

// ❌ Avoid - Unclear or inconsistent
interface UseDisclosureReturn {
  open: boolean  // Unclear: is it state or action?
  show: () => void
  hide: () => void
}
```

### **Action Methods**

Methods for state changes.

```tsx
// ✅ Good - Clear action methods
interface UseDisclosureReturn {
  open: () => void
  close: () => void
  toggle: () => void
}

interface UseSelectReturn<T> {
  selectItem: (item: T) => void
  clearSelection: () => void
  highlightItem: (index: number) => void
}

// ❌ Avoid - Unclear actions
interface UseDisclosureReturn {
  change: () => void
  update: (val: boolean) => void
}
```

### **`[element]Props`**

Props objects for specific elements.

```tsx
// ✅ Good - Element-specific props
interface UseDisclosureReturn {
  buttonProps: {
    'aria-expanded': boolean
    'aria-controls': string
    onClick: () => void
  }
  panelProps: {
    id: string
    hidden: boolean
  }
}

interface UseComboboxReturn<T> {
  inputProps: {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
    'aria-autocomplete': 'list'
    'aria-controls': string
  }
  listProps: {
    id: string
    role: 'listbox'
  }
  getItemProps: (item: T, index: number) => {
    role: 'option'
    'aria-selected': boolean
    onClick: () => void
  }
}

// Usage
const { inputProps, listProps, getItemProps } = useCombobox(options)

<input {...inputProps} />
<ul {...listProps}>
  {items.map((item, index) => (
    <li key={item.id} {...getItemProps(item, index)}>
      {item.label}
    </li>
  ))}
</ul>

// ❌ Avoid - Generic or unclear
interface UseDisclosureReturn {
  props1: { ... }
  props2: { ... }
}
```

## **Getter Functions**

Functions that return props for dynamic elements.

### **`get[Element]Props`**

Returns props for a specific element instance.

```tsx
// ✅ Good - Clear getter functions
interface UseSelectReturn<T> {
  getItemProps: (item: T, index: number) => {
    role: 'option'
    'aria-selected': boolean
    onClick: () => void
    onMouseEnter: () => void
  }

  getTriggerProps: () => {
    'aria-expanded': boolean
    'aria-haspopup': 'listbox'
    onClick: () => void
  }
}

// Usage
const { getItemProps, getTriggerProps } = useSelect(options)

<button {...getTriggerProps()}>Select</button>
<ul>
  {items.map((item, index) => (
    <li key={item.id} {...getItemProps(item, index)}>
      {item.label}
    </li>
  ))}
</ul>

// ❌ Avoid - Unclear or inconsistent
interface UseSelectReturn<T> {
  itemProps: (item: T) => { ... }
  propsForItem: (item: T) => { ... }
}
```

## **Options Interfaces**

Configuration options for headless hooks.

### **`Use[Feature]Options`**

Options interface for hook configuration.

```tsx
// ✅ Good - Clear options interface
interface UseDisclosureOptions {
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
}

interface UseSelectOptions<T> {
  items: T[]
  value?: T | null
  defaultValue?: T | null
  onValueChange?: (value: T | null) => void
  isDisabled?: boolean
  getItemLabel?: (item: T) => string
  getItemValue?: (item: T) => string
}

interface UsePaginationOptions {
  totalItems: number
  itemsPerPage: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

// Usage
const disclosure = useDisclosure({
  defaultOpen: false,
  onOpenChange: (isOpen) => console.log('Open:', isOpen)
})

// ❌ Avoid - Generic or unclear
interface DisclosureConfig { ... }
interface SelectProps<T> { ... }  // Conflicts with component props
```

## **Render Prop Components**

Wrapper components using headless hooks with render props.

### **`[Feature]`&#32;Component**

Component that uses headless hook and provides render prop.

```tsx
// ✅ Good - Render prop component
interface DisclosureProps extends UseDisclosureOptions {
  children: (disclosure: UseDisclosureReturn) => ReactNode
}

const Disclosure = ({ children, ...options }: DisclosureProps) => {
  const disclosure = useDisclosure(options)
  return <>{children(disclosure)}</>
}

// Usage - Complete control over rendering
<Disclosure defaultOpen={false}>
  {({ isOpen, buttonProps, panelProps }) => (
    <div>
      <button {...buttonProps}>
        {isOpen ? 'Hide' : 'Show'} Details
      </button>
      <div {...panelProps}>
        <p>Content here</p>
      </div>
    </div>
  )}
</Disclosure>

// ❌ Avoid - Unclear render prop
const Disclosure = ({ render, ...options }: DisclosureProps) => {
  const disclosure = useDisclosure(options)
  return render(disclosure)
}
```

## **Composed Headless Hooks**

Combining multiple headless hooks.

### **`use[Feature]Group`**

Hook managing multiple related instances.

```tsx
// ✅ Good - Group management hook
const useAccordionGroup = (options?: {
  allowMultiple?: boolean
  defaultOpenItems?: string[]
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(options?.defaultOpenItems)
  )

  const register = (id: string) => {
    const isOpen = openItems.has(id)

    return useDisclosure({
      defaultOpen: isOpen,
      onOpenChange: (open) => {
        setOpenItems(prev => {
          const next = new Set(options?.allowMultiple ? prev : [])
          if (open) {
            next.add(id)
          } else {
            next.delete(id)
          }
          return next
        })
      }
    })
  }

  return { register, openItems }
}

// Usage
const AccordionGroup = () => {
  const { register } = useAccordionGroup({ allowMultiple: false })

  return (
    <div>
      <AccordionItem disclosure={register('item-1')} />
      <AccordionItem disclosure={register('item-2')} />
    </div>
  )
}

// ❌ Avoid - Unclear group management
const useAccordion = () => { ... }
const useMultiple = () => { ... }
```

## **Accessibility Props**

Accessibility-related props in headless hooks.

```tsx
// ✅ Good - Clear accessibility props
interface UseComboboxReturn<T> {
  inputProps: {
    role: 'combobox'
    'aria-autocomplete': 'list'
    'aria-expanded': boolean
    'aria-controls': string
    'aria-activedescendant': string | undefined
  }
  listProps: {
    role: 'listbox'
    'aria-label': string
  }
  getItemProps: (item: T, index: number) => {
    role: 'option'
    'aria-selected': boolean
    'aria-disabled': boolean
  }
}

// ❌ Avoid - Missing or inconsistent a11y props
interface UseComboboxReturn<T> {
  inputProps: {
    expanded: boolean  // Should be aria-expanded
    controls: string   // Should be aria-controls
  }
}
```

## **State Selectors**

Functions for querying state.

### **`is[State]`&#32;/&#32;`has[State]`**

Boolean state queries.

```tsx
// ✅ Good - Clear state selectors
interface UseSelectReturn<T> {
  isOpen: boolean
  isDisabled: boolean
  hasSelection: boolean
  isItemSelected: (item: T) => boolean
  isItemHighlighted: (index: number) => boolean
}

// Usage
const { isOpen, isItemSelected, isItemHighlighted } = useSelect(options)

<ul>
  {items.map((item, index) => (
    <li
      key={item.id}
      data-selected={isItemSelected(item)}
      data-highlighted={isItemHighlighted(index)}
    >
      {item.label}
    </li>
  ))}
</ul>

// ❌ Avoid - Unclear selectors
interface UseSelectReturn<T> {
  open: boolean
  selected: (item: T) => boolean
}
```

## **Common Headless Patterns**

| **Pattern** | **Hook Name**   | **Key Returns**                             |
| ----------- | --------------- | ------------------------------------------- |
| Disclosure  | `useDisclosure` | `isOpen`, `buttonProps`, `panelProps`       |
| Select      | `useSelect`     | `value`, `getItemProps`, `getTriggerProps`  |
| Combobox    | `useCombobox`   | `inputProps`, `listProps`, `getItemProps`   |
| Pagination  | `usePagination` | `currentPage`, `totalPages`, `getPageProps` |
| Tabs        | `useTabs`       | `activeTab`, `getTabProps`, `getPanelProps` |
| Menu        | `useMenu`       | `isOpen`, `getTriggerProps`, `getItemProps` |
| Tooltip     | `useTooltip`    | `isVisible`, `triggerProps`, `tooltipProps` |

---

# Naming Composition Utilities

## **Pattern Structure**

Composition utilities use descriptive names indicating their composition purpose:

```typescript
compose/combine + Context + purpose
```

Names should clearly indicate what is being composed and how.

| **Name**               | **Type** | **Purpose**                |
| ---------------------- | -------- | -------------------------- |
| `composeRefs`          | function | Combines multiple refs     |
| `composeEventHandlers` | function | Combines event handlers    |
| `composeProviders`     | function | Combines context providers |
| `mergeProps`           | function | Merges prop objects        |

## **Ref Composition**

Utilities for combining refs.

### **`useComposedRefs`**

Hook that combines multiple refs into one.

```tsx
// ✅ Good - Clear ref composition hook
const useComposedRefs = <T,>(...refs: (Ref<T> | undefined)[]) => {
  return useCallback((node: T | null) => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(node)
      } else {
        (ref as MutableRefObject<T | null>).current = node
      }
    })
  }, refs)
}

// Usage
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const internalRef = useRef<HTMLButtonElement>(null)
    const composedRef = useComposedRefs(forwardedRef, internalRef)

    return <button ref={composedRef} {...props} />
  }
)

// ❌ Avoid - Unclear or generic
const useRefs = (...refs) => { ... }
const useMergeRefs = (...refs) => { ... }
```

### **`composeRefs`**

Function version for composing refs.

```tsx
// ✅ Good - Clear ref composition function
const composeRefs = <T,>(...refs: (Ref<T> | undefined)[]) => {
  return (node: T | null) => {
    refs.forEach(ref => {
      if (!ref) return

      if (typeof ref === 'function') {
        ref(node)
      } else {
        (ref as MutableRefObject<T | null>).current = node
      }
    })
  }
}

// Usage
const composedRef = composeRefs(ref1, ref2, ref3)
<div ref={composedRef} />

// ❌ Avoid - Unclear composition
const mergeRefs = (...refs) => { ... }
const combineRefs = (...refs) => { ... }
```

## **Event Handler Composition**

Utilities for combining event handlers.

### **`composeEventHandlers`**

Combines multiple event handlers, respecting preventDefault.

```tsx
// ✅ Good - Clear event handler composition
const composeEventHandlers = <E,>(
  ourHandler?: (event: E) => void,
  theirHandler?: (event: E) => void
) => {
  return (event: E) => {
    theirHandler?.(event)

    // Only call our handler if default wasn't prevented
    if (!(event as any).defaultPrevented) {
      ourHandler?.(event)
    }
  }
}

// Usage in component
const Button = ({ onClick, ...props }: ButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log('Internal click handler')
  }

  return (
    <button
      onClick={composeEventHandlers(handleClick, onClick)}
      {...props}
    />
  )
}

// ❌ Avoid - Unclear or losing handlers
const mergeHandlers = (h1, h2) => (e) => { h1(e); h2(e) }
const combineClicks = (h1, h2) => h2  // Loses h1!
```

### **`chainEventHandlers`**

Chains handlers without preventDefault check.

```tsx
// ✅ Good - Clear handler chaining
const chainEventHandlers = <E,>(
  ...handlers: Array<((event: E) => void) | undefined>
) => {
  return (event: E) => {
    handlers.forEach(handler => handler?.(event))
  }
}

// Usage - When you want all handlers to run
const handleClick = chainEventHandlers(
  logClick,
  trackAnalytics,
  updateState
)

// ❌ Avoid - Unclear chaining
const runAll = (...handlers) => (e) => handlers.forEach(h => h?.(e))
```

## **Provider Composition**

Utilities for combining context providers.

### **`composeProviders`**

Combines multiple providers into one.

```tsx
// ✅ Good - Clear provider composition
const composeProviders = (
  ...providers: Array<React.FC<{ children: ReactNode }>>
) => {
  return ({ children }: { children: ReactNode }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children
    )
}

// Usage
const AppProviders = composeProviders(
  ThemeProvider,
  AuthProvider,
  QueryProvider,
  RouterProvider
)

const App = () => (
  <AppProviders>
    <Routes />
  </AppProviders>
)

// Alternative: with props
const composeProvidersWithProps = (
  ...providers: Array<{
    Provider: React.FC<any>
    props?: object
  }>
) => {
  return ({ children }: { children: ReactNode }) =>
    providers.reduceRight(
      (acc, { Provider, props = {} }) => (
        <Provider {...props}>{acc}</Provider>
      ),
      children
    )
}

// ❌ Avoid - Unclear composition
const combineProviders = (...providers) => { ... }
const mergeContexts = (...providers) => { ... }
```

## **Props Composition**

Utilities for merging props objects.

### **`mergeProps`**

Merges multiple props objects intelligently.

```tsx
// ✅ Good - Clear props merging
const mergeProps = <T extends object>(...propObjects: T[]): T => {
  return propObjects.reduce((acc, props) => {
    const merged = { ...acc }

    Object.keys(props).forEach(key => {
      const accValue = acc[key]
      const propsValue = props[key]

      // Merge className
      if (key === 'className') {
        merged[key] = [accValue, propsValue].filter(Boolean).join(' ')
      }
      // Merge style
      else if (key === 'style') {
        merged[key] = { ...accValue, ...propsValue }
      }
      // Compose event handlers
      else if (key.startsWith('on') && typeof propsValue === 'function') {
        merged[key] = composeEventHandlers(accValue, propsValue)
      }
      // Default: override
      else {
        merged[key] = propsValue
      }
    })

    return merged
  }, {} as T)
}

// Usage
const buttonProps = mergeProps(
  baseProps,
  variantProps,
  userProps
)

<button {...buttonProps} />

// ❌ Avoid - Simple spread (loses handlers)
const merged = { ...props1, ...props2 }  // Overwrites handlers
```

### **`mergeRefs`**

Alias for ref composition (alternative naming).

```tsx
// ✅ Good - Clear ref merging
const mergeRefs = <T,>(...refs: (Ref<T> | undefined)[]) => {
  return (node: T | null) => {
    refs.forEach(ref => {
      if (!ref) return
      if (typeof ref === 'function') {
        ref(node)
      } else {
        (ref as MutableRefObject<T | null>).current = node
      }
    })
  }
}

// Usage - Same as composeRefs
const mergedRef = mergeRefs(ref1, ref2)
```

## **Class Name Composition**

Utilities for combining class names.

### **`cn`&#32;/&#32;`classNames`**

Combines class names conditionally.

```tsx
// ✅ Good - Clear class name utility
const cn = (...classes: Array<string | undefined | false | null>) => {
  return classes.filter(Boolean).join(' ')
}

// Usage
const Button = ({ variant, size, isLoading, className }: ButtonProps) => {
  return (
    <button
      className={cn(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        isLoading && 'btn--loading',
        className
      )}
    />
  )
}

// Alternative: object syntax
const cn = (
  ...args: Array<string | Record<string, boolean> | undefined>
) => {
  return args
    .flatMap(arg => {
      if (typeof arg === 'string') return arg
      if (typeof arg === 'object') {
        return Object.entries(arg)
          .filter(([, value]) => value)
          .map(([key]) => key)
      }
      return []
    })
    .filter(Boolean)
    .join(' ')
}

// Usage with object
<button
  className={cn(
    'btn',
    {
      'btn--primary': variant === 'primary',
      'btn--loading': isLoading
    },
    className
  )}
/>

// ❌ Avoid - Unclear or inconsistent
const classes = (...args) => args.join(' ')
const cls = (...args) => args.filter(Boolean).join(' ')
```

## **Style Composition**

Utilities for merging style objects.

### **`mergeStyles`**

Merges multiple style objects.

```tsx
// ✅ Good - Clear style merging
const mergeStyles = (
  ...styles: Array<CSSProperties | undefined>
): CSSProperties => {
  return styles.reduce(
    (acc, style) => ({ ...acc, ...style }),
    {} as CSSProperties
  )
}

// Usage
const Component = ({ style, isHighlighted }: ComponentProps) => {
  const baseStyle: CSSProperties = {
    padding: '1rem',
    borderRadius: '4px'
  }

  const highlightStyle: CSSProperties = isHighlighted
    ? { backgroundColor: 'yellow' }
    : {}

  return (
    <div style={mergeStyles(baseStyle, highlightStyle, style)} />
  )
}

// ❌ Avoid - Simple spread (less clear)
const style = { ...baseStyle, ...highlightStyle, ...userStyle }
```

## **Function Composition**

Utilities for composing functions.

### **`compose`**

Composes functions right-to-left.

```tsx
// ✅ Good - Clear function composition
const compose = <T,>(...fns: Array<(arg: T) => T>) => {
  return (initialValue: T) =>
    fns.reduceRight((acc, fn) => fn(acc), initialValue)
}

// Usage
const addOne = (x: number) => x + 1
const double = (x: number) => x * 2
const square = (x: number) => x * x

const transform = compose(square, double, addOne)
transform(2)  // square(double(addOne(2))) = square(double(3)) = square(6) = 36

// ❌ Avoid - Unclear composition order
const combine = (...fns) => (val) => fns.reduce((acc, fn) => fn(acc), val)
```

### **`pipe`**

Composes functions left-to-right.

```tsx
// ✅ Good - Clear function piping
const pipe = <T,>(...fns: Array<(arg: T) => T>) => {
  return (initialValue: T) =>
    fns.reduce((acc, fn) => fn(acc), initialValue)
}

// Usage - More intuitive order
const transform = pipe(addOne, double, square)
transform(2)  // square(double(addOne(2))) = 36

// ❌ Avoid - Unclear direction
const flow = (...fns) => (val) => fns.reduce((acc, fn) => fn(acc), val)
```

## **HOC Composition**

Utilities for composing higher-order components.

### **`composeHOCs`**

Composes multiple HOCs.

```tsx
// ✅ Good - Clear HOC composition
const composeHOCs = <P extends object>(
  ...hocs: Array<(Component: ComponentType<P>) => ComponentType<P>>
) => {
  return (Component: ComponentType<P>) =>
    hocs.reduceRight((acc, hoc) => hoc(acc), Component)
}

// Usage
const enhance = composeHOCs(
  withAuth,
  withTheme,
  withAnalytics
)

const EnhancedComponent = enhance(BaseComponent)

// ❌ Avoid - Manual nesting
const EnhancedComponent = withAuth(withTheme(withAnalytics(BaseComponent)))
```

## **Prop Getter Composition**

Utilities for composing prop getter functions.

### **`composeGetters`**

Combines multiple prop getter functions.

```tsx
// ✅ Good - Clear getter composition
const composeGetters = <T extends object>(
  ...getters: Array<() => Partial<T>>
) => {
  return (): T => {
    return getters.reduce(
      (acc, getter) => mergeProps(acc, getter()),
      {} as T
    )
  }
}

// Usage
const useButton = () => {
  const getBaseProps = () => ({
    type: 'button' as const,
    className: 'btn'
  })

  const getA11yProps = () => ({
    role: 'button',
    'aria-pressed': false
  })

  const getEventProps = () => ({
    onClick: handleClick,
    onKeyDown: handleKeyDown
  })

  const getButtonProps = composeGetters(
    getBaseProps,
    getA11yProps,
    getEventProps
  )

  return { getButtonProps }
}

// ❌ Avoid - Manual merging
const getButtonProps = () => ({
  ...getBaseProps(),
  ...getA11yProps(),
  ...getEventProps()
})
```

## **Common Composition Patterns**

| **Utility**            | **Purpose**       | **Use Case**               |
| ---------------------- | ----------------- | -------------------------- |
| `composeRefs`          | Combine refs      | Forward ref + internal ref |
| `composeEventHandlers` | Combine handlers  | Internal + user handlers   |
| `composeProviders`     | Combine providers | App-level provider setup   |
| `mergeProps`           | Merge props       | Combining prop sources     |
| `cn`                   | Combine classes   | Conditional styling        |
| `compose`              | Compose functions | Data transformations       |
| `composeHOCs`          | Compose HOCs      | Multiple enhancements      |

---

### References

These naming guides are based on modern React patterns and best practices as of 2024, emphasizing:

- Type safety with TypeScript
- Accessibility (ARIA attributes)
- Composition over inheritance
- Clear, self-documenting code
- Functional programming principles
