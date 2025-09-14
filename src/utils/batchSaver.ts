// Global batch saver for code persistence
// Processes queued saves periodically to minimize database calls

let batchSaveTimer: NodeJS.Timeout | null = null;

export const processBatchSaveQueue = async () => {
    const queueString = localStorage.getItem('batchSaveQueue');
    if (!queueString) return;

    const queue = JSON.parse(queueString);
    if (queue.length === 0) return;

    try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3003';

        // Get user token from localStorage or context
        const tokenString = localStorage.getItem('auth');
        if (!tokenString) {
            console.log('No auth token found, skipping batch save');
            return;
        }

        const authData = JSON.parse(tokenString);
        const token = authData.token;

        if (!token) {
            console.log('No token in auth data, skipping batch save');
            return;
        }

        console.log(`Processing batch save for ${queue.length} lessons...`);

        const response = await fetch(`${backendUrl}/api/code/batch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ saves: queue })
        });

        if (response.ok) {
            // Clear the queue on successful save
            localStorage.removeItem('batchSaveQueue');
            console.log(`Successfully batch saved ${queue.length} lessons`);
        } else {
            console.error('Failed to batch save:', response.statusText);
        }
    } catch (error) {
        console.error('Error in batch save:', error);
    }
};

// Start periodic batch processing
export const startBatchSaveProcessor = () => {
    if (batchSaveTimer) return; // Already started

    batchSaveTimer = setInterval(async () => {
        await processBatchSaveQueue();
    }, 30000); // Process every 30 seconds

    console.log('Batch save processor started');
};

// Stop batch processing (cleanup)
export const stopBatchSaveProcessor = () => {
    if (batchSaveTimer) {
        clearInterval(batchSaveTimer);
        batchSaveTimer = null;
        console.log('Batch save processor stopped');
    }
};

// Force immediate batch save (call on app close/visibility change)
export const forceBatchSave = async () => {
    await processBatchSaveQueue();
};

// Auto-start when module loads
if (typeof window !== 'undefined') {
    startBatchSaveProcessor();

    // Save on page visibility change (user switching tabs/closing)
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            forceBatchSave();
        }
    });

    // Save on page unload
    window.addEventListener('beforeunload', () => {
        forceBatchSave();
    });
}