# Search Tool Example

The search tool allows you to perform general search queries with different levels of detail. You can specify a detail level of "brief", "normal", or "detailed" to control the comprehensiveness of the response.

## Example 1: Basic Search (Normal Detail)

### Request
```json
{
  "query": "What is quantum computing and how does it work?",
  "detail_level": "normal"
}
```

### Response
```markdown
Quantum computing is a type of computing that harnesses quantum mechanical phenomena like superposition and entanglement to perform calculations. Unlike classical computers that use bits (0 or 1), quantum computers use quantum bits or qubits that can exist in multiple states simultaneously.

Key concepts:
1. Superposition: Qubits can be in multiple states at once
2. Entanglement: Qubits can be correlated in ways impossible with classical bits
3. Quantum Gates: Operations that manipulate qubits to perform computations

Current applications focus on optimization problems, cryptography, and molecular simulations. While still emerging, quantum computers show promise for solving complex problems exponentially faster than classical computers.
```

## Example 2: Brief Search

### Request
```json
{
  "query": "What are the main causes of climate change?",
  "detail_level": "brief"
}
```

### Response
```markdown
The main causes of climate change are:
1. Greenhouse gas emissions from burning fossil fuels
2. Deforestation reducing CO2 absorption
3. Industrial processes and agriculture
4. Methane from livestock and landfills
These human activities trap heat in Earth's atmosphere, leading to global warming.
```

## Example 3: Detailed Search

### Request
```json
{
  "query": "Explain the impact of artificial intelligence on modern society",
  "detail_level": "detailed"
}
```

### Response
```markdown
Artificial Intelligence (AI) has profoundly transformed modern society across multiple dimensions:

1. Economic Impact
   - Automation of jobs across industries
   - Creation of new job categories and skills
   - Enhanced productivity and efficiency
   - AI-driven market analysis and decision-making
   - Emergence of AI-focused startups and investments

2. Healthcare Advancements
   - Improved disease diagnosis and prediction
   - Drug discovery acceleration
   - Personalized treatment plans
   - Medical imaging analysis
   - Healthcare resource optimization

3. Education and Learning
   - Personalized learning experiences
   - Automated grading and feedback
   - Intelligent tutoring systems
   - Educational content generation
   - Accessibility improvements

4. Social Implications
   - Changed communication patterns
   - Privacy and surveillance concerns
   - Information filtering and echo chambers
   - AI-generated content and deep fakes
   - Algorithmic bias and fairness issues

5. Transportation and Infrastructure
   - Self-driving vehicle development
   - Traffic management systems
   - Smart city implementations
   - Predictive maintenance
   - Energy grid optimization

6. Environmental Applications
   - Climate modeling and prediction
   - Resource optimization
   - Wildlife conservation
   - Environmental monitoring
   - Sustainable energy solutions

7. Ethical Considerations
   - AI decision-making transparency
   - Accountability frameworks
   - Data privacy protection
   - Bias mitigation strategies
   - AI safety protocols

8. Future Implications
   - Continued technological advancement
   - Workforce transformation
   - Regulatory development
   - International AI competition
   - Human-AI collaboration evolution

This comprehensive impact necessitates careful consideration of both opportunities and challenges as society continues to integrate AI technologies.
```

## Usage Notes

1. **Detail Level Selection**
   - `brief`: Quick, concise answers (1-2 paragraphs)
   - `normal`: Balanced responses with key points (default)
   - `detailed`: Comprehensive analysis with examples and context

2. **Best Practices**
   - Use specific, clear queries
   - Choose appropriate detail level for your needs
   - Consider context when interpreting results

3. **Limitations**
   - Responses reflect available information
   - Very recent events may not be included
   - Complex queries may need refinement
