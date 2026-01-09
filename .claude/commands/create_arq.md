# Architecture Requirements Document (ARQ) Generator

Generate Feature Requirements Document (FRD) and Architecture Requirements Document (ARQ) from feature descriptions.

## Command Invocation

Usage patterns:
- `/create_arq` - Prompts for feature description
- `/create_arq "feature description here"` - Inline description
- `/create_arq thoughts/path/to/existing-frd.md` - Skip FRD generation, go directly to ARQ

## Workflow Overview

**Three-Phase Process:**

1. **FRD Generation Phase**
   - Input: Feature description from user
   - Process: Generate FRD using template
   - Output: `thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-frd.md`
   - Approval: User reviews and approves

2. **Architecture Decision Phase** (NEW)
   - Input: Approved FRD + architecture guides
   - Process: Research codebase + make architectural decisions
   - Output: `thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-adr.md`
   - Approval: User reviews and approves decisions + rationale

3. **ARQ Generation Phase**
   - Input: Approved ADR
   - Process: Expand decisions into comprehensive architecture spec
   - Output: ARQ.md and ARQ.yaml in `thoughts/shared/features/YYYY-MM-DD-{feature-name}/`
   - Approval: User reviews and approves

**All documents are organized in a single feature-specific folder for easy navigation and traceability.**

## PART 1: FRD Generation

### Step 1.1: Gather Feature Description

**If no parameter provided**, display:
```
I'll help you create a Feature Requirements Document (FRD) and Architecture Requirements Document (ARQ).

Please provide a description of the feature you want to build. Include:
- What the feature should do
- Who will use it
- Why it's needed
- Any specific requirements or constraints

Example: "Add a dark mode toggle to the application settings that persists user preference and applies theme across all pages"
```

**If parameter is a file path ending in `-frd.md`**:
- Skip FRD generation
- Read the FRD file completely
- Extract the feature name and date from the filename
- Determine the feature folder: `thoughts/shared/features/YYYY-MM-DD-{feature-name}/`
- All subsequent documents (ADR, ARQ.md, ARQ.yaml) will be saved to this feature folder
- Jump to PART 2: ARQ Generation

**If inline description provided**:
- Use it as the feature description
- Proceed with FRD generation

### Step 1.2: Generate FRD Using Template

1. **Read the FRD template completely**:
   - File: `thoughts/shared/Templates/FRD-PROMPT.md`
   - Read the full template including EXAMPLE_DOC
   - Understand all required sections and guidelines

2. **Apply FRD generation rules**:
   - Maximum 2 user stories
   - Target 5 minute read time
   - Professional, clear, concise tone
   - Use consistent ID formatting (FR-XXX, NFR-XXX)
   - Include all required sections from template

3. **Generate FRD sections**:
   - Executive Summary (2-4 sentences)
   - Problem Statement (current state, pain points, business impact)
   - Target Users (table format)
   - Feature Requirements (functional and non-functional tables)
   - User Stories & Acceptance Criteria (max 2 stories)
   - Scope Definition (in/out of scope, constraints, assumptions)
   - User Flow (ASCII diagram or structured description)
   - Success Metrics (table with baseline, target, measurement)

4. **Handle incomplete information**:
   - If you can make reasonable assumptions: proceed and mark with `[ASSUMPTION: explanation]`
   - If critical information is missing: ask user specific questions
   - Don't proceed with incomplete or vague requirements

5. **Create filename**:
   - Format: `YYYY-MM-DD-{feature-name}-frd.md`
   - Use kebab-case for feature name
   - Example: `2025-01-09-dark-mode-toggle-frd.md`

### Step 1.3: Save and Present FRD

1. **Save FRD**:
   - Directory: `thoughts/shared/features/YYYY-MM-DD-{feature-name}/`
   - Create directory if it doesn't exist (this will contain all feature documents)
   - Save with generated filename: `YYYY-MM-DD-{feature-name}-frd.md`

2. **Present to user**:
```
✅ Feature Requirements Document created

Location: thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-frd.md

Key sections included:
- Executive Summary: [one-line summary]
- Target Users: [count] user types
- Functional Requirements: [count] requirements
- User Stories: [count] stories

Please review the FRD. Once approved, I'll proceed to generate the Architecture Requirements Document (ARQ).

Options:
- "Approved" - Proceed to ARQ generation
- "Modify: [specific changes]" - I'll update the FRD
- "Regenerate" - Start over with new approach
```

3. **Wait for user approval**
   - User must explicitly approve before proceeding
   - If modifications requested: update FRD and re-present
   - If regeneration requested: start FRD generation over

## PART 2: ARQ Generation

### Step 2.1: Load Context

1. **Read approved FRD completely**:
   - Read the entire FRD file (no limit/offset)
   - Extract all functional requirements (FR-XXX)
   - Extract all non-functional requirements (NFR-XXX)
   - Note user stories and acceptance criteria
   - Identify scope boundaries

2. **Read architecture guides completely**:
   - `.claude/code-base-style-guides/architecture-overview.md`
   - `.claude/code-base-style-guides/naming-conventions-overview.md`
   - `.claude/code-base-style-guides/types-and-data-models.md`
   - Extract all rule IDs (e.g., DOMAIN-001, FEATURE-003, NAMING-001)
   - Understand patterns, conventions, and principles

