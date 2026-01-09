# Presentation/UI Layer Naming Conventions Guide

## Core Principles (S-I-D)

Names must be **Short**, **Intuitive**, and **Descriptive**:

- **Short** — Quick to type and remember
- **Intuitive** — Reads naturally, close to spoken language
- **Descriptive** — Efficiently reflects purpose and behavior

```tsx
/* Bad */
const m = true // "m" is meaningless
const isModalOpenable = hasPermission // Unnatural phrasing
const shouldModalize = true // Made-up verb

/* Good */
const isModalOpen = true
const canOpenModal = hasPermission
const shouldShowModal = true
```

---

## Universal Naming Rules

### ❌ Never Use Contractions

```tsx
/* Bad */
const onBtnClk = () => {}
const usrMsg = "Hello"

/* Good */
const onButtonClick = () => {}
const userMessage = "Hello"
```

### ❌ Avoid Context Duplication

Remove redundant context that doesn't improve clarity:

```tsx
/* Bad - Component context */
const ModalDialog = () => {
  const handleModalDialogClose = () => {} // Redundant
  const modalDialogTitle = "Settings" // Redundant
}

/* Good */
const ModalDialog = () => {
  const handleClose = () => {}
  const title = "Settings"
}

/* Bad - Hook context */
const useTooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false) // Redundant
}

/* Good */
const useTooltip = () => {
  const [isVisible, setIsVisible] = useState(false)
}
```

### ✅ Reflect Expected Result

Name variables based on how they'll be used:

```tsx
/* Bad */
const isEnabled = itemCount <= 3
return <Button disabled={!isEnabled} /> // Double negative

/* Good */
const isDisabled = itemCount <= 3
return <Button disabled={isDisabled} />

/* Bad */
const shouldHide = isVisible
return <div hidden={!shouldHide} /> // Confusing

/* Good */
const shouldShow = isVisible
return <div hidden={!shouldShow} />
```

---

## Prefixes for Presentation Logic

### **`is`** — Characteristic or Current State

Describes a boolean characteristic or state of the UI element:

```tsx
const isOpen = true
const isVisible = opacity > 0
const isAnimating = animationState === 'running'
const isFocused = document.activeElement === elementRef.current
const isCollapsed = height === 0
const isDragging = dragState.active
```

### **`has`** — Possession or Capability

Indicates the presence of something or a capability:

```tsx
const hasError = errors.length > 0
const hasOverflow = scrollHeight > clientHeight
const hasFocus = focusedIndex !== -1
const hasAnimation = animationDuration > 0
const hasBackdrop = backdropOpacity > 0
```

### **`should`** — Conditional Action

Represents a positive conditional coupled with an action:

```tsx
const shouldRender = isVisible && !isDestroyed
const shouldAnimate = prefersReducedMotion === false
const shouldTrapFocus = isModal && isOpen
const shouldShowTooltip = isHovered && !isTouchDevice
const shouldVirtualize = itemCount > 100
```

### **`can`** — Permission or Ability

Indicates whether an action is possible (often based on UI state):

```tsx
const canClose = !isLoading && isDismissible
const canSubmit = !hasErrors && isTouched
const canNavigateNext = currentIndex < maxIndex
const canScroll = contentHeight > containerHeight
const canExpand = !isExpanded && hasChildren
```

### **`will`** — Future State Prediction

Indicates an upcoming state change (use sparingly):

```tsx
const willUnmount = shouldRender === false && isAnimating
const willOverflow = nextContentWidth > containerWidth
```

---

## Presentation-Specific Action Verbs

