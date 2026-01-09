# Claude Code Commands for Expanse Platform

This directory contains custom commands (slash commands) for Claude Code to help with development workflows.

## Available Commands

### `/refactor-style` - Refactor to Style Guide

Automatically refactors code to meet the code-base-style-guides conventions.

**Usage:**
```bash
/refactor-style
```

Or to refactor a specific path:
```bash
/refactor-style src/hooks/useModalHotkeys/
/refactor-style src/components/Editor/
/refactor-style src/hooks/useModalHotkeys/index.ts
```

**What it does:**

1. **Analyzes Code** - Identifies violations of the style guide:
   - Incorrect hook names (missing `use` prefix)
   - Wrong variable prefixes (is, has, should, can, will)
   - Function declarations instead of arrow functions
   - Semicolons present
   - Abbreviations and contractions
   - Context duplication in names

2. **Plans Refactoring** - Creates a todo list of all changes needed

3. **Executes Changes** - Systematically refactors each file:
   - Renames hooks, functions, and variables
   - Converts function declarations to arrow functions
   - Removes semicolons
   - Fixes naming conventions
   - Splits files if needed (following SRP)
   - Updates all imports across the codebase

4. **Verifies Changes** - Runs linting to ensure code quality:
   - Executes `npm run lint`
   - Fixes any issues found
   - Confirms all changes are valid

**Examples:**

Refactor entire codebase:
```bash
/refactor-style
```

Refactor a specific hook:
```bash
/refactor-style src/hooks/useModalHotkeys/
```

Refactor all components:
```bash
/refactor-style src/components/
```

Refactor a specific feature:
```bash
/refactor-style src/features/Editor/
```

**What Gets Fixed:**

| Before | After | Reason |
|--------|-------|--------|
| `function modalHotkeys()` | `const useModalHotkeys = () =>` | Hook must have 'use' prefix |
| `const handleClk = () => {}` | `const handleClick = () => {}` | No abbreviations |
| `const isValid = enabled` | `const isEnabled = enabled` | Reflect expected result |
| `function getData() {}` | `const getData = () => {}` | Arrow functions only |
| `const value = 10;` | `const value = 10` | No semicolons |
| `const usrMsg = getMsg()` | `const userMessage = getMessage()` | No abbreviations |
| `useModalHotkeys.ts` | `use-modal-hotkeys.ts` | Kebab-case for hook files |
| `stringUtils.ts` | `string.utils.ts` | Proper file suffix |

**Style Guide Rules Enforced:**

1. **Naming Conventions:**
   - Hooks: `use` prefix, camelCase export, kebab-case file
   - Components: PascalCase
   - Variables: Descriptive, proper prefixes
   - Functions: A/HC/LC pattern (action + highContext + lowContext)

2. **File Naming:**
   - Hooks: `use-hook-name.ts` (kebab-case)
   - Components: `ComponentName.tsx` (PascalCase)
   - Utils: `name.utils.ts`
   - Services: `name.service.ts`
   - API: `name.api.ts`
   - Types: `name.types.ts`

3. **Code Style:**
   - Arrow functions ONLY
   - No semicolons (ASI)
   - No `let` (use `const` for immutability)
   - No abbreviations or contractions

4. **Architecture:**
   - One component per file
   - Co-located types
   - Proper folder structure

---

### `/create_arq` - Feature Requirements & Architecture Generator

Generates both Feature Requirements Document (FRD) and Architecture Requirements Document (ARQ) from a feature description.

**Purpose:**
- Transform feature ideas into comprehensive requirements (FRD)
- Design technical architecture following codebase patterns (ARQ)
- Ensure architecture complies with style guides
- Create AI-consumable specifications for code generation

**Usage:**
```bash
# Interactive mode
/create_arq

# With inline description
/create_arq "Add dark mode toggle to application settings"

# Skip FRD generation, use existing FRD
/create_arq thoughts/shared/frds/2025-01-09-feature-frd.md
```

**Workflow:**

**Phase 1: FRD Generation**
1. User provides feature description
2. AI generates comprehensive FRD using template
3. Saves to `thoughts/shared/frds/YYYY-MM-DD-{feature}-frd.md`
4. User reviews and approves

**Phase 2: ARQ Generation**
5. AI reads approved FRD and architecture guides
6. Spawns research agents to find similar patterns in codebase
7. Makes technical stack and architecture decisions
8. Generates ARQ.md and ARQ.yaml
9. Saves to `thoughts/shared/architecture/YYYY-MM-DD-{feature}-arq.*`
10. User reviews and approves

**Output Files:**
- FRD: `thoughts/shared/frds/YYYY-MM-DD-{feature}-frd.md`
- ARQ (Markdown): `thoughts/shared/architecture/YYYY-MM-DD-{feature}-arq.md`
- ARQ (YAML): `thoughts/shared/architecture/YYYY-MM-DD-{feature}-arq.yaml`

**What the FRD Contains:**
1. Executive Summary - Brief overview
2. Problem Statement - Current state, pain points, business impact
3. Target Users - Who will use this feature
4. Feature Requirements - Functional (FR-XXX) and non-functional (NFR-XXX) requirements
5. User Stories & Acceptance Criteria - Max 2 user stories with checkboxes
6. Scope Definition - In/out of scope, constraints, assumptions
7. User Flow - ASCII diagram or structured flow
8. Success Metrics - Measurable goals

