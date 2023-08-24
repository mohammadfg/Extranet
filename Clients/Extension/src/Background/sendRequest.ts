export default function sendRequest(url: string, maxRetry = 2, delay = 5000) {
    let retryCount = 0;
    async function GetDataServer(url: string) {
        try {
            return (await fetch(url)).json()
        } catch (error) {
            throw error;
        }
    }
    function retry() {
        retryCount++;
        if (retryCount < maxRetry) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    GetDataServer(url)
                        .then(resolve)
                        .catch(reject);
                }, delay);
            });
        }
    }
    return GetDataServer(url)
        .catch(retry);
}