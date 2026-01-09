# Business Logic Naming Conventions Guide

## Core Principles (S-I-D)

Names must be **Short**, **Intuitive**, and **Descriptive**:

- **Short** — Quick to type and remember
- **Intuitive** — Reads naturally, reflects domain language
- **Descriptive** — Clearly conveys the business operation or rule

```tsx
/* Bad */
const p = calculatePrice(items) // "p" is meaningless
const isCheckable = canCheckout // Unnatural phrasing
const shouldProcessify = true // Made-up verb

/* Good */
const totalPrice = calculatePrice(items)
const canCheckout = hasValidPaymentMethod
const shouldProcessOrder = true
```

---

## Universal Naming Rules

### ❌ Never Use Contractions

```tsx
/* Bad */
const calcTax = (amt: number) => amt * 0.1
const validateAddr = (address: string) => {}

/* Good */
const calculateTax = (amount: number) => amount * 0.1
const validateAddress = (address: string) => {}
```

### ❌ Avoid Context Duplication

Remove redundant context that doesn't improve clarity:

```tsx
/* Bad - Function/module context */
// In orderCalculations.ts
const calculateOrderTotal = () => {} // "Order" is redundant
const calculateOrderTax = () => {}

/* Good */
// In orderCalculations.ts
const calculateTotal = () => {}
const calculateTax = () => {}

/* Bad - Hook context */
const useUserAuth = () => {
  const validateUserCredentials = () => {} // "User" redundant
  const checkUserPermissions = () => {}
}

/* Good */
const useUserAuth = () => {
  const validateCredentials = () => {}
  const checkPermissions = () => {}
}
```

### ✅ Reflect Expected Result

Name variables based on their semantic meaning:

```tsx
/* Bad */
const isInvalid = age >= 18 // Confusing logic
const shouldNotProcess = hasErrors // Double negative

/* Good */
const isEligible = age >= 18
const shouldSkipProcessing = hasErrors

/* Bad */
const hasNoItems = cart.length === 0
if (hasNoItems) return // Double negative in usage

/* Good */
const isEmpty = cart.length === 0
if (isEmpty) return
```

### ✅ Use Domain Language

Prefer business terminology over technical jargon:

```tsx
/* Bad - Technical focus */
const filterArray = (items: Item[]) => items.filter(i => i.active)
const mapUserObject = (data: ApiUser) => ({ id: data.user_id })

/* Good - Domain focus */
const getActiveProducts = (products: Product[]) => products.filter(p => p.active)
const normalizeCustomer = (data: ApiUser) => ({ id: data.user_id })
```

---

## Prefixes for Business Logic

### **`is`** — State or Characteristic

Describes a boolean characteristic or current state:

```tsx
const isEligible = age >= 18 && hasConsent
const isExpired = expirationDate < new Date()
const isValid = errors.length === 0
const isPremium = subscription.tier === 'premium'
const isRefundable = purchaseDate.diffDays(today) <= 30
const isInStock = inventory.quantity > 0
```

### **`has`** — Possession or Presence

Indicates the presence of something:

```tsx
const hasDiscount = discountCode !== null
const hasPermission = permissions.includes('admin')
const hasErrors = validationErrors.length > 0
const hasExpired = expirationDate < now
const hasSufficientFunds = balance >= amount
const hasActiveSubscription = subscription.status === 'active'
```

### **`can`** — Capability or Permission

Indicates whether an action is allowed or possible:

```tsx
const canCheckout = hasItems && hasPaymentMethod && hasShippingAddress
const canRefund = isWithinRefundWindow && !isAlreadyRefunded
const canUpgrade = currentTier < targetTier && hasPaymentMethod
const canAccessFeature = hasPermission || isTrialActive
const canApplyDiscount = isEligibleForDiscount && !hasExistingDiscount
```

### **`should`** — Conditional Logic

Represents a positive conditional coupled with an action:

```tsx
const shouldApplyTax = customer.region.requiresTax
const shouldSendNotification = user.preferences.emailEnabled && isImportantEvent
const shouldRetry = attemptCount < maxRetries && isRetryableError
const shouldEscalate = priority === 'high' && responseTime > threshold
const shouldArchive = lastAccessDate.diffDays(today) > 365
```

### **`will`** — Future State Prediction

Indicates an upcoming state (use sparingly, prefer `should`):

```tsx
const willExpire = daysUntilExpiration <= 7
const willExceedLimit = currentUsage + newUsage > limit
const willRequireApproval = amount > autoApprovalThreshold
```

### **`needs`** — Requirement Check

Indicates a requirement that must be satisfied:

```tsx
const needsVerification = !user.isVerified && accountAge > 30
const needsApproval = amount > approvalThreshold
const needsReview = riskScore > reviewThreshold
```

---

## Business Logic Action Verbs

### Core Actions Table

