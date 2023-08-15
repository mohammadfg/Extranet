type inputPage = "main" | "status" | "languages";
export default function sendRequest(inputPage: inputPage, path = "", maxRetry = 2, delay = 5000) {
    let url = "http://127.0.0.1:5500/Server/", retryCount = 0, pages = {
        main: url + "contorols-v2.json",
        status: url + "status.json",
        languages: url + "languages" + path + ".json"
    };
    async function GetDataServer(inputPage: inputPage) {
        try {
            return (await fetch(pages[inputPage])).json()
        } catch (error) {
            throw new Error('Request failed');
        }
    }
    function retry() {
        retryCount++;
        if (retryCount < maxRetry) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    GetDataServer(inputPage)
                        .then(resolve)
                        .catch(reject);
                }, delay);
            });
        } else {
            throw new Error('Max retries exceeded');
        }
    }
    return GetDataServer(inputPage)
        .catch(retry);
}