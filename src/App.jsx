import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import jsonRules from './rules.json';

function App() {
  const [allSatisfied, setAllSatisfied] = useState(0);

  const data = {
    age: 20,
    isStudent: true,
    income: 60000,
    hasJob: false,
  };

  function evaluateRule(rule, data) {
    if (rule.condition === 'all') {
      return rule.conditions.every((condition) =>
        evaluateCondition(condition, data)
      );
    } else if (rule.condition === 'any') {
      return rule.conditions.some((condition) =>
        evaluateCondition(condition, data)
      );
    }
    return false;
  }

  function evaluateCondition(condition, data) {
    const { field, operator, value } = condition;
    const fieldValue = data[field];

    switch (operator) {
      case '>':
        return fieldValue > value;
      case '>=':
        return fieldValue >= value;
      case '==':
        return fieldValue === value;
      case 'includes':
        return fieldValue.includes(value);
      default:
        return false;
    }
  }

  const myRules = jsonRules;

  const result = myRules.rules.every((rule) => evaluateRule(rule, data));

  console.log(result);
  setAllSatisfied(result);
  // Output: true or false based on whether all conditions are satisfied

  return (
    <>
      <div>{allSatisfied ? 'All condtions satisfied' : 'Not satisfied'}</div>
    </>
  );
}

export default App;