| Action           | Usage                   | Business Context          | Example                                           |
| ---------------- | ----------------------- | ------------------------- | ------------------------------------------------- |
| **`calculate`**  | Compute derived values  | Pricing, totals, metrics  | `calculateTax()`, `calculateDiscount()`           |
| **`compute`**    | Complex calculations    | Algorithms, scoring       | `computeRiskScore()`, `computeShipping()`         |
| **`validate`**   | Check business rules    | Constraints, requirements | `validateAge()`, `validateCoupon()`               |
| **`verify`**     | Confirm authenticity    | Identity, credentials     | `verifyPayment()`, `verifyIdentity()`             |
| **`check`**      | Quick boolean test      | Eligibility, status       | `checkEligibility()`, `checkInventory()`          |
| **`determine`**  | Decide based on rules   | Classification, routing   | `determineShipping()`, `determineTier()`          |
| **`evaluate`**   | Assess against criteria | Scoring, qualification    | `evaluateCredit()`, `evaluateRisk()`              |
| **`assess`**     | Analyze and judge       | Risk, quality             | `assessRisk()`, `assessCompliance()`              |
| **`apply`**      | Execute business rule   | Discounts, fees, rules    | `applyDiscount()`, `applyLateFee()`               |
| **`process`**    | Execute workflow        | Orders, payments          | `processPayment()`, `processRefund()`             |
| **`transform`**  | Change data shape       | Normalization, mapping    | `transformApiResponse()`, `transformLegacyData()` |
| **`normalize`**  | Standardize format      | Data cleaning             | `normalizePhoneNumber()`, `normalizeAddress()`    |
| **`format`**     | Display formatting      | Currency, dates           | `formatCurrency()`, `formatTaxId()`               |
| **`parse`**      | Extract structure       | Input processing          | `parseOrderNumber()`, `parseDateRange()`          |
| **`derive`**     | Extract from source     | Computed properties       | `deriveFullName()`, `deriveStatus()`              |
| **`aggregate`**  | Combine multiple items  | Summaries, rollups        | `aggregateSales()`, `aggregateMetrics()`          |
| **`filter`**     | Select subset           | Queries, searches         | `filterEligibleUsers()`, `filterActiveOrders()`   |
| **`sort`**       | Order items             | Ranking, prioritization   | `sortByPriority()`, `sortByRelevance()`           |
| **`group`**      | Categorize items        | Organization              | `groupByCategory()`, `groupByRegion()`            |
| **`match`**      | Find correspondence     | Search, pairing           | `matchCustomer()`, `matchTransaction()`           |
| **`reconcile`**  | Resolve differences     | Data sync, accounting     | `reconcileInventory()`, `reconcilePayments()`     |
| **`sync`**       | Synchronize state       | Data consistency          | `syncOrderStatus()`, `syncInventory()`            |
| **`merge`**      | Combine entities        | Deduplication             | `mergeCustomerRecords()`, `mergeAccounts()`       |
| **`enrich`**     | Add information         | Data enhancement          | `enrichCustomerData()`, `enrichProduct()`         |
| **`classify`**   | Assign category         | Categorization            | `classifyTransaction()`, `classifyRisk()`         |
| **`prioritize`** | Assign importance       | Ranking, triage           | `prioritizeOrders()`, `prioritizeTasks()`         |
| **`allocate`**   | Distribute resources    | Resource management       | `allocateInventory()`, `allocateBudget()`         |
| **`reserve`**    | Hold resources          | Inventory, capacity       | `reserveStock()`, `reserveCapacity()`             |
| **`release`**    | Free resources          | Resource management       | `releaseReservation()`, `releaseHold()`           |
| **`authorize`**  | Grant permission        | Access control            | `authorizeTransaction()`, `authorizeAccess()`     |
| **`approve`**    | Accept request          | Workflows                 | `approveExpense()`, `approveLeave()`              |
| **`reject`**     | Deny request            | Workflows                 | `rejectApplication()`, `rejectClaim()`            |
| **`escalate`**   | Elevate priority        | Exception handling        | `escalateIssue()`, `escalateToManager()`          |
| **`retry`**      | Attempt again           | Error recovery            | `retryPayment()`, `retrySync()`                   |
| **`revert`**     | Undo change             | Rollback                  | `revertTransaction()`, `revertStatus()`           |
| **`expire`**     | Mark as ended           | Time-based rules          | `expireSession()`, `expireCoupon()`               |
| **`activate`**   | Enable feature          | Lifecycle                 | `activateSubscription()`, `activateAccount()`     |
| **`deactivate`** | Disable feature         | Lifecycle                 | `deactivateUser()`, `deactivatePromotion()`       |
| **`archive`**    | Move to storage         | Data retention            | `archiveOrder()`, `archiveConversation()`         |

---

## Category-Specific Patterns

### 1. Data Transformation & Formatting

**Pattern:** `action + sourceType + targetContext?`

| Name                   | Action        | Source Type   | Target Context | Notes               |
| ---------------------- | ------------- | ------------- | -------------- | ------------------- |
| `normalizeUser`        | `normalize`   | `User`        | —              | Standardize format  |
| `formatCurrency`       | `format`      | —             | `Currency`     | Display formatting  |
| `parseOrderId`         | `parse`       | —             | `OrderId`      | Extract structure   |
| `transformApiResponse` | `transform`   | `ApiResponse` | —              | Shape change        |
| `serializeFilters`     | `serialize`   | `Filters`     | —              | To string/storage   |
| `deserializeState`     | `deserialize` | `State`       | —              | From string/storage |

