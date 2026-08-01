'use client';
import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import JobCard from '@/components/JobCard';
import { localSOPs } from '@/lib/localSOPs';
import { useAppStore } from '@/store/useAppStore';
import { useEdgeAI } from '@/hooks/useEdgeAI';
import { Camera, Save, ArrowLeft, Loader2 } from 'lucide-react';
import { db } from '@/lib/db';

export default function App() {
  const { aiMode, setOnlineStatus } = useAppStore();
  const { status: aiStatus, loadModel, generateFromImage, progress } = useEdgeAI();
  
  const [activeJob, setActiveJob] = useState<any | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [setOnlineStatus]);

  useEffect(() => {
    if (aiMode === 'EDGE_AI' && aiStatus === 'idle') {
      loadModel();
    }
  }, [aiMode, aiStatus, loadModel]);

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);

    if (aiMode === 'EDGE_AI') {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          try {
            const result = await generateFromImage(base64data);
            const caption = result?.[0]?.generated_text || "Image analyzed.";
            setActiveJob({
              title: 'AI Analysis Result',
              materials: ['AI Inferred based on Image'],
              steps: [
                `Observation: ${caption}`,
                'Verify condition safely',
                'Proceed with standard safety protocols'
              ],
              mermaidChart: `graph TD\nA[Capture] --> B[AI Analysis]\nB --> C["${caption}"]`
            });
          } catch (err) {
            console.error("AI Generation error", err);
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.error("AI Generation error", err);
      }
    } else {
      if (!activeJob) {
        setActiveJob({
          title: 'Custom Job',
          materials: ['Site photo captured'],
          steps: ['Review site conditions', 'Perform required tasks', 'Document completion'],
          mermaidChart: ''
        });
      }
    }
  };

  const saveJob = async () => {
    if (activeJob) {
      await db.jobs.add({
        title: activeJob.title,
        date: new Date().toISOString(),
        imageBlob: photoFile || undefined,
        materialList: activeJob.materials,
        steps: activeJob.steps,
        mermaidChart: activeJob.mermaidChart
      });
      alert('Job saved offline successfully!');
      setActiveJob(null);
      setPhotoPreview(null);
      setPhotoFile(null);
    }
  };

  return (
    <Layout>
      {!activeJob && (
        <div className="space-y-8 mt-8">
          <div className="text-center space-y-4">
             <h2 className="text-4xl font-black text-white">Select a Procedure</h2>
             <p className="text-xl text-neutral-400">Or use the camera to start a new job</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localSOPs.map((sop, idx) => (
              <button
                key={idx}
                onClick={() => setActiveJob(sop)}
                className="p-6 bg-neutral-900 border-2 border-neutral-800 rounded-2xl text-left hover:border-yellow-500 transition-colors group"
              >
                <h3 className="text-2xl font-bold text-white group-hover:text-yellow-500">{sop.title}</h3>
                <p className="text-neutral-500 mt-2 text-lg">{sop.steps.length} Steps • {sop.materials.length} Materials</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeJob && (
        <div className="space-y-6">
          <button 
            onClick={() => {
                setActiveJob(null);
                setPhotoPreview(null);
                setPhotoFile(null);
            }}
            className="flex items-center text-yellow-500 font-bold text-xl p-4 -ml-4"
          >
            <ArrowLeft className="w-8 h-8 mr-2" />
            Back to SOPs
          </button>
          
          {photoPreview && (
            <div className="rounded-xl overflow-hidden border border-neutral-800 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoPreview} alt="Captured job site" className="w-full h-auto object-cover max-h-[400px]" />
            </div>
          )}

          <JobCard {...activeJob} />
          
          <button
            onClick={saveJob}
            className="w-full p-6 bg-neutral-800 hover:bg-neutral-700 text-white rounded-2xl text-2xl font-bold flex items-center justify-center space-x-4 border border-neutral-700 transition-colors"
          >
            <Save className="w-8 h-8" />
            <span>Save Job Offline</span>
          </button>
        </div>
      )}

      {/* Massive Camera Button Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-neutral-950 border-t border-neutral-900 z-50">
        <div className="max-w-4xl mx-auto">
          {aiMode === 'EDGE_AI' && aiStatus === 'loading' ? (
            <div className="w-full p-6 bg-neutral-800 text-neutral-400 rounded-2xl text-2xl font-bold flex items-center justify-center space-x-4">
               <Loader2 className="w-8 h-8 animate-spin" />
               <span>Loading AI Model...</span>
            </div>
          ) : aiMode === 'EDGE_AI' && aiStatus === 'generating' ? (
            <div className="w-full p-6 bg-yellow-500 text-neutral-950 rounded-2xl text-2xl font-bold flex items-center justify-center space-x-4">
               <Loader2 className="w-8 h-8 animate-spin" />
               <span>Analyzing Job Site...</span>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-6 bg-yellow-500 hover:bg-yellow-400 text-neutral-950 rounded-2xl text-2xl font-bold flex items-center justify-center space-x-4 shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-colors"
            >
              <Camera className="w-10 h-10" />
              <span>{aiMode === 'EDGE_AI' ? 'Analyze with AI' : 'Capture Site Photo'}</span>
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            className="hidden"
            onChange={handleCapture}
          />
        </div>
      </div>
    </Layout>
  );
}
