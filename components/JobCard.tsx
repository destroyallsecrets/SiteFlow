'use client';
import React, { useState } from 'react';
import Mermaid from './Mermaid';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Check, ListChecks } from 'lucide-react';

interface JobCardProps {
  title: string;
  materials: string[];
  steps: string[];
  mermaidChart: string;
}

export default function JobCard({ title, materials, steps, mermaidChart }: JobCardProps) {
  const [phase, setPhase] = useState<'MATERIALS' | 'STEPS' | 'DIAGRAM' | 'COMPLETED'>('MATERIALS');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setPhase(mermaidChart ? 'DIAGRAM' : 'COMPLETED');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else {
      setPhase('MATERIALS');
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl mb-6">
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      
      {phase === 'MATERIALS' && (
        <div className="transition-opacity duration-500 opacity-100">
          <h3 className="text-xl font-semibold text-neutral-300 mb-4 border-b border-neutral-800 pb-2 flex items-center">
            <ListChecks className="mr-2" /> Materials Needed
          </h3>
          <ul className="list-none space-y-3 mb-8">
            {materials.map((mat, idx) => (
              <li key={idx} className="flex items-center text-xl text-neutral-300 bg-neutral-950 p-4 rounded-lg border border-neutral-800">
                <Circle className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0" />
                {mat}
              </li>
            ))}
          </ul>
          
          <button
            onClick={() => setPhase('STEPS')}
            className="w-full p-6 bg-yellow-500 hover:bg-yellow-400 text-neutral-950 rounded-2xl text-2xl font-bold flex items-center justify-center space-x-4 transition-colors"
          >
            <span>Start Procedure</span>
            <ArrowRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {phase === 'STEPS' && (
        <div className="transition-opacity duration-500 opacity-100 flex flex-col h-full min-h-[300px] justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-2">
               <h3 className="text-xl font-semibold text-neutral-300">Step {currentStepIndex + 1} of {steps.length}</h3>
               <span className="text-yellow-500 font-bold bg-yellow-500/10 px-3 py-1 rounded-full">
                 {Math.round(((currentStepIndex) / steps.length) * 100)}%
               </span>
            </div>
            
            <div className="bg-neutral-950 p-8 rounded-xl border border-neutral-800 mb-8 flex items-center justify-center min-h-[200px]">
              <p className="text-3xl md:text-4xl font-bold text-white text-center leading-relaxed">
                {steps[currentStepIndex]}
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-auto">
            <button
              onClick={handlePrevStep}
              className="p-6 bg-neutral-800 hover:bg-neutral-700 text-white rounded-2xl font-bold flex items-center justify-center border border-neutral-700 transition-colors"
            >
              <ArrowLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNextStep}
              className="flex-1 p-6 bg-yellow-500 hover:bg-yellow-400 text-neutral-950 rounded-2xl text-2xl font-bold flex items-center justify-center space-x-4 transition-colors"
            >
              <span>{currentStepIndex === steps.length - 1 ? 'Finish Steps' : 'Next Step'}</span>
              {currentStepIndex === steps.length - 1 ? <Check className="w-8 h-8" /> : <ArrowRight className="w-8 h-8" />}
            </button>
          </div>
        </div>
      )}

      {phase === 'DIAGRAM' && (
        <div className="transition-opacity duration-500 opacity-100">
           <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-2">
               <h3 className="text-xl font-semibold text-neutral-300">Workflow Diagram</h3>
               <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-full">
                 100% Complete
               </span>
            </div>
            <div className="bg-neutral-950 p-4 rounded-lg overflow-x-auto mb-8 border border-neutral-800">
              <Mermaid chart={mermaidChart} />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setPhase('STEPS')}
                className="flex-1 p-6 bg-neutral-800 hover:bg-neutral-700 text-white rounded-2xl text-xl font-bold flex items-center justify-center space-x-4 border border-neutral-700 transition-colors"
              >
                <ArrowLeft className="w-8 h-8" />
                <span>Review Steps</span>
              </button>
              <button
                onClick={() => setPhase('COMPLETED')}
                className="flex-1 p-6 bg-green-500 hover:bg-green-400 text-neutral-950 rounded-2xl text-2xl font-bold flex items-center justify-center space-x-4 transition-colors"
              >
                <span>Done</span>
                <CheckCircle className="w-8 h-8" />
              </button>
            </div>
        </div>
      )}

      {phase === 'COMPLETED' && (
         <div className="transition-opacity duration-500 opacity-100 text-center py-12">
            <CheckCircle className="w-32 h-32 text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-white mb-4">Job Completed</h2>
            <p className="text-xl text-neutral-400 mb-8">All steps have been executed and documented.</p>
            <button
                onClick={() => setPhase('STEPS')}
                className="p-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-lg font-bold inline-flex items-center space-x-2 border border-neutral-700 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Back to Steps</span>
            </button>
         </div>
      )}
    </div>
  );
}