```tsx
/* Normalization - standardizing data structure */
const normalizeCustomer = (apiCustomer: ApiCustomer): Customer => ({
  id: apiCustomer.customer_id,
  fullName: `${apiCustomer.first_name} ${apiCustomer.last_name}`,
  email: apiCustomer.email.toLowerCase(),
  joinedAt: new Date(apiCustomer.created_at),
})

const normalizePhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 10 ? `+1${digits}` : `+${digits}`
}

/* Formatting - preparing for display */
const formatCurrency = (amount: number, currency: string): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)

const formatOrderNumber = (id: number, prefix: string = 'ORD'): string =>
  `${prefix}-${String(id).padStart(6, '0')}`

const formatTaxId = (taxId: string): string =>
  taxId.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1-$2.$3/$4-$5')

/* Parsing - extracting structure from strings */
const parseDateRange = (range: string): DateRange => {
  const [start, end] = range.split('to').map(s => new Date(s.trim()))
  return { start, end }
}

const parseSearchQuery = (query: string): SearchParams => {
  const terms = query.toLowerCase().split(' ')
  const filters = terms.filter(t => t.includes(':'))
  const keywords = terms.filter(t => !t.includes(':'))
  return { keywords, filters }
}

/* Transformation - changing data shape */
const transformOrderForApi = (order: Order): ApiOrderPayload => ({
  order_id: order.id,
  customer_id: order.customerId,
  line_items: order.items.map(transformLineItem),
  total_amount: order.total * 100, // Convert to cents
})

const transformLegacyUser = (legacy: LegacyUser): User => ({
  id: legacy.userId,
  email: legacy.emailAddress,
  profile: {
    name: legacy.userName,
    avatar: legacy.profilePicture,
  },
})
```

### 2. Validation & Business Rules

**Pattern:** `validate + subject + constraint?`

| Name                  | Action     | Subject         | Constraint | Returns              |
| --------------------- | ---------- | --------------- | ---------- | -------------------- |
| `validateEmail`       | `validate` | `Email`         | —          | `ValidationResult`   |
| `validateAge`         | `validate` | `Age`           | —          | `ValidationResult`   |
| `validateCoupon`      | `validate` | `Coupon`        | —          | `ValidationResult`   |
| `checkEligibility`    | `check`    | `Eligibility`   | —          | `boolean`            |
| `verifyPaymentMethod` | `verify`   | `PaymentMethod` | —          | `VerificationResult` |

```tsx
/* Validation - checking business rules */
type ValidationResult =
  | { valid: true }
  | { valid: false; error: string; code?: string }

const validateAge = (birthDate: Date): ValidationResult => {
  const age = calculateAge(birthDate)

  if (age < 18) {
    return {
      valid: false,
      error: 'Must be 18 or older',
      code: 'AGE_REQUIREMENT_NOT_MET'
    }
  }

  return { valid: true }
}

const validateCoupon = (
  code: string,
  order: Order,
  customer: Customer
): ValidationResult => {
  const coupon = findCoupon(code)

  if (!coupon) {
    return { valid: false, error: 'Invalid coupon code' }
  }

  if (coupon.expiresAt < new Date()) {
    return { valid: false, error: 'Coupon has expired' }
  }

  if (order.total < coupon.minimumPurchase) {
    return {
      valid: false,
      error: `Minimum purchase of ${formatCurrency(coupon.minimumPurchase)} required`
    }
  }

  if (coupon.firstTimeOnly && customer.orderCount > 0) {
    return { valid: false, error: 'Coupon valid for first-time customers only' }
  }

  return { valid: true }
}

const validateShippingAddress = (address: Address): ValidationResult => {
  const errors: string[] = []

  if (!address.street) errors.push('Street address is required')
  if (!address.city) errors.push('City is required')
  if (!address.postalCode) errors.push('Postal code is required')
  if (!isValidPostalCode(address.postalCode, address.country)) {
    errors.push('Invalid postal code format')
  }

  return errors.length > 0
    ? { valid: false, error: errors.join('; ') }
    : { valid: true }
}

/* Checking - quick boolean tests */
const checkInventoryAvailability = (
  productId: string,
  quantity: number
): boolean => {
  const inventory = getInventory(productId)
  return inventory.available >= quantity && inventory.status === 'active'
}

const checkEligibilityForDiscount = (customer: Customer): boolean =>
  customer.totalSpent > 1000 ||
  customer.loyaltyPoints > 500 ||
  customer.memberSince.diffMonths(new Date()) > 12

/* Verification - confirming authenticity */
const verifyPaymentMethod = async (
  paymentMethodId: string
): Promise<VerificationResult> => {
  const method = await fetchPaymentMethod(paymentMethodId)

  if (!method) {
    return { verified: false, reason: 'Payment method not found' }
  }

  if (method.status !== 'active') {
    return { verified: false, reason: 'Payment method is inactive' }
  }

  if (method.expiresAt < new Date()) {
    return { verified: false, reason: 'Payment method has expired' }
  }

  return { verified: true }
}
```

### 3. Calculation & Computation

**Pattern:** `calculate|compute + subject + context?`

| Name                | Action      | Subject       | Context | Notes           |
| ------------------- | ----------- | ------------- | ------- | --------------- |
| `calculateTotal`    | `calculate` | `Total`       | —       | Simple math     |
| `calculateTax`      | `calculate` | `Tax`         | —       | Business rule   |
| `computeShipping`   | `compute`   | `Shipping`    | —       | Complex logic   |
| `computeRiskScore`  | `compute`   | `RiskScore`   | —       | Algorithm       |
| `deriveOrderStatus` | `derive`    | `OrderStatus` | —       | From other data |

