import { Lesson } from './types';
import HelloWorld from './lessons/HelloWorld';
import VariablesTypes from './lessons/VariablesTypes';
import IntegersAndUnsignedIntegers from './lessons/IntegersAndUnsignedIntegers';
import UnderstandingFunctions from './lessons/UnderstandingFunctions';
import StateAndLocalVariables from './lessons/StateAndLocalVariables';
import GlobalVariables from './lessons/GlobalVariables';

export const lessons: Lesson[] = [
  {
    id: 'solidity-101',
    title: 'Solidity 101: Your First Contract',
    description: "Learn the absolute basics of Solidity syntax and write a simple 'Hello World' smart contract.",
    difficulty: 'Beginner',
    component: HelloWorld,
  },
  {
    id: 'understanding-variables-and-types',
    title: 'Understanding Variables & Types',
    description: 'Dive into value types, reference types, and data locations like storage, memory, and calldata.',
    difficulty: 'Beginner',
    component: VariablesTypes,
  },
  {
    id: 'integers-and-unsigned-integers',
    title: 'Integers and Unsigned Integer Values',
    description: 'Understand the difference between signed and unsigned integers, their sizes, and conversion.',
    difficulty: 'Beginner',
    component: IntegersAndUnsignedIntegers,
  },
  {
    id: 'understanding-functions',
    title: 'Understanding Functions',
    description: 'Learn the basics of functions in Solidity.',
    difficulty: 'Beginner',
    component: UnderstandingFunctions,
  },
  {
    id: 'state-and-local-variables',
    title: 'State and Local Variables',
    description: 'Understand the difference between state and local variables.',
    difficulty: 'Beginner',
    component: StateAndLocalVariables,
  },
  {
    id: 'global-variables',
    title: 'Global Variables',
    description: 'Explore built-in global variables like msg.sender, msg.value, and block.timestamp.',
    difficulty: 'Beginner',
    component: GlobalVariables,
  },
];