| Action         | Usage                        | Example                                    |
| -------------- | ---------------------------- | ------------------------------------------ |
| **`show`**     | Make visible (declarative)   | `showModal()`, `showTooltip()`             |
| **`hide`**     | Make invisible (declarative) | `hideDropdown()`, `hideBanner()`           |
| **`open`**     | Transition to open state     | `openDialog()`, `openAccordion()`          |
| **`close`**    | Transition to closed state   | `closeMenu()`, `closeSidebar()`            |
| **`toggle`**   | Switch between states        | `toggleTheme()`, `toggleExpanded()`        |
| **`expand`**   | Increase size/visibility     | `expandPanel()`, `expandRow()`             |
| **`collapse`** | Decrease size/visibility     | `collapseSection()`, `collapseAll()`       |
| **`focus`**    | Set focus state              | `focusInput()`, `focusFirstElement()`      |
| **`blur`**     | Remove focus state           | `blurField()`, `blurActiveElement()`       |
| **`scroll`**   | Change scroll position       | `scrollToTop()`, `scrollIntoView()`        |
| **`animate`**  | Trigger animation            | `animateEntry()`, `animateTransition()`    |
| **`mount`**    | Add to DOM                   | `mountPortal()`, `mountOverlay()`          |
| **`unmount`**  | Remove from DOM              | `unmountToast()`, `unmountModal()`         |
| **`render`**   | Compute/return JSX           | `renderItem()`, `renderEmpty()`            |
| **`handle`**   | Respond to event             | `handleClick()`, `handleKeyDown()`         |
| **`compute`**  | Calculate UI value           | `computePosition()`, `computeStyles()`     |
| **`format`**   | Transform for display        | `formatTruncated()`, `formatHighlighted()` |

---

## Category-Specific Patterns

### 1. Visual State Management

**Pattern:** `prefix? + action + stateType + context?`

| Name                | Prefix   | Action   | State Type | Context |
| ------------------- | -------- | -------- | ---------- | ------- |
| `isModalOpen`       | `is`     | —        | `Modal`    | `Open`  |
| `toggleSidebar`     | —        | `toggle` | `Sidebar`  | —       |
| `openDropdown`      | —        | `open`   | `Dropdown` | —       |
| `closeDialog`       | —        | `close`  | `Dialog`   | —       |
| `shouldShowTooltip` | `should` | `Show`   | `Tooltip`  | —       |

```tsx
/* Hook naming */
const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(prev => !prev)

  return { isOpen, open, close, toggle }
}

/* Component state */
const Accordion = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const expandItem = (id: string) => setExpandedId(id)
  const collapseItem = () => setExpandedId(null)
  const isExpanded = (id: string) => expandedId === id
}
```

### 2. User Interactions

**Pattern:** `handle + eventType + target? + context?`

| Name                 | Action   | Event Type | Target   | Context   |
| -------------------- | -------- | ---------- | -------- | --------- |
| `handleClick`        | `handle` | `Click`    | —        | —         |
| `handleButtonClick`  | `handle` | `Click`    | `Button` | —         |
| `handleClickOutside` | `handle` | `Click`    | —        | `Outside` |
| `handleKeyDown`      | `handle` | `KeyDown`  | —        | —         |
| `handleEscapeKey`    | `handle` | `Key`      | `Escape` | —         |
| `handleDragStart`    | `handle` | `Drag`     | —        | `Start`   |
| `handleSwipeLeft`    | `handle` | `Swipe`    | —        | `Left`    |

```tsx
/* Event handlers */
const Modal = () => {
  const handleClose = () => {}
  const handleBackdropClick = () => {}
  const handleEscapeKey = (e: KeyboardEvent) => {}

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
}

/* Gesture handlers */
const Carousel = () => {
  const handleSwipeLeft = () => navigateNext()
  const handleSwipeRight = () => navigatePrevious()
  const handleDragEnd = (velocity: number) => {}
}
```

### 3. Animations & Transitions

**Pattern:** `prefix? + animationState/action + element?`

| Name            | Prefix   | State/Action | Element | Notes             |
| --------------- | -------- | ------------ | ------- | ----------------- |
| `isAnimating`   | `is`     | `Animating`  | —       | Current state     |
| `shouldAnimate` | `should` | `Animate`    | —       | Conditional       |
| `animateEntry`  | —        | `animate`    | —       | `Entry`           |
| `animateExit`   | —        | `animate`    | —       | `Exit`            |
| `hasEntered`    | `has`    | `Entered`    | —       | Completed state   |
| `isEntering`    | `is`     | `Entering`   | —       | In-progress state |