```tsx
/* Calculate - straightforward computations */
const calculateSubtotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)

const calculateTax = (subtotal: number, region: Region): number => {
  const rate = getTaxRate(region)
  return subtotal * rate
}

const calculateDiscount = (
  subtotal: number,
  coupon: Coupon | null
): number => {
  if (!coupon) return 0

  return coupon.type === 'percentage'
    ? subtotal * (coupon.value / 100)
    : Math.min(coupon.value, subtotal)
}

const calculateOrderTotal = (order: Order): OrderTotal => {
  const subtotal = calculateSubtotal(order.items)
  const discount = calculateDiscount(subtotal, order.coupon)
  const subtotalAfterDiscount = subtotal - discount
  const tax = calculateTax(subtotalAfterDiscount, order.region)
  const shipping = calculateShipping(order)

  return {
    subtotal,
    discount,
    tax,
    shipping,
    total: subtotalAfterDiscount + tax + shipping,
  }
}

/* Compute - complex algorithms */
const computeShippingCost = (order: Order): number => {
  const { weight, dimensions, destination, items } = order

  // Complex logic considering multiple factors
  const baseRate = getBaseShippingRate(destination)
  const weightSurcharge = weight > 10 ? (weight - 10) * 2 : 0
  const oversizeSurcharge = isOversized(dimensions) ? 15 : 0
  const expediteFee = order.shippingSpeed === 'express' ? 25 : 0

  const total = baseRate + weightSurcharge + oversizeSurcharge + expediteFee

  // Free shipping threshold
  return order.subtotal >= 100 ? 0 : total
}

const computeRiskScore = (transaction: Transaction): RiskScore => {
  let score = 0

  // Multiple risk factors
  if (transaction.amount > 1000) score += 20
  if (transaction.isInternational) score += 15
  if (transaction.customer.accountAge < 30) score += 25
  if (transaction.customer.failedTransactions > 2) score += 30
  if (isHighRiskCountry(transaction.destination)) score += 40

  return {
    score,
    level: score > 70 ? 'high' : score > 40 ? 'medium' : 'low',
    requiresReview: score > 70,
  }
}

const computeLoyaltyPoints = (order: Order, customer: Customer): number => {
  const basePoints = Math.floor(order.total)
  const tierMultiplier = getTierMultiplier(customer.tier)
  const bonusPoints = isPromotionalPeriod() ? basePoints * 0.5 : 0

  return Math.floor((basePoints * tierMultiplier) + bonusPoints)
}

/* Derive - extract from existing data */
const deriveOrderStatus = (order: Order): OrderStatus => {
  if (order.cancelledAt) return 'cancelled'
  if (order.refundedAt) return 'refunded'
  if (order.deliveredAt) return 'delivered'
  if (order.shippedAt) return 'shipped'
  if (order.paidAt) return 'processing'
  return 'pending'
}

const deriveSubscriptionState = (subscription: Subscription): SubscriptionState => {
  const now = new Date()

  if (subscription.cancelledAt && subscription.cancelledAt < now) {
    return 'cancelled'
  }

  if (subscription.expiresAt < now) {
    return subscription.autoRenew ? 'expired_renewable' : 'expired'
  }

  if (subscription.trialEndsAt && subscription.trialEndsAt > now) {
    return 'trial'
  }

  return 'active'
}
```

### 4. State Derivation & Filtering

**Pattern:** `get|filter|find + subject + criteria?`

| Name                  | Action   | Subject   | Criteria   | Returns      |
| --------------------- | -------- | --------- | ---------- | ------------ | ------ |
| `getActiveOrders`     | `get`    | `Orders`  | `Active`   | `Order[]`    |
| `filterEligibleUsers` | `filter` | `Users`   | `Eligible` | `User[]`     |
| `findMatchingProduct` | `find`   | `Product` | `Matching` | \`Product \\ | null\` |
| `selectFeaturedItems` | `select` | `Items`   | `Featured` | `Item[]`     |

```tsx
/* Get - retrieve with implicit filtering */
const getActiveSubscriptions = (subscriptions: Subscription[]): Subscription[] =>
  subscriptions.filter(s =>
    s.status === 'active' &&
    s.expiresAt > new Date()
  )

const getOverdueInvoices = (invoices: Invoice[]): Invoice[] =>
  invoices.filter(inv =>
    inv.status === 'unpaid' &&
    inv.dueDate < new Date()
  )

const getEligiblePromotions = (
  promotions: Promotion[],
  customer: Customer
): Promotion[] =>
  promotions.filter(promo =>
    promo.isActive &&
    promo.startsAt <= new Date() &&
    promo.endsAt >= new Date() &&
    meetsPromotionCriteria(promo, customer)
  )

/* Filter - explicit criteria-based selection */
const filterProductsByAvailability = (
  products: Product[],
  includeOutOfStock: boolean = false
): Product[] =>
  products.filter(p =>
    includeOutOfStock || p.inventory.quantity > 0
  )

const filterOrdersByDateRange = (
  orders: Order[],
  startDate: Date,
  endDate: Date
): Order[] =>
  orders.filter(order =>
    order.createdAt >= startDate &&
    order.createdAt <= endDate
  )