3. **Create todo list** for ARQ generation using TodoWrite

### Step 2.2: Research Codebase Patterns

**Spawn parallel research agents** (use Task tool):

**Agent 1: codebase-pattern-finder**
```
Find similar features to [feature description from FRD].

Search for:
- Similar UI patterns and component structures
- Similar data flow and state management patterns
- API integration patterns for similar features
- Form handling or user input patterns (if applicable)

Return specific file:line references showing:
- How similar features are implemented
- What libraries and patterns they use
- Component hierarchy examples
- State management approaches

Focus on finding concrete examples in the codebase.
```

**Agent 2: codebase-analyzer**
```
Analyze the domain structure for [feature's likely domain].

Based on the feature description, determine which domain this feature belongs to by:
- Examining existing domains in src/domains/
- Finding the domain with most related functionality
- If it's a cross-cutting concern, look in src/shared/

Then analyze that domain:
- Current API endpoints and query patterns
- Component organization and structure
- Existing hooks and utilities
- Service layer organization
- Testing patterns

Return the current architecture with file paths and examples.
```

**Agent 3: codebase-locator** (if specific subsystem mentioned)
```
Locate all files related to [specific subsystem from FRD].

Find:
- Models and type definitions
- Services and business logic
- API endpoints
- React components
- Custom hooks
- Tests

Focus on [specific directory] if mentioned in requirements.
Return a comprehensive map of related files.
```

**Wait for ALL agents to complete** before proceeding.

### Step 2.3: Make Architecture Decisions

Based on research findings and architecture guides:

1. **Determine Domain Assignment**:
   - Which domain does this feature belong to? (`domains/{domain}/`)
   - Or is it cross-cutting? (`shared/features/`)
   - Apply 3+ domain rule: only shared if used by 3+ domains
   - Rationale based on codebase analysis
   - **Rules Applied**: `STRUCTURE-002`, `DOMAIN-001`, `SHARED-001`

2. **Technical Stack Decisions**:

   **State Management:**
   - Server state: TanStack Query (if API calls)
   - Client state: Zustand / Context / Local State (based on scope)
   - Form state: React Hook Form / Controlled components
   - **Rules Applied**: `API-001`, `PRINCIPLE-002`

   **UI Framework:**
   - Which Radix UI components to use
   - Custom components to create
   - **Rules Applied**: `FEATURE-001`, `SHARED-001`

   **Data Layer:**
   - REST / GraphQL / WebSocket
   - TanStack Query configuration
   - Zod validation at boundaries
   - **Rules Applied**: `API-001`, `TYPES-XXX`, `CONFIG-004`

3. **File Structure Design**:
   - Map each FR-XXX requirement to specific files
   - Determine new files to create (with exact paths)
   - Determine existing files to modify
   - Apply naming conventions for each file
   - **Rules Applied**: `NAMING-001` through `NAMING-004`, `STRUCTURE-XXX`

4. **Component Architecture**:
   - Break down UI into component hierarchy
   - Define main feature component and sub-components
   - Identify props interfaces for each component
   - Plan state management strategy per component
   - **Rules Applied**: `FEATURE-001` through `FEATURE-005`

5. **API Design**:
   - Define all endpoints needed (REST paths or GraphQL queries)
   - Create TanStack Query hook structure (query keys, hooks)
   - Plan DTO → Domain Model transformations
   - Define cache invalidation strategy
   - **Rules Applied**: `API-001` through `API-005`

6. **Type System**:
   - Define Props types for components
   - Define DTO types for API responses
   - Define Domain types for business entities
   - Create Zod schemas for validation
   - **Rules Applied**: `TYPES-001` through `TYPES-005`

### Step 2.4: Generate Architecture Decision Record (ADR)

After research is complete and decisions are made:

1. **Generate ADR document**:
   - Directory: `thoughts/shared/features/YYYY-MM-DD-{feature-name}/`
   - Filename: `YYYY-MM-DD-{feature-name}-adr.md`
   - Use ADR template: `thoughts/shared/adrs/ADR-TEMPLATE.md`
   - Document ALL architectural decisions with rationale
   - Include alternatives considered and why they were rejected
   - Reference specific codebase patterns found (with file:line)
   - List consequences (positive, negative, risks)
   - Apply architecture rules by ID

2. **ADR Content Structure**:
   - **Decision Summary**: 2-3 sentence overview
   - **Context**: From FRD and codebase reality
   - **Research Findings**: Results from parallel agents
   - **Architectural Decisions**:
     - Decision 1: Domain Assignment (with alternatives)
     - Decision 2: State Management Strategy (with alternatives)
     - Decision 3: UI Framework & Components (with alternatives)
     - Decision 4: Third-Party Libraries (with alternatives)
     - Decision 5: API Integration & Data Layer (with alternatives)
     - Decision 6: File Structure (with naming conventions)
   - **Open Questions & Resolutions**: Any ambiguities resolved
   - **Consequences**: Positive, negative, risks with mitigations
   - **Rules Applied**: All architecture rules by ID

3. **Save ADR**:
   - Directory: `thoughts/shared/features/YYYY-MM-DD-{feature-name}/`
   - Save with filename: `YYYY-MM-DD-{feature-name}-adr.md`

