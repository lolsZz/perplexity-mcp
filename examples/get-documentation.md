# Get Documentation Tool Example

The get_documentation tool retrieves comprehensive documentation and usage examples for specific technologies, libraries, or APIs. It provides structured information including overview, features, setup, examples, and best practices.

## Example 1: React Hooks Documentation

### Request
```json
{
  "query": "React useEffect hook",
  "context": "Focus on cleanup, dependencies, and common patterns"
}
```

### Response
```markdown
# React useEffect Hook Documentation

## 1. Basic Overview and Purpose
The useEffect hook lets you perform side effects in function components. It serves as a replacement for lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount combined.

## 2. Key Features and Capabilities
- Handles side effects in functional components
- Supports cleanup operations
- Controls effect timing with dependencies array
- Runs after every render by default
- Can skip effects with dependency optimization

## 3. Installation/Setup
Available in React 16.8+:
```javascript
import { useEffect } from 'react';
```

## 4. Common Usage Examples

### Basic Effect
```javascript
useEffect(() => {
  document.title = `User: ${username}`;
}, [username]); // Only re-run when username changes
```

### Data Fetching
```javascript
useEffect(() => {
  const fetchData = async () => {
    const response = await api.getData();
    setData(response);
  };
  fetchData();
}, []); // Empty array = run once on mount
```

### Cleanup Example
```javascript
useEffect(() => {
  const subscription = dataSource.subscribe();
  // Cleanup function
  return () => {
    subscription.unsubscribe();
  };
}, [dataSource]); // Re-run if dataSource changes
```

## 5. Best Practices
1. Always define dependencies array
2. Keep effects focused and single-purpose
3. Use cleanup functions for subscriptions/listeners
4. Avoid infinite loops with proper dependencies
5. Consider using useCallback for function dependencies

## 6. Common Pitfalls to Avoid
- Missing dependency array (causes infinite re-renders)
- Incorrect dependencies (stale closures)
- Forgetting cleanup functions (memory leaks)
- Direct state updates without cleanup
- Complex state updates (use useReducer instead)

## 7. Links to Official Documentation
- [React useEffect Documentation](https://react.dev/reference/react/useEffect)
- [React Hooks FAQ](https://react.dev/learn/synchronizing-with-effects)
```

## Example 2: TypeScript Generics

### Request
```json
{
  "query": "TypeScript generics",
  "context": "Include advanced patterns and constraints"
}
```

### Response
```markdown
# TypeScript Generics Documentation

## 1. Basic Overview and Purpose
Generics enable you to create reusable components that work with multiple types while maintaining type safety. They provide type variables that capture types for later use.

## 2. Key Features and Capabilities
- Type safety with flexible types
- Constraint support
- Default type parameters
- Generic interfaces and classes
- Generic type inference

## 3. Installation/Setup
Available in any TypeScript project:
```typescript
// No special import needed
```

## 4. Common Usage Examples

### Basic Generic Function
```typescript
function identity<T>(arg: T): T {
  return arg;
}
// Usage
const num = identity(42);    // type: number
const str = identity("text"); // type: string
```

### Generic Interface
```typescript
interface Container<T> {
  value: T;
  getValue(): T;
}

class NumberContainer implements Container<number> {
  constructor(public value: number) {}
  getValue(): number {
    return this.value;
  }
}
```

### Constrained Generics
```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): number {
  return arg.length;
}
```

## 5. Best Practices
1. Use descriptive type parameter names
2. Apply constraints when needed
3. Avoid over-genericizing
4. Leverage type inference
5. Document complex generic patterns

## 6. Common Pitfalls to Avoid
- Over-complicated constraints
- Unnecessary type parameters
- Missing type constraints
- Generic type hell (too many parameters)
- Poor type parameter naming

## 7. Links to Official Documentation
- [TypeScript Generics Documentation](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
```

## Usage Notes

1. **Query Formulation**
   - Be specific about the technology/feature
   - Include version if relevant
   - Specify aspects to focus on

2. **Context Usage**
   - Provide additional focus areas
   - Mention specific use cases
   - Request specific examples

3. **Limitations**
   - Documentation reflects latest stable version
   - Some experimental features may not be covered
   - Framework-specific details may vary