const filterUsersBySegment = (
  users: User[],
  segment: CustomerSegment
): User[] => {
  switch (segment) {
    case 'high_value':
      return users.filter(u => u.lifetimeValue > 5000)
    case 'at_risk':
      return users.filter(u =>
        u.lastPurchase.diffDays(new Date()) > 90 &&
        u.lifetimeValue > 1000
      )
    case 'new':
      return users.filter(u =>
        u.createdAt.diffDays(new Date()) <= 30
      )
    default:
      return users
  }
}

/* Find - locate single item */
const findApplicableShippingRate = (
  rates: ShippingRate[],
  order: Order
): ShippingRate | null =>
  rates.find(rate =>
    rate.minWeight <= order.weight &&
    rate.maxWeight >= order.weight &&
    rate.regions.includes(order.destination.region)
  ) ?? null

const findBestDiscount = (
  discounts: Discount[],
  order: Order
): Discount | null => {
  const applicable = discounts.filter(d =>
    isDiscountApplicable(d, order)
  )

  return applicable.reduce((best, current) =>
    calculateDiscountAmount(current, order) > calculateDiscountAmount(best, order)
      ? current
      : best
  , applicable[0] ?? null)
}

/* Select - curated subset */
const selectRecommendedProducts = (
  products: Product[],
  customer: Customer,
  limit: number = 5
): Product[] => {
  const scored = products.map(product => ({
    product,
    score: calculateRecommendationScore(product, customer),
  }))

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product)
}
```

### 5. Aggregation & Analytics

**Pattern:** `aggregate|summarize|calculate + metric + grouping?`

| Name                  | Action      | Metric    | Grouping   | Returns                |
| --------------------- | ----------- | --------- | ---------- | ---------------------- |
| `aggregateSales`      | `aggregate` | `Sales`   | —          | `SalesSummary`         |
| `summarizeByRegion`   | `summarize` | —         | `ByRegion` | `RegionSummary[]`      |
| `calculateMetrics`    | `calculate` | `Metrics` | —          | `Metrics`              |
| `groupOrdersByStatus` | `group`     | `Orders`  | `ByStatus` | `Map<Status, Order[]>` |

```tsx
/* Aggregate - combine multiple items */
const aggregateSalesByPeriod = (
  orders: Order[],
  period: 'day' | 'week' | 'month'
): SalesAggregate[] => {
  const grouped = groupBy(orders, order =>
    formatPeriod(order.createdAt, period)
  )

  return Array.from(grouped.entries()).map(([period, orders]) => ({
    period,
    orderCount: orders.length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
    averageOrderValue: orders.reduce((sum, o) => sum + o.total, 0) / orders.length,
  }))
}

const aggregateInventoryMetrics = (products: Product[]): InventoryMetrics => ({
  totalProducts: products.length,
  totalValue: products.reduce((sum, p) => sum + (p.price * p.inventory.quantity), 0),
  outOfStock: products.filter(p => p.inventory.quantity === 0).length,
  lowStock: products.filter(p =>
    p.inventory.quantity > 0 &&
    p.inventory.quantity <= p.inventory.reorderPoint
  ).length,
  averageStockLevel: products.reduce((sum, p) => sum + p.inventory.quantity, 0) / products.length,
})

/* Summarize - create overview */
const summarizeCustomerActivity = (customer: Customer): CustomerSummary => ({
  customerId: customer.id,
  totalOrders: customer.orders.length,
  totalSpent: customer.orders.reduce((sum, o) => sum + o.total, 0),
  averageOrderValue: customer.orders.reduce((sum, o) => sum + o.total, 0) / customer.orders.length,
  lastOrderDate: customer.orders[customer.orders.length - 1]?.createdAt ?? null,
  daysSinceLastOrder: customer.orders.length > 0
    ? new Date().diffDays(customer.orders[customer.orders.length - 1].createdAt)
    : null,
  favoriteCategory: findMostFrequent(customer.orders.flatMap(o => o.items.map(i => i.category))),
})

/* Group - organize by criteria */
const groupOrdersByStatus = (orders: Order[]): Map<OrderStatus, Order[]> =>
  orders.reduce((groups, order) => {
    const status = deriveOrderStatus(order)
    const existing = groups.get(status) ?? []
    groups.set(status, [...existing, order])
    return groups
  }, new Map<OrderStatus, Order[]>())

const groupProductsByCategory = (products: Product[]): CategoryGroup[] => {
  const grouped = groupBy(products, p => p.category)

  return Array.from(grouped.entries()).map(([category, products]) => ({
    category,
    products,
    count: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price, 0),
  }))
}
```

### 6. Authorization & Access Control

**Pattern:** `can|has|is + action/permission + subject?`

| Name               | Prefix | Action/Permission | Subject   | Returns        |
| ------------------ | ------ | ----------------- | --------- | -------------- |
| `canAccessFeature` | `can`  | `Access`          | `Feature` | `boolean`      |
| `hasPermission`    | `has`  | `Permission`      | —         | `boolean`      |
| `isAuthorized`     | `is`   | `Authorized`      | —         | `boolean`      |
| `checkAccess`      | —      | `check`           | `Access`  | `AccessResult` |

```tsx
/* Can - capability checks */
const canPerformAction = (
  user: User,
  action: Action,
  resource: Resource
): boolean =>
  hasRequiredRole(user, action.requiredRole) &&
  hasRequiredPermissions(user, action.permissions) &&
  meetsResourceConstraints(user, resource)