4. **Present ADR to user**:
```
✅ Architecture Decision Record created

Location: thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-adr.md

Key decisions documented:
- Domain Assignment: domains/{domain}/
- State Management: [approach]
- UI Framework: [Radix + custom components]
- API Integration: [approach]
- Third-Party Libraries: [list new dependencies]

Research findings included:
- Similar patterns: [count] found in codebase
- Domain analysis: [summary]
- Alternatives considered: [count] per decision

Please review the Architecture Decision Record. This captures the rationale behind each architectural choice before we generate the final ARQ documents.

Options:
- "Approved" - Proceed to generate ARQ documents
- "Modify: [specific changes]" - I'll update the ADR
- "Reconsider: [decision name]" - I'll revisit that decision
```

5. **Wait for user approval**:
   - User must explicitly approve ADR before proceeding
   - If modifications requested: update ADR and re-present
   - If reconsideration requested: revisit specific decisions with new analysis
   - ADR serves as the "contract" for what will be in the ARQ

6. **Update ADR index**:
   - Add entry to `thoughts/shared/adrs/index.md`
   - Update decision category sections

### Step 2.5: Generate Markdown ARQ

Once ADR is approved:

1. **Generate Markdown ARQ only**:
   - Directory: `thoughts/shared/features/YYYY-MM-DD-{feature-name}/`
   - Filename: `YYYY-MM-DD-{feature-name}-arq.md`
   - Use template structure (see ARQ Template section below)
   - Include YAML frontmatter for metadata with ADR reference
   - Expand on decisions from approved ADR
   - Reference all architecture rules by ID
   - Include all technical decisions with detailed implementation guidance
   - Make it comprehensive and human-readable

2. **ARQ Frontmatter (updated)**:
```yaml
---
feature: "{feature-name}"
domain: "{domain-name}"
created: "{YYYY-MM-DD}"
frd_source: "thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-frd.md"
adr_source: "thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-adr.md"
status: "approved"
---
```

3. **Save Markdown ARQ**:
   - Directory: `thoughts/shared/features/YYYY-MM-DD-{feature-name}/`
   - Save with filename: `YYYY-MM-DD-{feature-name}-arq.md`

4. **Present to user**:
```
✅ Architecture Requirements Document (Markdown) created

Location: thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-arq.md

Key architectural decisions:
- Domain: domains/{domain}/
- Primary patterns: [list key patterns]
- Files to create: [count]
- Files to modify: [count]
- Architecture rules applied: [count]

References:
- FRD: thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-frd.md
- ADR: thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-adr.md

Please review the ARQ markdown document. Once approved, I'll generate the structured YAML version for AI consumption.

Options:
- "Approved" - Proceed to generate YAML ARQ
- "Modify: [specific changes]" - I'll update the ARQ.md
- "Regenerate" - Start ARQ generation over
```

4. **Wait for user approval**
   - User must explicitly approve before generating YAML
   - If modifications requested: update ARQ.md and re-present
   - If regeneration requested: start ARQ generation over (from Step 2.3)

### Step 2.6: Generate YAML ARQ

Once markdown ARQ is approved:

1. **Generate YAML ARQ**:
   - Directory: `thoughts/shared/features/YYYY-MM-DD-{feature-name}/`
   - Filename: `YYYY-MM-DD-{feature-name}-arq.yaml`
   - Pure structured data format
   - Parallel structure to approved Markdown version
   - Suitable for AI parsing
   - Use template structure (see YAML Template section below)

2. **Ensure consistency**:
   - Both files contain same architectural decisions
   - Rule IDs referenced in both formats
   - File paths match in both
   - Component hierarchy consistent
   - YAML is a direct translation of the approved markdown

### Step 2.7: Present Final Output

Display completion message:

```
✅ Feature Architecture Complete - All Documents Generated

**Feature Folder:** thoughts/shared/features/YYYY-MM-DD-{feature-name}/

**Documentation Set:**
1. FRD: YYYY-MM-DD-{feature-name}-frd.md
   - Requirements and user stories

2. ADR: YYYY-MM-DD-{feature-name}-adr.md
   - Architectural decisions with rationale
   - Alternatives considered
   - Research findings

3. ARQ (Markdown): YYYY-MM-DD-{feature-name}-arq.md
   - Human-readable architecture specification

4. ARQ (YAML): YYYY-MM-DD-{feature-name}-arq.yaml
   - Machine-readable architecture specification

All documents are organized in a single feature folder for easy navigation and reference.

**Key architectural decisions:**
- Domain: domains/{domain}/
- Primary patterns: [list key patterns]
- Files to create: [count]
- Files to modify: [count]
- Architecture rules applied: [count]

**Document Traceability:**
FRD → ADR → ARQ (MD + YAML)
All documents cross-reference each other for full traceability.

**Next Steps:**
1. Review complete documentation set
2. Use ADR to understand decision rationale
3. Use ARQ as implementation reference
4. All code will follow architecture guide rules

The complete architecture documentation is ready for implementation.
```

## Important Guidelines

### FRD Generation Guidelines

1. **Follow Template Exactly**:
   - Use FRD-PROMPT.md as the authoritative template
   - Include all required sections
   - Follow formatting exactly (tables, lists, structure)

2. **Quality Standards**:
   - Be specific, not vague
   - Use concrete examples
   - Provide measurable success criteria
   - Keep under 5 minute read time