```tsx
/* Animation state hook */
const useAnimatedMount = (isMounted: boolean) => {
  const [shouldRender, setShouldRender] = useState(isMounted)
  const [isEntering, setIsEntering] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)

  const animateEntry = () => setIsEntering(true)
  const animateExit = () => setIsExiting(true)

  return { shouldRender, isEntering, isExiting, hasEntered }
}

/* Transition states */
const FadeTransition = () => {
  const [transitionState, setTransitionState] = useState<
    'entering' | 'entered' | 'exiting' | 'exited'
  >('exited')

  const isVisible = transitionState !== 'exited'
  const isAnimating = transitionState === 'entering' || transitionState === 'exiting'
}
```

### 4. Forms & Input State

**Pattern:** `prefix? + state + field/form?`

| Name              | Prefix   | State        | Context | Notes             |
| ----------------- | -------- | ------------ | ------- | ----------------- |
| `isFocused`       | `is`     | `Focused`    | —       | Current focus     |
| `isTouched`       | `is`     | `Touched`    | —       | User interacted   |
| `isDirty`         | `is`     | `Dirty`      | —       | Value changed     |
| `hasError`        | `has`    | `Error`      | —       | Validation failed |
| `isValidating`    | `is`     | `Validating` | —       | In progress       |
| `shouldShowError` | `should` | `Show`       | `Error` | Display logic     |

```tsx
/* Field state management */
const useFieldState = (name: string) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => {
    setIsFocused(false)
    setIsTouched(true)
  }
  const handleChange = () => setIsDirty(true)

  const shouldShowError = isTouched && !isFocused

  return { isFocused, isTouched, isDirty, shouldShowError }
}

/* Form-level state */
const useFormState = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const canSubmit = isValid && !isSubmitting && !hasErrors
}
```

---

## TypeScript-Specific Conventions

### Type/Interface Naming

```tsx
/* Props types - suffix with Props */
interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

/* State types - suffix with State */
interface TooltipState {
  isVisible: boolean
  position: Position
}

/* Hook return types - suffix with Return or Result */
interface UseDisclosureReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

/* Event handler types - prefix with Handle */
type HandleClick = (event: React.MouseEvent) => void
type HandleKeyDown = (event: React.KeyboardEvent) => void

/* Render function types */
type RenderItem<T> = (item: T, index: number) => React.ReactNode
type RenderEmpty = () => React.ReactNode
```

### Generic Type Parameters

```tsx
/* Use descriptive single letters or full words */
type UseListReturn<TItem> = {
  items: TItem[]
  selectedItem: TItem | null
}

type AsyncContentProps<TData, TError = Error> = {
  data: TData | null
  error: TError | null
  isLoading: boolean
}

/* For multiple related types */
type UseFormReturn<TValues, TErrors> = {
  values: TValues
  errors: TErrors
  handleSubmit: (values: TValues) => void
}
```

---

## Anti-Patterns to Avoid

### ❌ Ambiguous Boolean Names

```tsx
/* Bad - unclear what true/false means */
const visible = true
const enabled = false
const active = true

/* Good - clear positive/negative */
const isVisible = true
const isDisabled = false
const isActive = true
```

### ❌ Verb-Noun Confusion

```tsx
/* Bad - mixing verbs and nouns */
const openModal = true // Is this a boolean or function?
const closeDialog = () => {} // Inconsistent with above

/* Good - consistent patterns */
const isModalOpen = true
const closeDialog = () => {}

// OR

const openModal = () => {}
const closeDialog = () => {}
```

### ❌ Overly Generic Names

```tsx
/* Bad - too generic for presentation layer */
const data = { x: 10, y: 20 }
const state = 'active'
const value = true

/* Good - specific to UI concern */
const tooltipPosition = { x: 10, y: 20 }
const animationState = 'active'
const isMenuOpen = true
```

### ❌ Inconsistent Tense/Voice

```tsx
/* Bad - mixing tenses */
const isOpening = true // Present continuous
const hasOpened = false // Past perfect
const willOpen = () => {} // Future

/* Good - consistent present tense */
const isOpen = false
const isAnimating = true
const open = () => {}
```

### ❌ Double Negatives

```tsx
/* Bad */
const isNotHidden = true
const shouldNotDisable = false
return <Button disabled={!shouldNotDisable} />

/* Good */
const isVisible = true
const shouldEnable = true
return <Button disabled={!shouldEnable} />
```

### ❌ Mixing UI and Business Concerns