const canApproveExpense = (user: User, expense: Expense): boolean =>
  user.role === 'manager' &&
  expense.amount <= user.approvalLimit &&
  expense.department === user.department

const canRefundOrder = (user: User, order: Order): boolean => {
  const daysSincePurchase = new Date().diffDays(order.createdAt)

  return (
    (user.role === 'support' && daysSincePurchase <= 30) ||
    (user.role === 'manager' && daysSincePurchase <= 90) ||
    user.role === 'admin'
  ) && order.status !== 'refunded'
}

/* Has - possession checks */
const hasRequiredSubscription = (
  user: User,
  feature: Feature
): boolean =>
  user.subscription.tier >= feature.requiredTier &&
  user.subscription.status === 'active'

const hasActivePaymentMethod = (customer: Customer): boolean =>
  customer.paymentMethods.some(pm =>
    pm.status === 'active' &&
    pm.expiresAt > new Date()
  )

const hasCompletedOnboarding = (user: User): boolean =>
  user.onboarding.profileCompleted &&
  user.onboarding.emailVerified &&
  user.onboarding.termsAccepted

/* Is - state checks */
const isAuthorizedForResource = (
  user: User,
  resource: Resource
): boolean => {
  // Public resources
  if (resource.visibility === 'public') return true

  // Owner access
  if (resource.ownerId === user.id) return true

  // Shared access
  if (resource.sharedWith.includes(user.id)) return true

  // Role-based access
  return user.role === 'admin'
}

const isEligibleForTrial = (user: User): boolean =>
  !user.hasHadTrial &&
  user.accountAge.diffDays(new Date()) < 7 &&
  user.paymentMethods.length > 0

/* Check - comprehensive authorization */
type AccessResult =
  | { allowed: true }
  | { allowed: false; reason: string; code: string }

const checkFeatureAccess = (
  user: User,
  feature: Feature
): AccessResult => {
  if (!user.subscription.isActive) {
    return {
      allowed: false,
      reason: 'Active subscription required',
      code: 'SUBSCRIPTION_REQUIRED'
    }
  }

  if (user.subscription.tier < feature.requiredTier) {
    return {
      allowed: false,
      reason: `${feature.requiredTier} tier required`,
      code: 'INSUFFICIENT_TIER'
    }
  }

  if (!user.permissions.includes(feature.permission)) {
    return {
      allowed: false,
      reason: 'Insufficient permissions',
      code: 'PERMISSION_DENIED'
    }
  }

  return { allowed: true }
}
```

### 7. Workflow & Process Orchestration

**Pattern:** `action + workflow/process + step?`

| Name                  | Action      | Workflow   | Step         | Notes            |
| --------------------- | ----------- | ---------- | ------------ | ---------------- |
| `processCheckout`     | `process`   | `Checkout` | —            | Execute workflow |
| `advanceToNextStep`   | `advance`   | —          | `NextStep`   | State transition |
| `determineNextAction` | `determine` | —          | `NextAction` | Decision logic   |
| `canProceedToPayment` | `can`       | `Proceed`  | `Payment`    | Guard condition  |

```tsx
/* Process - execute workflows */
const processCheckout = async (cart: Cart, customer: Customer): Promise<CheckoutResult> => {
  // Validate cart
  const cartValidation = validateCart(cart)
  if (!cartValidation.valid) {
    return { success: false, error: cartValidation.error }
  }

  // Check inventory
  const inventoryCheck = await checkInventoryAvailability(cart.items)
  if (!inventoryCheck.available) {
    return { success: false, error: 'Some items are out of stock' }
  }

  // Reserve inventory
  await reserveInventory(cart.items)

  try {
    // Process payment
    const payment = await processPayment(customer.paymentMethod, cart.total)

    // Create order
    const order = await createOrder(cart, customer, payment)

    // Send confirmation
    await sendOrderConfirmation(order, customer)

    return { success: true, order }
  } catch (error) {
    // Release inventory on failure
    await releaseInventory(cart.items)
    throw error
  }
}

const processRefund = async (order: Order, reason: string): Promise<RefundResult> => {
  // Validate refund eligibility
  const eligibility = checkRefundEligibility(order)
  if (!eligibility.eligible) {
    return { success: false, error: eligibility.reason }
  }

  // Calculate refund amount
  const refundAmount = calculateRefundAmount(order)

  // Process refund with payment provider
  const refund = await processPaymentRefund(order.paymentId, refundAmount)

  // Update order status
  await updateOrderStatus(order.id, 'refunded')

  // Restore inventory
  await restoreInventory(order.items)

  // Notify customer
  await sendRefundConfirmation(order, refund)

  return { success: true, refund }
}

/* Determine - decision logic */
const determineShippingMethod = (order: Order): ShippingMethod => {
  if (order.total > 100) return 'free_standard'
  if (order.weight > 20) return 'freight'
  if (order.destination.isInternational) return 'international'
  return 'standard'
}

