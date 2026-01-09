# `/refactor-style` Command - Quick Reference

## Command

```bash
/refactor-style [path]
```

## Purpose

Automatically refactor code to meet the code-base-style-guides conventions.

## Parameters

- `path` (optional) - File or folder to refactor
  - Default: `src/` (entire codebase)
  - Can be a folder: `src/hooks/`, `src/components/`
  - Can be a file: `src/hooks/useModalHotkeys/index.ts`

## What Gets Fixed

### 1. Hook Naming
```typescript
// Before
function modalHotkeys() { ... }

// After
const useModalHotkeys = () => { ... }
```

### 2. Variable Prefixes
```typescript
// Before
const open = true
const error = null
const update = false

// After
const isOpen = true
const hasError = error !== null
const shouldUpdate = false
```

### 3. No Abbreviations
```typescript
// Before
const usrName = "John"
const handleClk = () => {}
const err = new Error()

// After
const userName = "John"
const handleClick = () => {}
const error = new Error()
```

### 4. Arrow Functions Only
```typescript
// Before
function getData() {
  return data
}

// After
const getData = () => {
  return data
}
```

### 5. No Semicolons
```typescript
// Before
const value = 10;
setData(value);

// After
const value = 10
setData(value)
```

### 6. Import Paths - ALWAYS Use @ Alias
```typescript
// Before - Relative paths (❌ NEVER)
import useLanguageSelector from "./hooks/useLanguageSelector"
import { ILanguageSelector } from "./types/LanguageSelector.types"
import { languageSelectorVariants } from "./styles/LanguageSelector.styles"
import LanguageDropdown from "./components/LanguageSelector.dropdown"
import Button from "../ui/Button/Button"
import { someUtil } from "../../utils/someUtil"

// After - @ alias paths (✅ ALWAYS)
import useLanguageSelector from "@/shared/components/LanguageSelector/hooks/useLanguageSelector"
import { type ILanguageSelector } from "@/shared/components/LanguageSelector/types/LanguageSelector.types"
import { languageSelectorVariants } from "@/shared/components/LanguageSelector/styles/LanguageSelector.styles"
import LanguageDropdown from "@/shared/components/LanguageSelector/components/LanguageSelector.dropdown"
import Button from "@/shared/components/ui/Button/Button"
import { someUtil } from "@/utils/someUtil"
```

**Import Path Rules:**
- `@` resolves to `src/` directory
- ALWAYS use full absolute path from `src/`
- NO relative paths (`.`, `..`, `./`, `../`) - NEVER
- Applies to ALL imports: hooks, types, styles, components, utils, services, features

### 7. Context Duplication
```typescript
// In user.ts file:

// Before
const getUserName = () => user.name
const getUserEmail = () => user.email

// After
const getName = () => user.name
const getEmail = () => user.email
```

### 8. Event Handlers
```typescript
// Before (internal handler)
const onClickButton = () => {}
const buttonClick = () => {}
const handleClk = () => {}

// After (internal handler)
const handleButtonClick = () => {}

// Props interface
interface Props {
  onClick: () => void  // Keep 'on' prefix for props
}
```

### 9. File Names
```bash
# Before
useModalHotkeys.ts      # Hook file
modalUtils.ts           # Utils file
userService.ts          # Service file

# After
use-modal-hotkeys.ts    # Kebab-case for hooks
modal.utils.ts          # With suffix
user.service.ts         # With suffix
```

### 10. Component Structure (Reference: `/src/shared/components/ui/Button`)
```bash
# Before: Monolithic component
Card/
└── Card.tsx  # Everything in one 500-line file

# After: Properly structured component
Card/
├── Card.tsx                    # Main component (composition)
├── Card.stories.tsx            # Storybook stories
├── components/                 # Sub-components
│   ├── Card.header.tsx         # Header sub-component
│   └── Card.content.tsx        # Content sub-component
├── hooks/                      # Component-specific hooks
│   └── useCardExpansion.tsx    # Extracted logic
├── styles/                     # Style definitions
│   └── Card.styles.tsx         # CVA variants and utilities
└── types/                      # TypeScript definitions
    └── Card.types.tsx          # All interfaces
```

**Component Structure Rules:**
- **Main component** (`ComponentName.tsx`): Composition only, imports from subdirectories
- **Sub-components** (`components/`): Named as `ComponentName.{purpose}.tsx` (e.g., `Button.content.tsx`)
- **Hooks** (`hooks/`): Named as `use{ComponentName}{Purpose}.tsx` (e.g., `useButtonLogic.tsx`)
- **Styles** (`styles/`): Named as `ComponentName.styles.tsx` (CVA variants, utilities)
- **Types** (`types/`): Named as `ComponentName.types.tsx` (all interfaces)
- **Nested components**: If a sub-component is complex, create its own `/components` folder