```tsx
/* Bad - business logic in presentation names */
const calculateUserDiscount = () => {} // Business logic
const isEligibleForPremium = user.points > 1000 // Business rule

/* Good - pure presentation concerns */
const computeTooltipPosition = () => {} // UI calculation
const shouldShowUpgradeBanner = hasPermission // UI display logic
```

### ❌ Unclear Handler Scope

```tsx
/* Bad - unclear what handles what */
const onClick = () => {} // Too generic
const click = () => {} // Not a handler
const onClickHandler = () => {} // Redundant "Handler"

/* Good - clear and consistent */
const handleClick = () => {}
const handleButtonClick = () => {} // When specificity needed
const handleModalClose = () => {}
```

---

## Practical Examples by Category

### Modals & Dialogs

```tsx
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const handleBackdropClick = () => closeModal()
  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
  }

  const shouldRender = isOpen || isAnimating
  const shouldTrapFocus = isOpen

  return {
    isOpen,
    isAnimating,
    shouldRender,
    shouldTrapFocus,
    openModal,
    closeModal,
    handleBackdropClick,
    handleEscapeKey
  }
}
```

### Tooltips & Popovers

```tsx
const useTooltip = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const showTooltip = () => setIsVisible(true)
  const hideTooltip = () => setIsVisible(false)
  const computePosition = (target: HTMLElement) => {
    // Calculate optimal position
  }

  const handleMouseEnter = () => showTooltip()
  const handleMouseLeave = () => hideTooltip()
  const handleFocus = () => showTooltip()
  const handleBlur = () => hideTooltip()

  const shouldShow = isVisible && position.x !== 0

  return {
    isVisible,
    position,
    shouldShow,
    showTooltip,
    hideTooltip,
    computePosition,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur
  }
}
```

### Dropdowns & Menus

```tsx
const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const openDropdown = () => setIsOpen(true)
  const closeDropdown = () => {
    setIsOpen(false)
    setFocusedIndex(-1)
  }
  const toggleDropdown = () => setIsOpen(prev => !prev)

  const focusNext = () => setFocusedIndex(prev => prev + 1)
  const focusPrevious = () => setFocusedIndex(prev => prev - 1)
  const focusFirst = () => setFocusedIndex(0)
  const focusLast = () => setFocusedIndex(itemCount - 1)

  const handleTriggerClick = () => toggleDropdown()
  const handleItemClick = (index: number) => {
    selectItem(index)
    closeDropdown()
  }
  const handleKeyDown = (e: KeyboardEvent) => {
    // Navigation logic
  }

  const shouldShowDropdown = isOpen && itemCount > 0
  const canNavigateNext = focusedIndex < itemCount - 1
  const canNavigatePrevious = focusedIndex > 0

  return {
    isOpen,
    focusedIndex,
    highlightedIndex,
    shouldShowDropdown,
    canNavigateNext,
    canNavigatePrevious,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    focusNext,
    focusPrevious,
    handleTriggerClick,
    handleItemClick,
    handleKeyDown
  }
}
```

---

## Quick Reference: A/HC/LC Pattern for Presentation

**Pattern:** `prefix? + action (A) + highContext (HC) + lowContext? (LC)`

| Name                     | Prefix   | Action    | High Context | Low Context |
| ------------------------ | -------- | --------- | ------------ | ----------- |
| `isModalOpen`            | `is`     | —         | `Modal`      | `Open`      |
| `shouldShowTooltip`      | `should` | `Show`    | `Tooltip`    | —           |
| `handleButtonClick`      | —        | `handle`  | `Button`     | `Click`     |
| `toggleSidebarCollapsed` | —        | `toggle`  | `Sidebar`    | `Collapsed` |
| `computeTooltipPosition` | —        | `compute` | `Tooltip`    | `Position`  |
| `animateModalEntry`      | —        | `animate` | `Modal`      | `Entry`     |
| `formatTruncatedText`    | —        | `format`  | `Truncated`  | `Text`      |
| `canSubmitForm`          | `can`    | `Submit`  | `Form`       | —           |

---

**Remember:** Presentation naming should make UI behavior self-documenting. A developer should understand what a component does, what state it manages, and how users interact with it—purely from reading the names.
