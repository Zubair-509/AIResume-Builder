'use client';

import { useEffect, useRef } from 'react';
import { ResumeFormData } from '@/lib/validations';

interface AutoSaveManagerProps {
  data: ResumeFormData;
  onSave: (data: ResumeFormData) => Promise<void>;
  enabled: boolean;
  interval?: number; // in milliseconds
}

export function AutoSaveManager({ 
  data, 
  onSave, 
  enabled, 
  interval = 30000 // 30 seconds default
}: AutoSaveManagerProps) {
  const lastSaveRef = useRef<string>('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!enabled) return;

    const currentDataString = JSON.stringify(data);
    
    // Only save if data has actually changed
    if (currentDataString === lastSaveRef.current) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(async () => {
      try {
        await onSave(data);
        lastSaveRef.current = currentDataString;
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, enabled, interval]);

  // Save immediately when component unmounts
  useEffect(() => {
    return () => {
      if (enabled && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        onSave(data).catch(console.error);
      }
    };
  }, [data, onSave, enabled]);

  return null; // This component doesn't render anything
}