3. **Handle Ambiguity**:
   - Mark assumptions clearly: `[ASSUMPTION: rationale]`
   - Ask user for critical missing information
   - Don't proceed with incomplete requirements

### ARQ Generation Guidelines

1. **Reference Architecture Rules by ID**:
   - Always cite specific rules (e.g., "Following `DOMAIN-002`: domains do not import from other domains")
   - Every architectural decision should reference applicable rules
   - Makes decisions traceable and verifiable

2. **Research First, Decide Second**:
   - Don't assume patterns exist - verify with agents
   - Cross-reference multiple similar features
   - Ensure consistency with existing architecture

3. **Be Thorough**:
   - Read all context files COMPLETELY (no limit/offset)
   - Every file path must follow naming conventions
   - Every component must have clear props interface
   - Every API endpoint must be specified

4. **Track Progress**:
   - Use TodoWrite throughout both phases
   - Update todos as steps complete
   - Mark phase transitions clearly

5. **No Open Questions**:
   - Resolve all ambiguities before generating ARQ
   - If questions remain, ask user
   - ARQ must be complete and actionable

## ARQ Markdown Template

```markdown
---
# YAML Frontmatter
feature: "{feature-name}"
domain: "{domain-name}"
created: "{YYYY-MM-DD}"
frd_source: "thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-frd.md"
adr_source: "thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-adr.md"
status: "approved"
---

# Architecture Requirements Document: {Feature Name}

## 1. Executive Summary
[2-3 sentences overview of architectural approach]

## 2. Domain Assignment
**Domain:** `domains/{domain-name}/`
**Rationale:** [Why this feature belongs in this domain]
**Architecture Rules Applied:** [`DOMAIN-XXX`, `STRUCTURE-XXX`]

## 3. Technical Stack Decisions

### 3.1 State Management
- **Approach:** [TanStack Query / Zustand / Local State]
- **Rationale:** [Why this approach based on similar features]
- **Rules Applied:** [`API-XXX`, `PRINCIPLE-XXX`]

### 3.2 UI Framework
- **Radix Components:** [List components to use]
- **Custom Components:** [New components to create]
- **Rules Applied:** [`FEATURE-XXX`, `NAMING-XXX`]

### 3.3 Third-Party Libraries
- **New Dependencies:** [If any new packages needed]
- **Existing Libraries:** [Which existing libs to use]
- **Rules Applied:** [`LIB-XXX`]

### 3.4 Data Layer
- **API Communication:** [REST / GraphQL / WebSocket]
- **Caching Strategy:** [TanStack Query configuration]
- **Data Validation:** [Zod schemas at boundaries]
- **Rules Applied:** [`API-XXX`, `TYPES-XXX`]

## 4. File Structure & Organization

### 4.1 New Files to Create

```
domains/{domain}/
├── api/
│   ├── {domain}.api.ts          # FR-XXX: API endpoints
│   └── {domain}.queries.ts      # FR-XXX: TanStack Query hooks
├── models/
│   ├── {entity}.model.ts        # FR-XXX: Domain entity
│   └── {entity}.schema.ts       # FR-XXX: Zod validation
├── services/
│   └── {feature}.service.ts     # FR-XXX: Business logic
├── features/
│   └── {Feature}/
│       ├── {Feature}.tsx        # FR-XXX: Main component
│       ├── {Feature}.types.ts   # Public types
│       ├── components/
│       │   └── {Sub}.tsx        # FR-XXX: Sub-component
│       ├── hooks/
│       │   └── use-{hook}.ts    # FR-XXX: Custom hook
│       └── index.ts             # Public API
└── shared/
    └── types/
        └── {feature}.types.ts   # DTOs
```

**Naming Convention Verification:**
- Component files: PascalCase ✓
- Hook files: kebab-case with `use-` prefix ✓
- Type files: kebab-case with `.types.ts` ✓
- Model files: kebab-case with `.model.ts` ✓

**Rules Applied:** [`STRUCTURE-XXX`, `NAMING-XXX`, `FEATURE-XXX`]

**FRD Requirements Mapped:**
- FR-001 → `{file path}` - [description]
- FR-002 → `{file path}` - [description]
- NFR-001 → [approach description]

### 4.2 Existing Files to Modify

| File Path | Modifications | FRD Requirement | Reason |
|-----------|---------------|-----------------|--------|
| `path/to/file.ts` | [Changes] | FR-XXX | [Why] |

## 5. Component Architecture

### 5.1 Component Hierarchy

```
{MainFeature}                      # FR-XXX: Main feature
├── {SubComponentA}                # FR-XXX: Sub-feature
│   ├── {NestedComponent}          # FR-XXX: Nested UI
│   └── (uses: use{Hook})          # Custom hook
└── {SubComponentB}                # FR-XXX: Another sub-feature
    └── (uses: {RadixComponent})   # Radix UI component
