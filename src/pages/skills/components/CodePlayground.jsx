import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodePlayground = () => {
  const [activeTab, setActiveTab] = useState('react');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const codeExamples = {
    react: {
      title: 'React Component',
      language: 'jsx',
      code: `import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        Counter: {count}
      </h2>
      <div className="space-x-2">
        <button 
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrease
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Increase
        </button>
      </div>
    </div>
  );
};

export default Counter;`,
      output: `<div class="p-4 border rounded-lg">
  <h2 class="text-xl font-bold mb-4">Counter: 5</h2>
  <div class="space-x-2">
    <button class="px-4 py-2 bg-red-500 text-white rounded">
      Decrease
    </button>
    <button class="px-4 py-2 bg-blue-500 text-white rounded">
      Increase
    </button>
  </div>
</div>`
    },
    javascript: {
      title: 'JavaScript Algorithm',
      language: 'javascript',
      code: `// Binary Search Implementation
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Example usage
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
const result = binarySearch(numbers, 7);
console.log(\`Found at index: \${result}\`);`,
      output: `Found at index: 3

Time Complexity: O(log n)
Space Complexity: O(1)

Array: [1, 3, 5, 7, 9, 11, 13, 15]
Target: 7
Steps: 3 iterations
Result: Index 3`
    },
    css: {
      title: 'CSS Animation',
      language: 'css',
      code: `.animated-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  transform: translateY(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.animated-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
}

.animated-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.animated-card:hover::before {
  opacity: 1;
}`,
      output: `Preview:
┌─────────────────────────────┐
│                             │
│    🎨 Animated Card         │
│                             │
│    Hover to see the magic   │
│    ✨ Smooth transitions    │
│    🌈 Gradient background   │
│    📦 3D transform effect   │
│                             │
└─────────────────────────────┘

Effects Applied:
• Gradient background
• Hover lift animation
• Scale transformation
• Enhanced shadow
• Overlay gradient`
    }
  };

  useEffect(() => {
    setCode(codeExamples?.[activeTab]?.code);
    setOutput(codeExamples?.[activeTab]?.output);
  }, [activeTab]);

  const runCode = async () => {
    setIsRunning(true);
    
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOutput(codeExamples?.[activeTab]?.output);
    setIsRunning(false);
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(code);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Code2" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">
              Live Code Playground
            </h3>
          </div>
          
          {/* Language Tabs */}
          <div className="flex space-x-1 bg-background rounded-lg p-1">
            {Object.entries(codeExamples)?.map(([key, example]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  activeTab === key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {example?.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            iconPosition="left"
            onClick={copyCode}
          >
            Copy
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Play"
            iconPosition="left"
            loading={isRunning}
            onClick={runCode}
          >
            Run
          </Button>
        </div>
      </div>
      {/* Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Code Input */}
        <div className="relative">
          <div className="flex items-center justify-between p-3 bg-muted/20 border-b border-border lg:border-b-0 lg:border-r">
            <span className="text-sm font-medium text-muted-foreground">
              {codeExamples?.[activeTab]?.language?.toUpperCase()}
            </span>
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <div className="w-3 h-3 bg-success rounded-full"></div>
            </div>
          </div>
          
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e?.target?.value)}
              className="w-full h-96 p-4 bg-background text-foreground font-mono text-sm resize-none border-none outline-none"
              spellCheck={false}
            />
            <div className="absolute top-4 right-4 text-xs text-muted-foreground">
              Lines: {code?.split('\n')?.length}
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="relative">
          <div className="flex items-center justify-between p-3 bg-muted/20 border-b border-border">
            <span className="text-sm font-medium text-muted-foreground">
              OUTPUT
            </span>
            <div className="flex items-center space-x-2">
              {isRunning && (
                <div className="flex items-center space-x-1 text-xs text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Running...</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-96 p-4 bg-muted/10 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.pre
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-foreground font-mono whitespace-pre-wrap"
              >
                {output}
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between p-4 bg-muted/30 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={14} />
            <span>Live Preview</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>Safe Execution</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Powered by</span>
          <div className="flex items-center space-x-1 text-primary font-medium">
            <Icon name="Code" size={14} />
            <span>PortfolioStudio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;