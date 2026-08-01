'use client';
import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import { HardHat, Cpu, WifiOff, Wifi } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { aiMode, toggleMode, isOnline } = useAppStore();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-yellow-500/30">
      <header className="bg-neutral-900 border-b border-neutral-800 p-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HardHat className="w-10 h-10 text-yellow-500" />
            <h1 className="text-3xl font-black tracking-tight">SiteFlow</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm font-medium text-neutral-400">
              {isOnline ? <Wifi className="w-5 h-5 text-green-500" /> : <WifiOff className="w-5 h-5 text-red-500" />}
            </div>
            <button
              onClick={toggleMode}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                aiMode === 'EDGE_AI' 
                  ? 'bg-yellow-500 text-neutral-950 shadow-[0_0_15px_rgba(234,179,8,0.5)]' 
                  : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
              }`}
            >
              <Cpu className="w-6 h-6" />
              <span>{aiMode === 'EDGE_AI' ? 'Edge AI' : 'Standard'}</span>
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 pb-32">
        {children}
      </main>
    </div>
  );
}
