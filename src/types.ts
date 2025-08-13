import { FC } from 'react';

// --- TYPE DEFINITIONS ---
export interface FeatureCardProps {
    title: string;
    description: string;
}

export interface StepCardProps {
    stepNumber: number;
    title: string;
    description: string;
}

export interface NavLinkProps {
    children: React.ReactNode;
    onClick: () => void;
}

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Lesson {
    id: string;
    title: string;
    description: string;
    difficulty: Difficulty;
    component: FC<{ setCurrentPage: (page: string) => void; }>;
}

export interface LessonRowProps {
    index: number;
    title: string;
    description: string;
    difficulty: Difficulty;
    onClick: () => void;
}

export interface CommunityCardProps {
    title: string;
    description: string;
    date?: string;
    imageUrl?: string;
    linkUrl?: string;
}

export interface TestCase {
    description: string;
    passed: boolean;
    errorMessage?: string;
}

export interface AbiItem {
    inputs: { internalType: string; name: string; type: string }[];
    name: string;
    outputs: { internalType: string; name: string; type: string }[];
    stateMutability: string;
    type: string;
}

export interface CompiledContract {
    abi: AbiItem[];
    evm: {
        bytecode: {
            object: string;
        };
    };
}

export interface CompiledOutput {
    contracts: {
        'contract.sol': {
            [contractName: string]: CompiledContract;
        };
    };
    errors?: { severity: string; formattedMessage: string }[];
}

export interface Instruction {
    text: string;
    hint?: string;
}
