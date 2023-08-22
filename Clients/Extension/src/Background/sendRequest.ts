export default function sendRequest(url: string, maxRetry = 2, delay = 5000) {
    // if (navigator.onLine) {
        let retryCount = 0;
        async function GetDataServer(url: string) {
            try {
                return (await fetch(url)).json()
            } catch (error) {
                throw error;
                // throw new Error('Request failed');
                // return { status: 500, message: "Request failed" };
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
            } else {
                throw new Error('Max retries exceeded');
                // return { status: 500, message: "Max retries exceeded" }
            }
        }
        return GetDataServer(url)
            .catch(retry);
    // } else {
    //     return { status: 12163, message: "The Internet connection has been lost." };
    // }
}