## Usage Examples

### Example 1: Refactor Entire Codebase
```bash
/refactor-style
```

**What happens:**
1. Analyzes all files in `src/`
2. Creates todo list with all files to refactor
3. Refactors each file systematically
4. Updates all imports
5. Runs `npm run lint`
6. Reports summary

### Example 2: Refactor Single Hook
```bash
/refactor-style src/hooks/useModalHotkeys/
```

**What gets fixed:**
- Hook function name: `modalHotkeys` → `useModalHotkeys`
- File name: `useModalHotkeys.ts` → `use-modal-hotkeys.ts`
- Variable names: `handleClk` → `handleClick`
- Function syntax: `function` → arrow functions
- Semicolons removed
- **All relative imports converted to `@` alias**
- All imports updated across codebase

### Example 3: Refactor Component Folder
```bash
/refactor-style src/components/Editor/
```

**What gets fixed:**
- Component naming (already PascalCase, verified)
- Event handlers: proper `handle` prefix
- Variable prefixes: `is`, `has`, `should`, etc.
- Function declarations → arrow functions
- Semicolons removed
- **All relative imports converted to `@` alias**
- Import updates

### Example 4: Refactor Single File
```bash
/refactor-style src/utils/stringHelpers.ts
```

**What gets fixed:**
- File rename: `stringHelpers.ts` → `string.utils.ts`
- Function names follow A/HC/LC pattern
- No abbreviations
- Arrow functions only
- No semicolons
- **All relative imports converted to `@` alias**
- Import updates everywhere this file is used

### Example 5: Refactor Component Structure
```bash
/refactor-style src/components/UserProfile/UserProfile.tsx
```

**What gets transformed:**
- **From**: Single 400-line `UserProfile.tsx` file
- **To**: Structured component with proper folder organization

**Created structure:**
```bash
UserProfile/
├── UserProfile.tsx              # Main component (50 lines)
├── components/
│   ├── UserProfile.header.tsx   # Extracted header section
│   ├── UserProfile.avatar.tsx   # Extracted avatar section
│   └── UserProfile.stats.tsx    # Extracted stats section
├── hooks/
│   └── useUserProfileData.tsx   # Extracted data fetching logic
├── styles/
│   └── UserProfile.styles.tsx   # CVA variants and style utilities
└── types/
    └── UserProfile.types.tsx    # All interfaces (IUserProfile, IUserProfileHeader, etc.)
```

**What gets done:**
1. Creates `/components`, `/hooks`, `/styles`, `/types` folders
2. Extracts all interfaces to `types/UserProfile.types.tsx`
3. Moves CVA variants to `styles/UserProfile.styles.tsx`
4. Extracts data fetching logic to `hooks/useUserProfileData.tsx`
5. Breaks down UI into sub-components in `components/`
6. Updates main component to focus on composition only
7. **Converts ALL relative imports to `@` alias throughout the component**
8. Updates all imports throughout codebase
9. Applies naming conventions (arrow functions, no semicolons, etc.)
10. Runs linting to verify everything works

## Expected Output

```
Analyzing files in src/hooks/useModalHotkeys/...

Found 3 files to refactor:
- src/hooks/useModalHotkeys/index.ts
- src/hooks/useModalHotkeys/types.ts
- src/hooks/useModalHotkeys/utils.ts

Creating refactoring plan...

✅ Phase 1: Analysis Complete
   - 15 naming violations found
   - 8 function declarations to convert
   - 47 semicolons to remove

📝 Phase 2: Refactoring src/hooks/useModalHotkeys/index.ts

Changes:
- modalHotkeys → useModalHotkeys (hook naming)
- handleClk → handleClick (no abbreviations)
- function handleClose() → const handleClose = () => (arrow function)
- Removed 12 semicolons
- Converted relative imports to @ alias:
  - ./types/types → @/hooks/useModalHotkeys/types/types
  - ../utils/keyboard → @/utils/keyboard

✅ File refactored

📝 Phase 3: Updating imports...

Updated imports in:
- src/components/Modal/Modal.tsx
- src/features/Editor/EditorToolbar.tsx
- src/app/layout.tsx

✅ Imports updated

📝 Phase 4: Running linting...

$ npm run lint

✅ Linting passed with no errors

─────────────────────────────────
Summary:
─────────────────────────────────
Files changed: 3
Renames performed: 15
Imports updated: 8
Lint status: ✅ PASSED
─────────────────────────────────
```

