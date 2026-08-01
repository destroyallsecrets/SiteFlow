'use client';
import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

export default function Mermaid({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    
    const renderChart = async () => {
      if (containerRef.current) {
        try {
          const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).substring(2)}`, chart);
          setSvgContent(svg);
        } catch (e) {
          console.error("Mermaid error:", e);
        }
      }
    };
    
    renderChart();
  }, [chart]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: svgContent }} className="flex justify-center" />;
}