```

### 5.2 Component Specifications

#### {Feature} (Main Component)

**File:** `domains/{domain}/features/{Feature}/{Feature}.tsx`
**FRD Requirements:** FR-XXX, FR-XXX
**Type:** Feature component (default export)

**Props Interface:**
```typescript
type {Feature}Props = {
  {propName}: {type};  // FR-XXX
  {callback}: () => void;  // FR-XXX
};
```

**State Management:**
- Server state: `use{Feature}Query()` for [data] (FR-XXX)
- Local state: [UI state description] (FR-XXX)
- **Rules Applied:** `FEATURE-001`, `API-001`

**User Story Mapping:**
- User Story 1: [How this component satisfies it]
- Acceptance Criteria: [Which props/behavior map to criteria]

#### {SubComponent}

**File:** `domains/{domain}/features/{Feature}/components/{SubComponent}.tsx`
**FRD Requirements:** FR-XXX
**Type:** Private sub-component

**Props Interface:**
```typescript
type {SubComponent}Props = {
  {propName}: {type};  // FR-XXX
};
```

**Rules Applied:** `FEATURE-003` (private by default)

### 5.3 Data Flow

```
User Interaction (Acceptance Criteria: [X])
      ↓
{Feature} Component
      ↓
use{Feature}Mutation → {domain}.api.{method}()
      ↓
TanStack Query ← API Response (DTO)
      ↓
DTO → Domain Model (create{Entity})
      ↓
Component Re-render
```

**FRD Requirements Satisfied:**
- FR-XXX: [How data flow satisfies requirement]
- NFR-XXX: [Performance/reliability aspect]

**Rules Applied:** `PRINCIPLE-001`, `API-001`

## 6. API Design & Integration

### 6.1 API Endpoints

**File:** `domains/{domain}/api/{domain}.api.ts`

```typescript
export const {domain}Api = {
  // FR-XXX: [requirement description]
  {methodName}: ({params}) =>
    apiClient.{method}<{DtoType}>('/api/{path}', {data}),
} as const;
```

**Endpoints Required:**

| Method | Path | FRD Req | Description |
|--------|------|---------|-------------|
| GET | `/api/{resource}` | FR-XXX | [What it does] |
| POST | `/api/{resource}` | FR-XXX | [What it does] |
| PUT | `/api/{resource}/{id}` | FR-XXX | [What it does] |
| DELETE | `/api/{resource}/{id}` | FR-XXX | [What it does] |

**Rules Applied:** `API-002`, `API-004`

### 6.2 TanStack Query Hooks

**File:** `domains/{domain}/api/{domain}.queries.ts`

```typescript
// Query keys
export const {domain}Keys = {
  all: ['{domain}'] as const,
  {resource}: () => [...{domain}Keys.all, '{resource}'] as const,
};

// FR-XXX: Query hook
export function use{Resource}() {
  return useQuery({
    queryKey: {domain}Keys.{resource}(),
    queryFn: {domain}Api.get{Resource},
  });
}

// FR-XXX: Mutation hook
export function use{Action}{Resource}() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: {domain}Api.{action},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: {domain}Keys.{resource}()
      });
    },
  });
}
```

**Cache Invalidation:**
- [Mutation X] invalidates [Query Y] - FR-XXX
- Optimistic updates: [If applicable] - NFR-XXX

**Rules Applied:** `API-001`, `API-004`

### 6.3 Data Transformation

**DTO (API shape):**
```typescript
// File: domains/{domain}/shared/types/{entity}.types.ts
export type {Entity}Dto = {
  {api_field}: {type};  // Snake_case from API
};
```

**Domain Model (app shape):**
```typescript
// File: domains/{domain}/models/{entity}.model.ts
export type {Entity} = Readonly<{
  {fieldName}: {type};  // CamelCase for app
}>;

// FR-XXX: Factory function
export function create{Entity}(dto: {Entity}Dto): {Entity} {
  return Object.freeze({
    {fieldName}: dto.{api_field},
  });
}
```

**Rules Applied:** `PRINCIPLE-001`, `TYPES-004`, `TYPES-005`

## 7. State Management Strategy

### 7.1 Server State
- **Tool:** TanStack Query
- **Location:** `domains/{domain}/api/{domain}.queries.ts`
- **Scope:** All API data (FR-XXX, FR-XXX)

### 7.2 Client State
- **Global:** [None / Zustand / Context]
- **Local:** useState for UI-only state
- **Forms:** [React Hook Form / Controlled]
- **FRD Requirements:** FR-XXX (if applicable)

### 7.3 Derived State
- **Memoization:** useMemo for [specific computation] - NFR-XXX

**Rules Applied:** `PRINCIPLE-002`, `API-001`

## 8. Type System Design

### 8.1 Type Definitions

**Component Props:**
```typescript
// FR-XXX: Main feature props
export type {Feature}Props = { /* ... */ };
```

**Domain Types:**
```typescript
// FR-XXX: Business entity
export type {Entity} = Readonly<{ /* ... */ }>;
```

**API Types:**
```typescript
// API response shape
export type {Entity}Dto = { /* ... */ };
```

**Rules Applied:** `TYPES-001`, `TYPES-002`, `FEATURE-002`

### 8.2 Validation Schemas

**File:** `domains/{domain}/config/validation.ts`

```typescript
import { z } from 'zod';

// FR-XXX: Input validation
export const {entity}Schema = z.object({
  {field}: z.{type}(),
});

