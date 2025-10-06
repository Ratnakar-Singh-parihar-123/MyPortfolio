import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillComparison = () => {
  const [selectedSkills, setSelectedSkills] = useState(['react', 'javascript']);

  const skillsData = {
    react: {
      name: 'React',
      category: 'Frontend Framework',
      myLevel: 95,
      industryAverage: 75,
      marketDemand: 90,
      salaryImpact: 85,
      learningCurve: 70,
      jobOpenings: 12500,
      avgSalary: '$95,000',
      trendDirection: 'up',
      trendPercentage: 15,
      color: 'bg-blue-500'
    },
    javascript: {
      name: 'JavaScript',
      category: 'Programming Language',
      myLevel: 90,
      industryAverage: 80,
      marketDemand: 95,
      salaryImpact: 80,
      learningCurve: 60,
      jobOpenings: 25000,
      avgSalary: '$85,000',
      trendDirection: 'up',
      trendPercentage: 8,
      color: 'bg-yellow-500'
    },
    typescript: {
      name: 'TypeScript',
      category: 'Programming Language',
      myLevel: 85,
      industryAverage: 65,
      marketDemand: 85,
      salaryImpact: 90,
      learningCurve: 75,
      jobOpenings: 8500,
      avgSalary: '$98,000',
      trendDirection: 'up',
      trendPercentage: 25,
      color: 'bg-blue-600'
    },
    python: {
      name: 'Python',
      category: 'Programming Language',
      myLevel: 80,
      industryAverage: 70,
      marketDemand: 88,
      salaryImpact: 85,
      learningCurve: 50,
      jobOpenings: 18000,
      avgSalary: '$92,000',
      trendDirection: 'up',
      trendPercentage: 12,
      color: 'bg-green-500'
    },
    nodejs: {
      name: 'Node.js',
      category: 'Backend Runtime',
      myLevel: 88,
      industryAverage: 72,
      marketDemand: 82,
      salaryImpact: 88,
      learningCurve: 65,
      jobOpenings: 9500,
      avgSalary: '$96,000',
      trendDirection: 'up',
      trendPercentage: 10,
      color: 'bg-green-600'
    },
    aws: {
      name: 'AWS',
      category: 'Cloud Platform',
      myLevel: 75,
      industryAverage: 60,
      marketDemand: 92,
      salaryImpact: 95,
      learningCurve: 80,
      jobOpenings: 15000,
      avgSalary: '$105,000',
      trendDirection: 'up',
      trendPercentage: 20,
      color: 'bg-orange-500'
    }
  };

  const availableSkills = Object.keys(skillsData)?.filter(
    skill => !selectedSkills?.includes(skill)
  );

  const addSkill = (skillKey) => {
    if (selectedSkills?.length < 4) {
      setSelectedSkills([...selectedSkills, skillKey]);
    }
  };

  const removeSkill = (skillKey) => {
    setSelectedSkills(selectedSkills?.filter(skill => skill !== skillKey));
  };

  const metrics = [
    { key: 'myLevel', label: 'My Proficiency', icon: 'User', unit: '%' },
    { key: 'industryAverage', label: 'Industry Average', icon: 'Users', unit: '%' },
    { key: 'marketDemand', label: 'Market Demand', icon: 'TrendingUp', unit: '%' },
    { key: 'salaryImpact', label: 'Salary Impact', icon: 'DollarSign', unit: '%' },
    { key: 'learningCurve', label: 'Learning Difficulty', icon: 'BookOpen', unit: '%' }
  ];

  const getBarWidth = (value) => `${value}%`;
  
  const getComparisonColor = (myValue, industryValue) => {
    if (myValue > industryValue + 10) return 'text-success';
    if (myValue < industryValue - 10) return 'text-destructive';
    return 'text-warning';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="BarChart3" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Skill Comparison
            </h3>
            <p className="text-sm text-muted-foreground">
              Compare your skills against industry standards
            </p>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {selectedSkills?.length}/4 skills selected
        </div>
      </div>
      {/* Skill Selection */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-foreground mb-3">
          Selected Skills ({selectedSkills?.length})
        </h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedSkills?.map((skillKey) => {
            const skill = skillsData?.[skillKey];
            return (
              <motion.div
                key={skillKey}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary rounded-lg"
              >
                <div className={`w-3 h-3 ${skill?.color} rounded-full`}></div>
                <span className="text-sm font-medium">{skill?.name}</span>
                <button
                  onClick={() => removeSkill(skillKey)}
                  className="hover:bg-primary/20 rounded-full p-1"
                >
                  <Icon name="X" size={12} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {availableSkills?.length > 0 && selectedSkills?.length < 4 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">
              Add Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {availableSkills?.map((skillKey) => {
                const skill = skillsData?.[skillKey];
                return (
                  <button
                    key={skillKey}
                    onClick={() => addSkill(skillKey)}
                    className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className={`w-3 h-3 ${skill?.color} rounded-full`}></div>
                    <span className="text-sm">{skill?.name}</span>
                    <Icon name="Plus" size={12} className="text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* Comparison Chart */}
      <div className="space-y-8">
        {metrics?.map((metric) => (
          <div key={metric?.key} className="space-y-4">
            <div className="flex items-center space-x-2">
              <Icon name={metric?.icon} size={16} className="text-muted-foreground" />
              <h4 className="text-sm font-medium text-foreground">
                {metric?.label}
              </h4>
            </div>
            
            <div className="space-y-3">
              {selectedSkills?.map((skillKey) => {
                const skill = skillsData?.[skillKey];
                const value = skill?.[metric?.key];
                const industryValue = skill?.industryAverage;
                
                return (
                  <div key={`${skillKey}-${metric?.key}`} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 ${skill?.color} rounded-full`}></div>
                        <span className="text-sm font-medium text-foreground">
                          {skill?.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-semibold ${
                          metric?.key === 'myLevel' 
                            ? getComparisonColor(value, industryValue)
                            : 'text-foreground'
                        }`}>
                          {value}{metric?.unit}
                        </span>
                        {metric?.key === 'myLevel' && (
                          <div className="flex items-center space-x-1">
                            {value > industryValue ? (
                              <Icon name="TrendingUp" size={12} className="text-success" />
                            ) : value < industryValue ? (
                              <Icon name="TrendingDown" size={12} className="text-destructive" />
                            ) : (
                              <Icon name="Minus" size={12} className="text-warning" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className={`${skill?.color} h-2 rounded-full`}
                          style={{ width: getBarWidth(value) }}
                          initial={{ width: 0 }}
                          animate={{ width: getBarWidth(value) }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                      
                      {/* Industry average line for comparison */}
                      {metric?.key === 'myLevel' && (
                        <div
                          className="absolute top-0 w-0.5 h-2 bg-muted-foreground opacity-60"
                          style={{ left: `${industryValue}%` }}
                        >
                          <div className="absolute -top-1 -left-2 text-xs text-muted-foreground">
                            Avg
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Market Insights */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">
          Market Insights
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {selectedSkills?.map((skillKey) => {
            const skill = skillsData?.[skillKey];
            return (
              <div key={skillKey} className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-3 h-3 ${skill?.color} rounded-full`}></div>
                  <span className="text-sm font-medium text-foreground">
                    {skill?.name}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Job Openings:</span>
                    <span className="font-medium">{skill?.jobOpenings?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Salary:</span>
                    <span className="font-medium">{skill?.avgSalary}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Trend:</span>
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={skill?.trendDirection === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                        size={12} 
                        className={skill?.trendDirection === 'up' ? 'text-success' : 'text-destructive'} 
                      />
                      <span className={`font-medium ${skill?.trendDirection === 'up' ? 'text-success' : 'text-destructive'}`}>
                        +{skill?.trendPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Export Options */}
      <div className="mt-6 pt-4 border-t border-border flex justify-end space-x-3">
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export Report
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Share"
          iconPosition="left"
        >
          Share Analysis
        </Button>
      </div>
    </div>
  );
};

export default SkillComparison;