import { 
  Heart, 
  Activity, 
  Zap, 
  Target, 
  Scale, 
  Droplets, 
  User, 
  Moon,
  Baby,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Calculator,
  Lock,
  Hash,
  Type,
  FileText,
  AlignLeft,
  Gauge,
  Coins
} from 'lucide-react';
import { Calculator } from '../types';

export const calculators: Omit<Calculator, 'name' | 'description' | 'category'>[] = [
  // Health & Fitness
  { id: 'bmi', icon: Scale, categoryKey: 'header_health' },
  { id: 'calories', icon: Target, categoryKey: 'header_health' },
  { id: 'bmr', icon: Zap, categoryKey: 'header_health' },
  { id: 'body-fat', icon: Activity, categoryKey: 'header_health' },
  { id: 'macro', icon: Target, categoryKey: 'header_health' },
  { id: 'water-intake', icon: Droplets, categoryKey: 'header_health' },
  { id: 'ideal-weight', icon: User, categoryKey: 'header_health' },
  { id: 'heart-rate', icon: Heart, categoryKey: 'header_health' },
  { id: 'blood-pressure', icon: Gauge, categoryKey: 'header_health' },
  { id: 'sleep', icon: Moon, categoryKey: 'header_health' },

  // Pregnancy & Family
  { id: 'pregnancy', icon: Baby, categoryKey: 'header_pregnancy' },
  { id: 'due-date', icon: Calendar, categoryKey: 'header_pregnancy' },
  { id: 'ovulation', icon: Activity, categoryKey: 'header_pregnancy' },
  { id: 'menstrual-cycle', icon: Calendar, categoryKey: 'header_pregnancy' },
  { id: 'baby-growth', icon: TrendingUp, categoryKey: 'header_pregnancy' },
  { id: 'age', icon: Clock, categoryKey: 'header_pregnancy' },
  { id: 'date-difference', icon: Calendar, categoryKey: 'header_pregnancy' },
  { id: 'baby-name-generator', icon: Users, categoryKey: 'header_pregnancy' },

  // General Tools
  { id: 'currency-converter', icon: Coins, categoryKey: 'header_tools' },
  { id: 'password-generator', icon: Lock, categoryKey: 'header_tools' },
  { id: 'random-number', icon: Hash, categoryKey: 'header_tools' },
  { id: 'text-case-converter', icon: Type, categoryKey: 'header_tools' },
  { id: 'word-counter', icon: FileText, categoryKey: 'header_tools' },
  { id: 'character-counter', icon: AlignLeft, categoryKey: 'header_tools' }
];
