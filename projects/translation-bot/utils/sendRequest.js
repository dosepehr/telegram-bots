export const sendRequest = async ({ source, engine, target, text }) => {
    try {
        const response = await fetch(
            `https://api.one-api.ir/translate/v1/${engine}`,
            {
                method: 'POST',
                headers: {
                    'one-api-token': '389961:662145f292988',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source,
                    target: target.slice(0, 2),
                    text,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};
