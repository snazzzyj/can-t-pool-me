# Frontend Architecture Guide

> **Version:** 1.0.0 | **Stack:** React 18+, TypeScript 5+, Next.js App Router
> **Purpose:** Living architecture reference for developers and AI-assisted development tools

---

## Document Structure

This guide is organised into discrete, addressable sections. Each section contains:

- **Context** — When and why this pattern applies
- **Rules** — Concrete, enforceable guidelines
- **Structure** — File/folder patterns with examples
- **Rationale** — Reasoning behind decisions

---

## Table of Contents

1. [Core Principles](#1-core-principles)
2. [Project Structure Overview](#2-project-structure-overview)
3. [Configuration Layer](#3-configuration-layer)
4. [API & Data Fetching](#4-api--data-fetching)
5. [Domain Architecture](#5-domain-architecture)
6. [Feature Structure](#6-feature-structure)
7. [Shared Resources](#7-shared-resources)
8. [Third-Party Adapters](#8-third-party-adapters)
9. [Type Conventions](#9-type-conventions)
10. [Naming Conventions](#10-naming-conventions)
11. [Testing Strategy](#11-testing-strategy)
12. [Error Handling](#12-error-handling)
13. [Dependency Injection](#13-dependency-injection)
14. [Decision Records](#14-decision-records)

## 2. Project Structure Overview

> **ID:** `STRUCTURE` > **Context:** Top-level organisation of the `./src` directory

### Canonical Layout

```javascript
./src/
├── app/                    # Next.js App Router (routes only)
├── config/                 # Environment, feature flags, constants
├── lib/                    # Third-party adapters/wrappers
├── shared/                 # Cross-cutting concerns
│   ├── api/                # HTTP client, middleware, query config
│   ├── providers/          # React Context providers
│   ├── components/ui/      # Design system primitives
│   ├── features/           # Cross-domain features (3+ domain rule)
│   ├── hooks/              # Shared custom hooks
│   ├── store/              # Global state (Zustand/Jotai)
│   ├── types/              # Shared type definitions
│   └── utils/              # Pure utility functions
└── domains/                # Business domains
    └── {domain}/
        ├── api/            # Domain API layer
        ├── config/         # Domain constants & validation
        ├── models/         # Domain entities (types + functions)
        ├── services/       # Business logic
        ├── features/       # UI features
        ├── views/          # Page-level components
        └── shared/         # Domain-internal shared code
```

### Rules

| ID              | Rule                                                                      |
| --------------- | ------------------------------------------------------------------------- |
| `STRUCTURE-001` | The `app/` directory contains **only** routing concerns—no business logic |
| `STRUCTURE-002` | Each domain is self-contained under `domains/{domain}/`                   |
| `STRUCTURE-003` | Cross-domain code lives in `shared/`                                      |
| `STRUCTURE-004` | Third-party abstractions live in `lib/`                                   |
| `STRUCTURE-005` | Global configuration lives in `config/`                                   |

---

## 3. Configuration Layer

> **ID:** `CONFIG` > **Context:** Managing environment variables, feature flags, and constants

### Structure

```javascript
./src/config/
├── env.ts              # Zod-validated environment variables
├── features.ts         # Feature flags (typed const object)
└── constants.ts        # Global constants (as const assertions)
```

### Rules

| ID           | Rule                                                         | Example                                             |
| ------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| `CONFIG-001` | Validate environment variables at build/startup with Zod     | `env.ts` exports validated `env` object             |
| `CONFIG-002` | Use `as const` assertions for literal type inference         | `export const LIMITS = { MAX_UPLOAD: 10 } as const` |
| `CONFIG-003` | Feature flags are typed boolean properties                   | `features.enableNewChat: boolean`                   |
| `CONFIG-004` | Domain-specific constants live in `domains/{domain}/config/` | `domains/chat/config/constants.ts`                  |

## 4. API & Data Fetching

> **ID:** `API` > **Context:** HTTP communication, server state management, caching

### Structure

```javascript
./src/
├── shared/api/
│   ├── client.ts           # Type-safe fetch wrapper factory
│   ├── middleware.ts       # Composable middleware functions
│   └── query-client.ts     # TanStack Query configuration
└── domains/{domain}/api/
    ├── {domain}.api.ts     # Endpoint definitions
    └── {domain}.queries.ts # TanStack Query hooks
```

### Rules

| ID        | Rule                                            |
| --------- | ----------------------------------------------- |
| `API-001` | Use TanStack Query for all server state         |
| `API-002` | Define API endpoints as typed const objects     |
| `API-003` | Compose middleware using higher-order functions |
| `API-004` | Domain queries import from shared client        |
| `API-005` | Never call `fetch` directly in components       |

## 5. Domain Architecture

> **ID:** `DOMAIN` > **Context:** Organising business logic into cohesive, bounded contexts

### Structure

```javascript
./src/domains/{domain}/
├── api/                    # API endpoints + TanStack Query hooks
│   ├── {domain}.api.ts
│   └── {domain}.queries.ts
├── config/                 # Domain configuration
│   ├── constants.ts
│   └── validation.ts       # Zod schemas
├── models/                 # Domain entities
│   ├── {entity}.model.ts   # Type + pure functions
│   └── index.ts
├── services/               # Business logic
│   └── {domain}.service.ts
├── features/               # UI features (see §6)
├── views/                  # Page-level components
└── shared/                 # Domain-internal shared code
    ├── components/
    ├── hooks/
    ├── types/              # DTOs, API types
    └── utils/
```

### Rules

| ID           | Rule                                                     |
| ------------ | -------------------------------------------------------- |
| `DOMAIN-001` | Each domain represents a distinct business capability    |
| `DOMAIN-002` | Domains do not import from other domains                 |
| `DOMAIN-003` | Cross-domain communication goes through `shared/`        |
| `DOMAIN-004` | Domain `shared/` is internal—not exported outside domain |
| `DOMAIN-005` | Views compose features; features compose components      |

### Domain Models (Functional Approach)

## 6. Feature Structure

> **ID:** `FEATURE` > **Context:** Organising UI features within domains

### Canonical Feature Layout

```javascript
domains/{domain}/features/{Feature}/
├── {Feature}.tsx           # Main component (default export)
├── {Feature}.types.ts      # Public types (if needed externally)
├── components/             # Private sub-components
│   ├── {SubComponent}.tsx
│   └── {SubComponent}.types.ts
├── hooks/                  # Feature-specific hooks
│   ├── use-{feature}.ts
│   └── use-{feature}.types.ts
├── utils/                  # Pure functions
│   └── {feature}.utils.ts
├── constants.ts            # Feature constants
└── index.ts                # Public API (explicit exports)
```

### Rules

| ID            | Rule                                                      |
| ------------- | --------------------------------------------------------- |
| `FEATURE-001` | Every feature has an `index.ts` defining its public API   |
| `FEATURE-002` | Only export what consumers need                           |
| `FEATURE-003` | Sub-components in `components/` are private by default    |
| `FEATURE-004` | Feature hooks are prefixed with `use-` (kebab-case files) |
| `FEATURE-005` | Co-locate types adjacent to their implementation          |

### Example: Public API

```typescript
// domains/chat/features/ChatBar/index.ts

// Public component
export { ChatBar } from './ChatBar';

// Public types (only if needed by consumers)
export type { ChatBarProps } from './ChatBar.types';

// Public hook (only if reusable outside feature)
export { useChatBar } from './hooks/use-chat-bar';
```

---

## 7. Shared Resources

> **ID:** `SHARED` > **Context:** Code used across multiple domains

### Structure

```javascript
./src/shared/
├── api/                    # HTTP infrastructure
├── providers/              # React Context providers
├── components/ui/          # Design system primitives
├── features/               # Cross-domain features
├── hooks/                  # Shared custom hooks
├── store/                  # Global state
├── types/                  # Shared type definitions
└── utils/                  # Pure utility functions
```

### The 3+ Domain Rule

| ID           | Rule                                                                       |
| ------------ | -------------------------------------------------------------------------- |
| `SHARED-001` | A feature belongs in `shared/features/` **only if** consumed by 3+ domains |
| `SHARED-002` | When in doubt, keep it domain-specific first                               |
| `SHARED-003` | Promote to shared only when duplication becomes painful                    |

### Valid `shared/features/` Examples

```javascript
./src/shared/features/
├── auth/               # Authentication (used everywhere)
├── notifications/      # Global notification system
└── search/             # Global search functionality
```

---

## 8. Third-Party Adapters

> **ID:** `LIB` > **Context:** Abstracting external dependencies for testability and flexibility

### Structure

```javascript
./src/lib/
├── analytics/
│   ├── analytics.ts            # Interface + factory
│   └── providers/
│       ├── google-analytics.ts
│       └── mixpanel.ts
├── logger/
│   └── logger.ts               # Composable logging functions
└── storage/
    ├── storage.ts              # Interface type
    └── local-storage.adapter.ts
```

### Rules

| ID        | Rule                                                                                      |
| --------- | ----------------------------------------------------------------------------------------- |
| `LIB-001` | Define interfaces as TypeScript types, not abstract classes                               |
| `LIB-002` | Use factory functions to create provider instances                                        |
| `LIB-003` | Application code imports from `lib/`, never directly from `node_modules` for wrapped deps |
| `LIB-004` | Each adapter is independently testable                                                    |

## 9. Type Conventions

> **ID:** `TYPES` > **Context:** Consistent type naming and organisation

### Naming Patterns

| Pattern           | Usage                            | Example            |
| ----------------- | -------------------------------- | ------------------ |
| `{Name}Props`     | Component props                  | `ChatBarProps`     |
| `{Name}State`     | State shape                      | `ChatState`        |
| `{Name}Config`    | Configuration objects            | `ApiClientConfig`  |
| `Use{Name}Return` | Hook return type                 | `UseChatBarReturn` |
| `{Name}Dto`       | Data transfer object (API shape) | `MessageDto`       |
| `{Name}`          | Domain entity (clean name)       | `Message`          |

### Rules

| ID          | Rule                                                                               |
| ----------- | ---------------------------------------------------------------------------------- |
| `TYPES-001` | Prefer `type` over `interface` for consistency (unless declaration merging needed) |
| `TYPES-002` | Export types from dedicated `.types.ts` files or co-located with implementation    |
| `TYPES-003` | Use discriminated unions for state variants                                        |
| `TYPES-004` | DTOs reflect API shape; domain types reflect business logic                        |
| `TYPES-005` | Use `Readonly<T>` or `as const` for immutable structures                           |

---

## 10. Naming Conventions

> **ID:** `NAMING` > **Context:** Consistent file and identifier naming across the codebase

### File Naming

| Pattern            | Convention                           | Example              |
| ------------------ | ------------------------------------ | -------------------- |
| Components         |                                      |                      |
| Component folders  | PascalCase                           | `/ChatBar/...`       |
| Component files    | PascalCase                           | `ChatBar.tsx`        |
| Component types    | Adjacent `.types.ts`                 | `ChatBar.types.ts`   |
| Hooks              |                                      |                      |
| Hook folders       | camelCase                            | `/useChatBar/...`    |
| Hooks              | kebab-case with `use-` prefix        | `useChatBar.ts`.     |
| Utilities          |                                      |                      |
| Utility folders    | kebab-case                           | `/message-utils/...` |
| Utility files      | camelCase with `.utils.ts` suffix    | `message.utils.ts`   |
| Services           |                                      |                      |
| Services folders   | kebab-case with `.service.ts` suffix | `chat.service.ts`    |
| API layer          | kebab-case with `.api.ts` suffix     | `chat.api.ts`        |
| Query hooks        | kebab-case with `.queries.ts` suffix | `chat.queries.ts`    |
| Models             | kebab-case with `.model.ts` suffix   | `message.model.ts`   |
| Schemas            | kebab-case with `.schema.ts` suffix  | `message.schema.ts`  |
| Constants          | kebab-case `constants.ts`            | `constants.ts`       |
| Types (standalone) | kebab-case with `.types.ts` suffix   | `api.types.ts`       |

### Rules

| ID           | Rule                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| `NAMING-001` | One component per file; filename matches component name                |
| `NAMING-002` | Index files (`index.ts`) are for barrel exports only—no implementation |
| `NAMING-003` | Test files use `.test.ts(x)` suffix, co-located with implementation    |
| `NAMING-004` | Fixture files live in `__fixtures__/` directories                      |

---

## 11. Testing Strategy

> **ID:** `TEST` > **Context:** Test organisation, utilities, and patterns

### Structure

```javascript
./src/
├── test/
│   ├── utils/
│   │   ├── test-utils.tsx      # Custom render with providers
│   │   ├── mock-data.ts        # Shared factory functions
│   │   └── msw-handlers.ts     # API mocking handlers
│   └── setup.ts                # Global test setup

# Co-located tests
domains/chat/features/ChatBar/
├── ChatBar.tsx
├── ChatBar.test.tsx            # Unit tests
├── ChatBar.integration.test.tsx # Integration tests (optional)
└── __fixtures__/
    └── chat-bar.fixtures.ts    # Factory functions
```

## 12. Error Handling

> **ID:** `ERROR` > **Context:** Error boundaries, error types, and recovery patterns

### Structure

```javascript
domains/{domain}/components/
└── {Domain}ErrorBoundary/
    ├── {Domain}ErrorBoundary.tsx   # Uses react-error-boundary
    └── {Domain}ErrorFallback.tsx   # Functional fallback component
```

### Rules

| ID          | Rule                                                          |
| ----------- | ------------------------------------------------------------- |
| `ERROR-001` | Use `react-error-boundary` library (functional API)           |
| `ERROR-002` | Each domain has its own error boundary                        |
| `ERROR-003` | Fallback components are functional components                 |
| `ERROR-004` | Use `useErrorBoundary()` hook for programmatic error throwing |
| `ERROR-005` | Integrate error boundaries with error reporting services      |

### Example: Domain Error Boundary

```typescript
// domains/chat/components/ChatErrorBoundary/ChatErrorBoundary.tsx
import { ErrorBoundary } from 'react-error-boundary';
import { ChatErrorFallback } from './ChatErrorFallback';
import { logError } from '@/lib/logger';

type ChatErrorBoundaryProps = {
  children: React.ReactNode;
};

export function ChatErrorBoundary({ children }: ChatErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ChatErrorFallback}
      onError={(error, info) => {
        logError('ChatDomain', error, info);
      }}
      onReset={() => {
        // Reset domain state if needed
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

```typescript
// domains/chat/components/ChatErrorBoundary/ChatErrorFallback.tsx
import type { FallbackProps } from 'react-error-boundary';

export function ChatErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert">
      <h2>Something went wrong in Chat</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
```

---

## 13. Dependency Injection

> **ID:** `DI` > **Context:** Runtime dependency injection using React Context

### Structure

```javascript
./src/shared/providers/
├── services.provider.tsx   # Service context provider
└── services.context.ts     # Context + hook definitions
```

### Rules

| ID       | Rule                                                       |
| -------- | ---------------------------------------------------------- |
| `DI-001` | Use React Context for runtime dependency injection         |
| `DI-002` | Define service interfaces as TypeScript types              |
| `DI-003` | Create custom hooks that consume context (`useServices()`) |
| `DI-004` | Compose providers at the app root                          |
| `DI-005` | Tests wrap components with mock providers                  |

### Example: Service Provider

```typescript
// shared/providers/services.context.ts
import { createContext, useContext } from 'react';
import type { AnalyticsProvider } from '@/lib/analytics';
import type { Logger } from '@/lib/logger';

export type Services = {
  analytics: AnalyticsProvider;
  logger: Logger;
};

export const ServicesContext = createContext<Services | null>(null);

export function useServices(): Services {
  const services = useContext(ServicesContext);
  if (!services) {
    throw new Error('useServices must be used within ServicesProvider');
  }
  return services;
}

// Convenience hooks
export function useAnalytics(): AnalyticsProvider {
  return useServices().analytics;
}

export function useLogger(): Logger {
  return useServices().logger;
}
```

```typescript
// shared/providers/services.provider.tsx
import { ServicesContext, type Services } from './services.context';
import { createAnalytics } from '@/lib/analytics';
import { createLogger } from '@/lib/logger';

type ServicesProviderProps = {
  children: React.ReactNode;
  overrides?: Partial<Services>; // For testing
};

export function ServicesProvider({ children, overrides }: ServicesProviderProps) {
  const services: Services = {
    analytics: overrides?.analytics ?? createAnalytics(/* ... */),
    logger: overrides?.logger ?? createLogger(/* ... */),
  };

  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
}
```

---

## 14. Decision Records

> **ID:** `ADR` > **Context:** Documenting architectural decisions and their rationale

### Template

```markdown
# ADR-{NUMBER}: {Title}

## Status

{Proposed | Accepted | Deprecated | Superseded by ADR-XXX}

## Context

{What is the issue that we're seeing that is motivating this decision?}

## Decision

{What is the change that we're proposing and/or doing?}

## Consequences

{What becomes easier or more difficult to do because of this change?}
```

### Key Decisions in This Guide

| ADR     | Decision                             | Rationale                                                  |
| ------- | ------------------------------------ | ---------------------------------------------------------- |
| ADR-001 | Functional over class-based patterns | Aligns with React's programming model; better tree-shaking |
| ADR-002 | TanStack Query for server state      | Handles caching, deduplication, background updates         |
| ADR-003 | Zod for runtime validation           | Type inference + runtime safety at boundaries              |
| ADR-004 | Domain-driven folder structure       | Clear boundaries; scales with team size                    |
| ADR-005 | 3+ domain rule for shared features   | Prevents premature abstraction                             |
| ADR-006 | Co-located tests                     | Improves discoverability; easier refactoring               |
| ADR-007 | Context-based DI                     | Native to React; no external DI container needed           |

---

## Quick Reference: Rule Index

For AI agents and automated tools, all rules are addressable by ID:

```javascript
PRINCIPLE-001..007  Core principles
STRUCTURE-001..005  Project structure
CONFIG-001..004     Configuration
API-001..005        Data fetching
DOMAIN-001..005     Domain architecture
FEATURE-001..005    Feature structure
SHARED-001..003     Shared resources
LIB-001..004        Third-party adapters
TYPES-001..005      Type conventions
NAMING-001..004     Naming conventions
TEST-001..005       Testing strategy
ERROR-001..005      Error handling
DI-001..005         Dependency injection
```

---

_This document is designed to be parsed by both humans and LLM systems. Each section is self-contained and addressable by its ID prefix._