**What the ARQ Contains:**
1. Executive Summary - Architectural approach overview
2. Domain Assignment - Which domain this feature belongs to
3. Technical Stack Decisions - State management, UI framework, data layer
4. File Structure & Organization - All files to create/modify
5. Component Architecture - Component hierarchy and specifications
6. API Design & Integration - Endpoints, TanStack Query hooks, data transformation
7. State Management Strategy - Server state, client state, derived state
8. Type System Design - Type definitions and Zod validation schemas
9. Testing Strategy - Unit and integration test plans
10. Error Handling - Error boundaries and API error handling
11. Performance Considerations - NFR compliance and optimization
12. Accessibility - WCAG compliance strategy
13. Security - Input validation and XSS prevention
14. Success Metrics Mapping - How architecture supports measurement
15. Migration & Rollout - Breaking changes and rollout steps
16. Architecture Decision Records - ADRs for key decisions
17. Implementation Checklist - Verification checklist
18. References - Links to FRD, style guides, similar features

**Next Steps After ARQ:**
- Use ARQ as comprehensive reference for implementation
- ARQ ensures all code follows architecture patterns
- Hand off ARQ to development team or AI agents for coding

**Examples:**

See example documents:
- [`thoughts/shared/frds/2025-01-09-onboarding-frd.md`](../../thoughts/shared/frds/2025-01-09-onboarding-frd.md)
- [`thoughts/shared/architecture/2025-01-09-onboarding-arq.md`](../../thoughts/shared/architecture/2025-01-09-onboarding-arq.md)
- [`thoughts/shared/architecture/2025-01-09-onboarding-arq.yaml`](../../thoughts/shared/architecture/2025-01-09-onboarding-arq.yaml)

**Key Features:**
- **Research-Driven**: Spawns agents to find similar patterns in codebase
- **Style Guide Compliance**: References architecture rules by ID (DOMAIN-001, FEATURE-003, etc.)
- **Comprehensive**: Maps every FRD requirement (FR-XXX, NFR-XXX) to specific files/components
- **Dual Format**: Generates both human-readable Markdown and AI-consumable YAML
- **Interactive**: User approval required at both FRD and ARQ stages
- **Complete**: No open questions - all decisions made before finalizing

**Best Practices:**

Before running `/create_arq`:
1. Have a clear feature description ready
2. Know your target users and their pain points
3. Understand business goals and success metrics

During FRD generation:
1. Review all sections carefully
2. Request modifications if anything is unclear
3. Ensure requirements are specific and measurable
4. Don't approve until you're satisfied

During ARQ generation:
1. Review architectural decisions
2. Verify similar patterns were found
3. Check that all FRD requirements are mapped
4. Ensure file structure follows naming conventions
5. Don't approve until architecture is complete

After ARQ approval:
1. Use ARQ as your implementation reference
2. Follow the file structure exactly as specified
3. Implement components in the order suggested
4. Run automated verification steps from success criteria

---

## Other Available Commands

This directory contains several other custom commands. Check each `.md` file for specific usage:

- `/commit` - Create git commits
- `/create_plan` - Create implementation plans
- `/debug` - Debug issues during testing
- `/linear` - Linear ticket management
- And many more...

## How Commands Work

Commands are Markdown files in this directory. The filename (without `.md`) becomes the command name. For example:
- `refactor_style.md` → `/refactor-style` command
- `commit.md` → `/commit` command

## Creating New Commands

To create a new command:

1. Create a `.md` file in `.claude/commands/`
2. Write clear instructions for what the command should do
3. Use the filename (without extension) as the command name
4. Underscores in filename become hyphens in command (e.g., `my_command.md` → `/my-command`)

Example structure:
```markdown
# Command Name

Brief description of what this command does.

## Initial Response

What to say when the command is invoked.

## Step-by-Step Process

1. First step
2. Second step
3. etc.

## Important Notes

- Key things to remember
- Best practices
```

## Style Guide Reference

The `/refactor-style` command follows all guidelines in `.claude/code-base-style-guides/`:

- [Naming Conventions Overview](../code-base-style-guides/naming-conventions-overview.md)
- [Architecture Guide](../code-base-style-guides/architecture-simplified-guide.md)
- [Naming Guidelines](../code-base-style-guides/naming-guidelines.md)
- [How to Name Functions](../code-base-style-guides/how-to-name/how-to-name-functions.md)
- [How to Name React Variables](../code-base-style-guides/how-to-name/how-to-name-react-variables.md)
- [Business Logic Naming](../code-base-style-guides/how-to-name-react-SRP-layers/02-business-logic-layer-naming-guide.md)

## Troubleshooting

**Command not found?**
- Make sure the `.md` file is in `.claude/commands/`
- Check that the filename matches the command (with underscores → hyphens)
- Restart Claude Code if needed

**Linting fails after refactoring?**
- The command will automatically attempt to fix linting issues
- Check the output for specific errors
- Some issues may need manual intervention

**Imports broken?**
- The command uses Grep to find and update all imports
- If some imports are missed, run: `npm run lint` to find them
- Update manually if needed

## Best Practices

### Before Running `/refactor-style`
1. **Commit your work** - Ensure you have a clean git state
2. **Create a branch** - `git checkout -b refactor/style-guide`
3. **Start small** - Test on a single folder first

### During Refactoring
1. **Watch the output** - Monitor for any issues
2. **Let it complete** - The command will handle everything

### After Refactoring
1. **Review changes** - `git diff` to see all modifications
2. **Run tests** - `npm test` to ensure functionality preserved
3. **Commit changes** - Use `/commit` command or commit manually

## Need Help?

- Check the style guide documents for naming conventions
- Review the command file for details on what gets changed
- Open an issue if you find bugs or have suggestions