const determineNextCheckoutStep = (
  currentStep: CheckoutStep,
  cart: Cart,
  customer: Customer
): CheckoutStep => {
  switch (currentStep) {
    case 'cart':
      return cart.items.length > 0 ? 'shipping' : 'cart'
    case 'shipping':
      return customer.shippingAddress ? 'payment' : 'shipping'
    case 'payment':
      return customer.paymentMethod ? 'review' : 'payment'
    case 'review':
      return 'confirmation'
    default:
      return 'cart'
  }
}

const determineApprovalRoute = (expense: Expense): ApprovalRoute => {
  if (expense.amount < 100) {
    return { requiresApproval: false }
  }

  if (expense.amount < 1000) {
    return {
      requiresApproval: true,
      approvers: ['manager']
    }
  }

  if (expense.amount < 10000) {
    return {
      requiresApproval: true,
      approvers: ['manager', 'director']
    }
  }

  return {
    requiresApproval: true,
    approvers: ['manager', 'director', 'cfo']
  }
}

/* Can - guard conditions */
const canProceedToPayment = (cart: Cart, customer: Customer): boolean =>
  cart.items.length > 0 &&
  customer.shippingAddress !== null &&
  validateShippingAddress(customer.shippingAddress).valid

const canCompleteOrder = (order: Order): boolean =>
  order.paymentStatus === 'paid' &&
  order.items.every(item => item.inventoryReserved) &&
  order.shippingAddress !== null

/* Advance - state transitions */
const advanceOrderStatus = (order: Order, event: OrderEvent): OrderStatus => {
  const transitions: Record<OrderStatus, Partial<Record<OrderEvent, OrderStatus>>> = {
    pending: { payment_received: 'processing' },
    processing: { items_picked: 'ready_to_ship' },
    ready_to_ship: { shipped: 'shipped' },
    shipped: { delivered: 'delivered' },
    delivered: {},
  }

  return transitions[order.status]?.[event] ?? order.status
}
```

---

## TypeScript-Specific Conventions

### Type/Interface Naming

```tsx
/* Business entity types - PascalCase nouns */
interface Customer {
  id: string
  email: string
  subscription: Subscription
}

interface Order {
  id: string
  customerId: string
  items: OrderItem[]
  total: number
}

/* Result types - suffix with Result */
interface ValidationResult {
  valid: boolean
  errors?: string[]
}

interface CalculationResult {
  subtotal: number
  tax: number
  total: number
}

interface ProcessingResult {
  success: boolean
  orderId?: string
  error?: string
}

/* Configuration types - suffix with Config or Options */
interface PaymentConfig {
  provider: string
  apiKey: string
  webhookUrl: string
}

interface CalculationOptions {
  includeTax: boolean
  applyDiscounts: boolean
  roundingMode: 'up' | 'down' | 'nearest'
}

/* Function types - descriptive names */
type ValidateFunction<T> = (value: T) => ValidationResult
type CalculatePrice = (items: CartItem[], options: PricingOptions) => number
type TransformData<TInput, TOutput> = (input: TInput) => TOutput

/* Predicate types - prefix with Is or Can */
type IsEligible = (user: User, feature: Feature) => boolean
type CanPerformAction = (user: User, action: Action) => boolean

/* Discriminated unions - for business states */
type OrderStatus =
  | { type: 'pending'; createdAt: Date }
  | { type: 'processing'; startedAt: Date }
  | { type: 'shipped'; trackingNumber: string; shippedAt: Date }
  | { type: 'delivered'; deliveredAt: Date; signature: string }
  | { type: 'cancelled'; reason: string; cancelledAt: Date }

type PaymentResult =
  | { success: true; transactionId: string; amount: number }
  | { success: false; error: string; code: PaymentErrorCode }
```

### Generic Type Parameters

```tsx
/* Use descriptive names for business contexts */
type ValidateEntity<TEntity> = (entity: TEntity) => ValidationResult

type TransformApiResponse<TApi, TDomain> = (api: TApi) => TDomain

type CalculateMetric<TData, TResult> = (data: TData[]) => TResult

/* Multiple related types */
type ProcessWorkflow<TInput, TOutput, TError = Error> = (
  input: TInput
) => Promise<Result<TOutput, TError>>

type AggregateData<TItem, TGroupKey extends keyof TItem, TMetric> = (
  items: TItem[],
  groupBy: TGroupKey
) => Map<TItem[TGroupKey], TMetric>

/* Constraint-based generics */
type CalculateTotal<T extends { price: number; quantity: number }> = (
  items: T[]
) => number

type FilterByStatus<T extends { status: string }> = (
  items: T[],
  status: T['status']
) => T[]
```

---

## Anti-Patterns to Avoid

### ❌ Ambiguous Action Verbs

```tsx
/* Bad - unclear what "do" means */
const doPayment = () => {}
const doValidation = () => {}
const handleData = () => {}

/* Good - specific actions */
const processPayment = () => {}
const validateOrder = () => {}
const transformCustomerData = () => {}
```

### ❌ Mixing Business and Technical Concerns

```tsx
/* Bad - technical implementation details in business logic names */
const mapUserArray = (users: User[]) => {}
const filterObjectsByProperty = () => {}
const reduceToSum = () => {}

