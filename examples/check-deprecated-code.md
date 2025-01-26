# Check Deprecated Code Tool Example

The check_deprecated_code tool analyzes code for deprecated features, patterns, or dependencies, providing detailed migration guidance and best practices for updating to modern alternatives.

## Example 1: React Class Components

### Request
```json
{
  "code": "class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  componentWillMount() {
    this.fetchUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.fetchUser(nextProps.userId);
    }
  }

  fetchUser(userId = this.props.userId) {
    api.getUser(userId).then(user => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        {user ? (
          <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}",
  "technology": "React"
}
```

### Response
```markdown
# Deprecated Code Analysis

## 1. Identified Deprecated Features

### A. Class Component Pattern
- **Status**: Not deprecated but functional components preferred
- **Impact**: Lower maintainability, more complex code
- **Migration Priority**: Medium

### B. componentWillMount Lifecycle
- **Status**: Deprecated since React 16.3
- **Impact**: High - causes potential issues in React 18+
- **Migration Priority**: High

### C. componentWillReceiveProps Lifecycle
- **Status**: Deprecated since React 16.3
- **Impact**: High - causes potential issues in React 18+
- **Migration Priority**: High

## 2. Recommended Updates

### Modern Implementation
```javascript
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await api.getUser(userId);
      setUser(userData);
    };
    fetchUser();
  }, [userId]); // Re-run when userId changes

  return (
    <div>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
```

### Key Changes
1. Converted to functional component
2. Replaced state with useState hook
3. Replaced lifecycle methods with useEffect
4. Simplified data fetching logic
5. Improved dependency management

## 3. Migration Steps
1. Create new functional component
2. Move state to useState hooks
3. Convert lifecycle methods to useEffect
4. Update any instance methods to regular functions
5. Test thoroughly for behavior changes

## 4. Impact Analysis
- **Performance**: Improved memory usage
- **Maintenance**: Easier to understand and modify
- **Future-proof**: Aligned with React's direction
- **Bundle size**: Slightly reduced
- **Testing**: Simpler to test with hooks

## 5. Timeline
- componentWillMount: Removed in React 18
- componentWillReceiveProps: Removed in React 18
- Class components: No removal planned but not recommended for new code
```

## Example 2: Node.js Callback Pattern

### Request
```json
{
  "code": "const fs = require('fs');
const http = require('http');

function readConfig(callback) {
  fs.readFile('config.json', (err, data) => {
    if (err) return callback(err);
    try {
      const config = JSON.parse(data);
      callback(null, config);
    } catch (err) {
      callback(err);
    }
  });
}

const server = http.createServer((req, res) => {
  readConfig((err, config) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading config');
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(config));
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});",
  "technology": "Node.js"
}
```

### Response
```markdown
# Deprecated Code Analysis

## 1. Identified Patterns

### A. Callback Pattern
- **Status**: Not deprecated but Promises/async-await preferred
- **Impact**: Callback hell, error handling complexity
- **Migration Priority**: Medium

### B. Traditional HTTP Server
- **Status**: Not deprecated but modern frameworks preferred
- **Impact**: Limited features, manual routing
- **Migration Priority**: Low

## 2. Recommended Updates

### Modern Implementation
```javascript
import { promises as fs } from 'fs';
import express from 'express';

async function readConfig() {
  try {
    const data = await fs.readFile('config.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Config error: ${err.message}`);
  }
}

const app = express();

app.get('/config', async (req, res) => {
  try {
    const config = await readConfig();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Key Changes
1. Using fs.promises API
2. Async/await for cleaner flow
3. Express.js for better routing
4. Improved error handling
5. Modern ES modules

## 3. Migration Steps
1. Update package.json for ES modules
2. Convert callbacks to async/await
3. Implement proper error handling
4. Add express.js dependency
5. Update API endpoints

## 4. Impact Analysis
- **Readability**: Significantly improved
- **Maintenance**: Easier error handling
- **Performance**: Similar performance
- **Dependencies**: Additional express dependency
- **Learning**: Team needs async/await knowledge

## 5. Best Practices
1. Use try/catch with async/await
2. Implement proper error middleware
3. Add request validation
4. Include proper logging
5. Add health check endpoints

## Usage Notes

1. **Code Analysis**
   - Provide complete code snippets
   - Include relevant dependencies
   - Specify framework versions
   - Note any constraints

2. **Technology Context**
   - Specify the framework/library
   - Include version information
   - Note any special requirements
   - Mention deployment context

3. **Migration Considerations**
   - Breaking changes
   - Dependencies updates
   - Testing requirements
   - Deployment impact