## Process Flow

1. **Analysis Phase**
   - Reads style guides
   - Scans target files
   - Identifies violations

2. **Planning Phase**
   - Creates TodoList
   - Lists all changes
   - Shows plan to user

3. **Execution Phase**
   - Refactors each file
   - Creates new files if needed
   - Updates imports

4. **Verification Phase**
   - Runs `npm run lint`
   - Fixes any errors
   - Reports results

## Naming Convention Rules

### Variables

| Pattern | Usage | Example |
|---------|-------|---------|
| `is*` | Boolean state/characteristic | `isOpen`, `isLoading`, `isValid` |
| `has*` | Possession/presence | `hasError`, `hasPermission`, `hasChildren` |
| `should*` | Conditional logic | `shouldUpdate`, `shouldRender`, `shouldFetch` |
| `can*` | Capability/permission | `canEdit`, `canDelete`, `canSubmit` |
| `will*` | Future state | `willExpire`, `willRedirect` |

### Functions

| Pattern | Usage | Example |
|---------|-------|---------|
| `get*` | Retrieve/access data | `getUser`, `getUserName`, `getTotal` |
| `set*` | Assign value | `setUser`, `setValue`, `setLoading` |
| `handle*` | Event handler (internal) | `handleClick`, `handleSubmit`, `handleChange` |
| `on*` | Event handler (prop) | `onClick`, `onSubmit`, `onChange` |
| `calculate*` | Compute value | `calculateTotal`, `calculateTax` |
| `validate*` | Check rules | `validateEmail`, `validateForm` |
| `format*` | Display formatting | `formatDate`, `formatCurrency` |

### Hooks

| Rule | Example |
|------|---------|
| Must start with `use` | `useModalHotkeys`, `useAuth`, `useForm` |
| camelCase export | `export const useModalHotkeys = () => {}` |
| kebab-case file | `use-modal-hotkeys.ts` |
| camelCase folder | `useModalHotkeys/` |

### Files

| Type | Pattern | Example |
|------|---------|---------|
| Hook | `use-name.ts` | `use-modal-hotkeys.ts` |
| Component | `Name.tsx` | `Button.tsx`, `Modal.tsx` |
| Utils | `name.utils.ts` | `string.utils.ts`, `array.utils.ts` |
| Service | `name.service.ts` | `user.service.ts`, `api.service.ts` |
| API | `name.api.ts` | `user.api.ts`, `auth.api.ts` |
| Types | `name.types.ts` | `user.types.ts`, `api.types.ts` |

## Before Running Checklist

- [ ] Git is clean (`git status`)
- [ ] On a feature branch (`git checkout -b refactor/style-guide`)
- [ ] Familiar with style guide conventions
- [ ] Ready to review changes afterwards

## After Running Checklist

- [ ] Review git diff (`git diff`)
- [ ] Linting passes (`npm run lint`)
- [ ] Tests pass (`npm test`)
- [ ] Functionality preserved (manual testing)
- [ ] Commit changes (`/commit` or manually)

## Common Issues & Solutions

### Issue: Import not updated
**Solution:**
```bash
npm run lint  # Find broken imports
# Then fix manually or re-run /refactor-style on that file
```

### Issue: Linting fails
**Solution:** The command will auto-fix most issues, but check output for manual fixes needed

### Issue: Too many changes
**Solution:** Start with smaller scope:
```bash
/refactor-style src/hooks/useSpecificHook/
```

### Issue: Need to undo
**Solution:**
```bash
git checkout -- .  # Undo all changes
git checkout -- src/hooks/  # Undo specific folder
```

## Tips

1. **Start Small** - Test on a single file first
2. **Use Git** - Always work on a branch
3. **Review Changes** - Check diffs before committing
4. **Run Tests** - Ensure functionality preserved
5. **Incremental** - Refactor folder by folder for large codebases

## Style Guide Files

Located in `.claude/code-base-style-guides/`:
- `naming-conventions-overview.md`
- `architecture-simplified-guide.md`
- `naming-guidelines.md`
- `how-to-name/how-to-name-functions.md`
- `how-to-name/how-to-name-react-variables.md`
- `how-to-name-react-SRP-layers/02-business-logic-layer-naming-guide.md`

## Need Help?

Type `/refactor-style` to see the initial prompt and get guidance from Claude.