/* Good - business-focused names */
const getActiveCustomers = (customers: Customer[]) => {}
const selectEligibleUsers = () => {}
const calculateTotalRevenue = () => {}
```

### ❌ Overly Generic Names

```tsx
/* Bad - too generic for business logic */
const process = (data: any) => {}
const handle = (input: any) => {}
const check = (value: any) => {}

/* Good - specific to business domain */
const processRefund = (order: Order) => {}
const handlePaymentFailure = (error: PaymentError) => {}
const checkInventoryAvailability = (productId: string) => {}
```

### ❌ Inconsistent Verb Usage

```tsx
/* Bad - mixing synonyms inconsistently */
const computeTotal = () => {}
const calculateTax = () => {}
const determineShipping = () => {}
const figureOutDiscount = () => {} // Informal

/* Good - consistent verb choices */
const calculateTotal = () => {}
const calculateTax = () => {}
const calculateShipping = () => {}
const calculateDiscount = () => {}
```

### ❌ Noun-Verb Confusion

```tsx
/* Bad - unclear if boolean or function */
const validateOrder = true // Boolean?
const processPayment = () => {} // Function?

/* Good - clear distinction */
const isOrderValid = true // Clearly boolean
const processPayment = () => {} // Clearly function

// OR use consistent prefixes
const orderValidation = true // Noun
const validateOrder = () => {} // Verb
```

### ❌ Double Negatives

```tsx
/* Bad */
const isNotInvalid = true
const shouldNotSkipValidation = false
if (!shouldNotSkipValidation) {} // Confusing

/* Good */
const isValid = true
const shouldValidate = true
if (shouldValidate) {}
```

### ❌ Unclear Return Type Implications

```tsx
/* Bad - name doesn't indicate what's returned */
const user = getUser() // Returns User | null | undefined?
const orders = fetchOrders() // Returns Order[] | Promise<Order[]>?

/* Good - name indicates return type */
const findUser = (id: string): User | null => {}
const fetchOrders = async (): Promise<Order[]> => {}
const getUserOrThrow = (id: string): User => {} // Never returns null
const tryGetUser = (id: string): User | null => {} // Explicitly nullable
```

### ❌ Mixing Tenses

```tsx
/* Bad - inconsistent tenses */
const isProcessing = true // Present continuous
const hasProcessed = false // Past perfect
const willProcess = () => {} // Future

/* Good - consistent present tense */
const isProcessing = true
const isProcessed = false
const processOrder = () => {}
```

### ❌ Hidden Side Effects

```tsx
/* Bad - name suggests pure function but has side effects */
const calculateTotal = (order: Order) => {
  // Hidden side effect!
  logAnalytics('total_calculated', order)
  updateCache(order.id, order.total)
  return order.total
}

/* Good - name indicates side effects */
const calculateAndLogTotal = (order: Order) => {
  const total = calculateTotal(order)
  logAnalytics('total_calculated', order)
  return total
}

// OR separate concerns
const calculateTotal = (order: Order) => order.total // Pure
const logTotalCalculation = (order: Order) => {} // Side effect
```

### ❌ Unclear Scope

```tsx
/* Bad - unclear what level of entity */
const validate = () => {} // Validate what?
const calculate = () => {} // Calculate what?

/* Good - clear scope */
const validateOrderItems = () => {}
const validateShippingAddress = () => {}
const calculateOrderTotal = () => {}
const calculateItemSubtotal = () => {}
```

---

## Quick Reference: A/HC/LC Pattern for Business Logic

**Pattern:** `prefix? + action (A) + highContext (HC) + lowContext? (LC)`

| Name                      | Prefix   | Action      | High Context   | Low Context |
| ------------------------- | -------- | ----------- | -------------- | ----------- |
| `calculateOrderTotal`     | —        | `calculate` | `Order`        | `Total`     |
| `validateCouponCode`      | —        | `validate`  | `Coupon`       | `Code`      |
| `isEligibleForDiscount`   | `is`     | `Eligible`  | `Discount`     | —           |
| `canApproveExpense`       | `can`    | `Approve`   | `Expense`      | —           |
| `shouldApplyTax`          | `should` | `Apply`     | `Tax`          | —           |
| `processPaymentRefund`    | —        | `process`   | `Payment`      | `Refund`    |
| `determineShippingMethod` | —        | `determine` | `Shipping`     | `Method`    |
| `aggregateSalesByRegion`  | —        | `aggregate` | `Sales`        | `ByRegion`  |
| `normalizeCustomerData`   | —        | `normalize` | `Customer`     | `Data`      |
| `hasActiveSubscription`   | `has`    | `Active`    | `Subscription` | —           |

---

## Practical Checklist

When naming business logic, ask:

1. **Is the action verb specific?** (`calculate` not `do`, `validate` not `check`)
2. **Does it reflect domain language?** (Use terms from business requirements)
3. **Is the return type clear?** (`find` returns nullable, `get` returns value or throws)
4. **Are side effects obvious?** (Pure functions vs. functions with side effects)
5. **Is the scope clear?** (What entity/domain does this operate on?)
6. **Is it consistent with similar functions?** (Same verbs for same types of operations)
7. **Would a domain expert understand it?** (Business stakeholder comprehension test)

---

**Remember:** Business logic naming should make your domain model self-documenting. A developer should understand the business rules, constraints, and workflows purely from reading function and variable names.