export type {Entity}Input = z.infer<typeof {entity}Schema>;
```

**Applied at:** Form submissions, API boundaries (FR-XXX)
**Rules Applied:** `PRINCIPLE-007`, `CONFIG-004`

## 9. Testing Strategy

### 9.1 Unit Tests

**Files to Create:**
- `domains/{domain}/features/{Feature}/{Feature}.test.tsx`
- `domains/{domain}/models/{entity}.model.test.ts`

**Test Cases (from Acceptance Criteria):**
- User Story 1, Criterion 1: [Test description]
- User Story 1, Criterion 2: [Test description]
- FR-XXX edge case: [Test description]

**Rules Applied:** `TEST-001`, `TEST-002`

### 9.2 Integration Tests

**File:** `domains/{domain}/features/{Feature}/{Feature}.integration.test.tsx`

**Scope:**
- Full user flow from User Story 1
- API integration for FR-XXX
- State updates for FR-XXX

**Rules Applied:** `TEST-003`

## 10. Error Handling

### 10.1 Error Boundary

**File:** `domains/{domain}/components/{Domain}ErrorBoundary/{Domain}ErrorBoundary.tsx`
**Rules Applied:** `ERROR-001`, `ERROR-002`

### 10.2 API Error Handling
- Network errors: TanStack Query retry (NFR-XXX)
- Validation errors: Zod at form level (FR-XXX)
- Business errors: Display in UI (FR-XXX)

## 11. Performance Considerations

### 11.1 NFR Compliance
- **NFR-001:** [How architecture addresses this]
- **NFR-002:** [How architecture addresses this]

### 11.2 Optimization Strategy
- Code splitting: [Approach]
- Memoization: [Where applied]
- Data fetching: [Strategy]

## 12. Accessibility

**WCAG Level:** [From NFR-XXX]
**Keyboard nav:** [Requirements from FR-XXX]
**Screen readers:** [ARIA strategy]

## 13. Security

- Input validation: Zod at all boundaries (FR-XXX)
- XSS prevention: React escaping + CSP
- Auth integration: [If applicable]
- **Rules Applied:** `PRINCIPLE-007`

## 14. Success Metrics Mapping

Map FRD Section 8 metrics to architecture:

| Metric | Architecture Support | Measurement |
|--------|---------------------|-------------|
| [Metric from FRD] | [How ARQ enables measurement] | [Where to measure] |

## 15. Migration & Rollout

### 15.1 Breaking Changes
[Any breaking changes to existing code]

### 15.2 Rollout Steps
1. [Step 1]
2. [Step 2]

## 16. Architecture Decision Records

### ADR-{Feature}-001: {Decision Title}
**Status:** Accepted
**Context:** [Why decision was needed]
**Decision:** [What was decided]
**Consequences:** [Trade-offs]
**FRD Requirement:** FR-XXX
**Rules:** `RULE-XXX`

## 17. Implementation Checklist

- [ ] All architecture rules applied
- [ ] All FRD requirements mapped to files
- [ ] File structure follows naming conventions
- [ ] Component hierarchy documented
- [ ] API design complete
- [ ] Type system specified
- [ ] Testing strategy defined
- [ ] Error handling planned
- [ ] Performance addressed (NFR compliance)
- [ ] Security requirements met
- [ ] User approved this ARQ

## 18. References

- **FRD:** `thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-frd.md`
- **ADR:** `thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-adr.md` - Decision rationale
- **Architecture Guide:** `.claude/code-base-style-guides/architecture-overview.md`
- **Naming Conventions:** `.claude/code-base-style-guides/naming-conventions-overview.md`
- **Similar Features:**
  - `{file:line}` - [{pattern demonstrated}]

---

*Generated by `/create_arq` on {YYYY-MM-DD}*
*This ARQ serves as the architectural reference for implementation*
*See ADR for decision rationale and alternatives considered*
```

## ARQ YAML Template

