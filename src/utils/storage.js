export const saveIdentification = (imageUrl, result) => {
    try {
        const savedResults = JSON.parse(localStorage.getItem('plantIdentifications')) || [];
        const newResult = {
            id: Date.now(),
            imageUrl,
            result,
            timestamp: new Date().toISOString()
        };
        savedResults.push(newResult);
        localStorage.setItem('plantIdentifications', JSON.stringify(savedResults));
    } catch (error) {
        console.error('Error saving identification:', error);
    }
};