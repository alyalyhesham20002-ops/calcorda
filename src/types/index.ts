import { LucideIcon } from 'lucide-react';

export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  categoryKey: 'header_health' | 'header_pregnancy' | 'header_tools';
  icon: LucideIcon;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'date' | 'text';
  placeholder?: string;
  options?: { value: string; label: string }[];
  unit?: string;
  required?: boolean;
  min?: number;
  max?: number;
}

export interface CalculatorResult {
  label: string;
  value: string | number;
  unit?: string;
  category?: string;
  interpretation?: string;
}