```yaml
metadata:
  feature_name: "{feature-name}"
  domain: "{domain-name}"
  created_date: "{YYYY-MM-DD}"
  frd_source: "thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-frd.md"
  adr_source: "thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-adr.md"
  status: "approved"

executive_summary:
  overview: "[2-3 sentence overview]"

domain_assignment:
  domain: "domains/{domain-name}/"
  rationale: "[Why this feature belongs here]"
  rules_applied:
    - "DOMAIN-XXX"
    - "STRUCTURE-XXX"

technical_stack:
  state_management:
    approach: "[TanStack Query / Zustand / Local State]"
    rationale: "[Why based on similar features]"
    rules: ["API-XXX", "PRINCIPLE-XXX"]

  ui_framework:
    radix_components: ["Component1", "Component2"]
    custom_components: ["CustomComponent1"]
    rules: ["FEATURE-XXX", "NAMING-XXX"]

  third_party_libraries:
    new_dependencies: []
    existing_libraries: ["library1", "library2"]
    rules: ["LIB-XXX"]

  data_layer:
    communication: "[REST / GraphQL / WebSocket]"
    caching_strategy: "[TanStack Query configuration]"
    validation: "Zod schemas at boundaries"
    rules: ["API-XXX", "TYPES-XXX"]

file_structure:
  new_files:
    - path: "domains/{domain}/api/{domain}.api.ts"
      frd_requirement: "FR-XXX"
      description: "API endpoints"

    - path: "domains/{domain}/api/{domain}.queries.ts"
      frd_requirement: "FR-XXX"
      description: "TanStack Query hooks"

    - path: "domains/{domain}/models/{entity}.model.ts"
      frd_requirement: "FR-XXX"
      description: "Domain entity"

    - path: "domains/{domain}/models/{entity}.schema.ts"
      frd_requirement: "FR-XXX"
      description: "Zod validation schema"

    - path: "domains/{domain}/services/{feature}.service.ts"
      frd_requirement: "FR-XXX"
      description: "Business logic"

    - path: "domains/{domain}/features/{Feature}/{Feature}.tsx"
      frd_requirement: "FR-XXX"
      description: "Main feature component"

    - path: "domains/{domain}/features/{Feature}/{Feature}.types.ts"
      frd_requirement: "FR-XXX"
      description: "Public types"

    - path: "domains/{domain}/features/{Feature}/components/{Sub}.tsx"
      frd_requirement: "FR-XXX"
      description: "Sub-component"

    - path: "domains/{domain}/features/{Feature}/hooks/use-{hook}.ts"
      frd_requirement: "FR-XXX"
      description: "Custom hook"

  files_to_modify:
    - path: "path/to/file.ts"
      modifications: "[Changes description]"
      frd_requirement: "FR-XXX"
      reason: "[Why modification needed]"

  naming_conventions:
    component_files: "PascalCase"
    hook_files: "kebab-case with use- prefix"
    type_files: "kebab-case with .types.ts"
    model_files: "kebab-case with .model.ts"

  rules_applied: ["STRUCTURE-XXX", "NAMING-XXX", "FEATURE-XXX"]

component_architecture:
  hierarchy:
    - name: "{MainFeature}"
      frd_requirement: "FR-XXX"
      children:
        - name: "{SubComponentA}"
          frd_requirement: "FR-XXX"
          children:
            - name: "{NestedComponent}"
              frd_requirement: "FR-XXX"
              uses_hook: "use{Hook}"
        - name: "{SubComponentB}"
          frd_requirement: "FR-XXX"
          uses_radix: "{RadixComponent}"

  components:
    - name: "{Feature}"
      file: "domains/{domain}/features/{Feature}/{Feature}.tsx"
      frd_requirements: ["FR-XXX", "FR-XXX"]
      type: "Feature component (default export)"
      props:
        - name: "{propName}"
          type: "{type}"
          frd_requirement: "FR-XXX"
        - name: "{callback}"
          type: "() => void"
          frd_requirement: "FR-XXX"
      state_management:
        server_state: "use{Feature}Query() for [data] (FR-XXX)"
        local_state: "[UI state description] (FR-XXX)"
      rules_applied: ["FEATURE-001", "API-001"]
      user_story_mapping:
        - story: "User Story 1"
          satisfaction: "[How component satisfies it]"
          acceptance_criteria: "[Which props/behavior map]"

    - name: "{SubComponent}"
      file: "domains/{domain}/features/{Feature}/components/{SubComponent}.tsx"
      frd_requirements: ["FR-XXX"]
      type: "Private sub-component"
      props:
        - name: "{propName}"
          type: "{type}"
          frd_requirement: "FR-XXX"
      rules_applied: ["FEATURE-003"]

  data_flow:
    steps:
      - "User Interaction (Acceptance Criteria: [X])"
      - "{Feature} Component"
      - "use{Feature}Mutation → {domain}.api.{method}()"
      - "TanStack Query ← API Response (DTO)"
      - "DTO → Domain Model (create{Entity})"
      - "Component Re-render"
    frd_requirements_satisfied:
      - requirement: "FR-XXX"
        description: "[How data flow satisfies requirement]"
      - requirement: "NFR-XXX"
        description: "[Performance/reliability aspect]"
    rules_applied: ["PRINCIPLE-001", "API-001"]

api_design:
  endpoints:
    - method: "GET"
      path: "/api/{resource}"
      frd_requirement: "FR-XXX"
      description: "[What it does]"

    - method: "POST"
      path: "/api/{resource}"
      frd_requirement: "FR-XXX"
      description: "[What it does]"

    - method: "PUT"
      path: "/api/{resource}/{id}"
      frd_requirement: "FR-XXX"
      description: "[What it does]"

    - method: "DELETE"
      path: "/api/{resource}/{id}"
      frd_requirement: "FR-XXX"
      description: "[What it does]"

  tanstack_query:
    file: "domains/{domain}/api/{domain}.queries.ts"
    query_keys:
      all: "['{domain}']"
      resource: "[...{domain}Keys.all, '{resource}']"

    hooks:
      - name: "use{Resource}"
        type: "query"
        frd_requirement: "FR-XXX"
        query_key: "{domain}Keys.{resource}()"
        query_fn: "{domain}Api.get{Resource}"

      - name: "use{Action}{Resource}"
        type: "mutation"
        frd_requirement: "FR-XXX"
        mutation_fn: "{domain}Api.{action}"
        invalidates: "{domain}Keys.{resource}()"

    cache_invalidation:
      - mutation: "[Mutation X]"
        invalidates: "[Query Y]"
        frd_requirement: "FR-XXX"
      - optimistic_updates: "[If applicable]"
        frd_requirement: "NFR-XXX"

  data_transformation:
    dto:
      file: "domains/{domain}/shared/types/{entity}.types.ts"
      fields:
        - name: "{api_field}"
          type: "{type}"
          case: "snake_case"

    domain_model:
      file: "domains/{domain}/models/{entity}.model.ts"
      fields:
        - name: "{fieldName}"
          type: "{type}"
          case: "camelCase"
      factory_function: "create{Entity}(dto: {Entity}Dto): {Entity}"
      frd_requirement: "FR-XXX"

  rules_applied: ["API-001", "API-002", "API-004", "PRINCIPLE-001", "TYPES-004", "TYPES-005"]

state_management:
  server_state:
    tool: "TanStack Query"
    location: "domains/{domain}/api/{domain}.queries.ts"
    scope: "All API data (FR-XXX, FR-XXX)"

  client_state:
    global: "[None / Zustand / Context]"
    local: "useState for UI-only state"
    forms: "[React Hook Form / Controlled]"
    frd_requirements: "FR-XXX (if applicable)"

  derived_state:
    memoization: "useMemo for [specific computation] - NFR-XXX"

  rules_applied: ["PRINCIPLE-002", "API-001"]

type_system:
  definitions:
    - category: "Component Props"
      example: "type {Feature}Props = { /* ... */ }"
      frd_requirement: "FR-XXX"

    - category: "Domain Types"
      example: "type {Entity} = Readonly<{ /* ... */ }>"
      frd_requirement: "FR-XXX"

    - category: "API Types"
      example: "type {Entity}Dto = { /* ... */ }"

  validation_schemas:
    file: "domains/{domain}/config/validation.ts"
    schemas:
      - name: "{entity}Schema"
        frd_requirement: "FR-XXX"
        applied_at: "Form submissions, API boundaries"

  rules_applied: ["TYPES-001", "TYPES-002", "FEATURE-002", "PRINCIPLE-007", "CONFIG-004"]

testing_strategy:
  unit_tests:
    files:
      - "domains/{domain}/features/{Feature}/{Feature}.test.tsx"
      - "domains/{domain}/models/{entity}.model.test.ts"

    test_cases:
      - source: "User Story 1, Criterion 1"
        description: "[Test description]"
      - source: "User Story 1, Criterion 2"
        description: "[Test description]"
      - source: "FR-XXX edge case"
        description: "[Test description]"

    rules_applied: ["TEST-001", "TEST-002"]

  integration_tests:
    file: "domains/{domain}/features/{Feature}/{Feature}.integration.test.tsx"
    scope:
      - "Full user flow from User Story 1"
      - "API integration for FR-XXX"
      - "State updates for FR-XXX"
    rules_applied: ["TEST-003"]

error_handling:
  error_boundary:
    file: "domains/{domain}/components/{Domain}ErrorBoundary/{Domain}ErrorBoundary.tsx"
    rules_applied: ["ERROR-001", "ERROR-002"]

  api_errors:
    - type: "Network errors"
      strategy: "TanStack Query retry"
      frd_requirement: "NFR-XXX"
    - type: "Validation errors"
      strategy: "Zod at form level"
      frd_requirement: "FR-XXX"
    - type: "Business errors"
      strategy: "Display in UI"
      frd_requirement: "FR-XXX"

performance:
  nfr_compliance:
    - requirement: "NFR-001"
      approach: "[How architecture addresses this]"
    - requirement: "NFR-002"
      approach: "[How architecture addresses this]"

  optimization:
    code_splitting: "[Approach]"
    memoization: "[Where applied]"
    data_fetching: "[Strategy]"

accessibility:
  wcag_level: "[From NFR-XXX]"
  keyboard_navigation: "[Requirements from FR-XXX]"
  screen_readers: "[ARIA strategy]"

security:
  measures:
    - "Input validation: Zod at all boundaries (FR-XXX)"
    - "XSS prevention: React escaping + CSP"
    - "Auth integration: [If applicable]"
  rules_applied: ["PRINCIPLE-007"]

success_metrics:
  mappings:
    - metric: "[Metric from FRD]"
      architecture_support: "[How ARQ enables measurement]"
      measurement: "[Where to measure]"

migration_and_rollout:
  breaking_changes: "[Any breaking changes to existing code]"
  rollout_steps:
    - "[Step 1]"
    - "[Step 2]"

architecture_decision_records:
  - id: "ADR-{Feature}-001"
    title: "{Decision Title}"
    status: "Accepted"
    context: "[Why decision was needed]"
    decision: "[What was decided]"
    consequences: "[Trade-offs]"
    frd_requirement: "FR-XXX"
    rules: ["RULE-XXX"]

implementation_checklist:
  - "All architecture rules applied"
  - "All FRD requirements mapped to files"
  - "File structure follows naming conventions"
  - "Component hierarchy documented"
  - "API design complete"
  - "Type system specified"
  - "Testing strategy defined"
  - "Error handling planned"
  - "Performance addressed (NFR compliance)"
  - "Security requirements met"
  - "User approved this ARQ"

references:
  frd: "thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-frd.md"
  adr: "thoughts/shared/features/YYYY-MM-DD-{feature-name}/YYYY-MM-DD-{feature-name}-adr.md"
  architecture_guide: ".claude/code-base-style-guides/architecture-overview.md"
  naming_conventions: ".claude/code-base-style-guides/naming-conventions-overview.md"
  similar_features:
    - path: "{file:line}"
      pattern: "[pattern demonstrated]"

generated:
  command: "/create_arq"
  date: "{YYYY-MM-DD}"
  purpose: "Architectural reference for implementation"
```
