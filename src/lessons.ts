import { Lesson } from './types';
import Lesson1 from './lessons/Lesson1';
import Lesson2 from './lessons/Lesson2';
import Lesson3 from './lessons/Lesson3';

export const lessons: Lesson[] = [
  {
    id: 'solidity-101',
    title: 'Solidity 101: Your First Contract',
    description: "Learn the absolute basics of Solidity syntax and write a simple 'Hello World' smart contract.",
    difficulty: 'Beginner',
    component: Lesson1,
  },
  {
    id: 'understanding-variables-and-types',
    title: 'Understanding Variables & Types',
    description: 'Dive into value types, reference types, and data locations like storage, memory, and calldata.',
    difficulty: 'Beginner',
    component: Lesson2,
  },
  {
    id: 'understanding-functions',
    title: 'Understanding Functions',
    description: 'Learn the basics of functions in Solidity.',
    difficulty: 'Beginner',
    component: Lesson3,
  },
];
