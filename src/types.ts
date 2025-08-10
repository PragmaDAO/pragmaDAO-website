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

export interface LessonRowProps {
    index: number;
    title: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
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