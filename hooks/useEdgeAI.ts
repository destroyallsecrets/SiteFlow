'use client';
import { useState, useEffect, useRef } from 'react';
import { MLP, trainNetwork, extractImageFeatures } from '@/lib/CustomAI';

type AIStatus = 'idle' | 'loading' | 'ready' | 'generating' | 'error';

export function useEdgeAI() {
  const [status, setStatus] = useState<AIStatus>('idle');
  const [progress, setProgress] = useState<any>(null);
  const nnRef = useRef<MLP | null>(null);

  useEffect(() => {
    // Optionally train on mount
  }, []);

  const loadModel = () => {
    setStatus('loading');
    setTimeout(() => {
      try {
        const nn = new MLP(4, 8, 3);
        trainNetwork(nn, 1000); // Train the from-scratch network
        nnRef.current = nn;
        setStatus('ready');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    }, 500);
  };

  const generateFromImage = async (imageBlobUrl: string) => {
    return new Promise<any>(async (resolve, reject) => {
      if (!nnRef.current) return reject("Model not loaded");
      setStatus('generating');
      try {
        const features = await extractImageFeatures(imageBlobUrl);
        const predictions = nnRef.current.predict(features);
        
        // Find highest confidence
        let maxIdx = 0;
        let maxVal = predictions[0];
        for (let i = 1; i < predictions.length; i++) {
          if (predictions[i] > maxVal) {
            maxVal = predictions[i];
            maxIdx = i;
          }
        }
        
        let label = "Unknown";
        if (maxIdx === 0) label = "200A Temp Pole Installation";
        else if (maxIdx === 1) label = "100A Subpanel Addition";
        else if (maxIdx === 2) label = "3-Way Switch Circuit Wiring";
        
        setStatus('ready');
        resolve([{ generated_text: label }]);
      } catch (error) {
        setStatus('error');
        reject(error);
      }
    });
  };

  return { status, progress, loadModel, generateFromImage };
}
