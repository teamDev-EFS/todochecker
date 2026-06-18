import type { Task } from '../types/task';

const now = Date.now();
const hours = (n: number) => new Date(now - n * 3600_000).toISOString();
const days = (n: number) => new Date(now - n * 86400_000).toISOString();

export const seedTasks: Task[] = [
  {
    id: 't_01',
    title: 'Review Q1 roadmap draft with Sarah Mitchell',
    completed: false,
    createdAt: hours(2),
    completedAt: null,
    priority: 'high',
  },
  {
    id: 't_02',
    title: 'Ship auth refactor PR — split session middleware',
    completed: false,
    createdAt: hours(5),
    completedAt: null,
    priority: 'high',
  },
  {
    id: 't_03',
    title: 'Reply to onboarding feedback from Acme Logistics',
    completed: false,
    createdAt: hours(8),
    completedAt: null,
    priority: 'medium',
  },
  {
    id: 't_04',
    title: 'Draft the v2 pricing page copy',
    completed: false,
    createdAt: days(1),
    completedAt: null,
    priority: 'medium',
  },
  {
    id: 't_05',
    title: 'Book offsite venue for engineering retreat',
    completed: false,
    createdAt: days(1),
    completedAt: null,
    priority: 'low',
  },
  {
    id: 't_06',
    title: 'Migrate analytics events to the new schema',
    completed: true,
    createdAt: days(2),
    completedAt: days(1),
    priority: 'medium',
  },
  {
    id: 't_07',
    title: 'Set up weekly 1:1 with Daniel Park',
    completed: true,
    createdAt: days(3),
    completedAt: days(2),
    priority: 'low',
  },
  {
    id: 't_08',
    title: 'Audit unused feature flags in production',
    completed: true,
    createdAt: days(4),
    completedAt: days(3),
    priority: 'medium',
  },
];
