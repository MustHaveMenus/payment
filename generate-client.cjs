const {execSync} = require("child_process");
const fs = require("fs");
const http = require('http');

const url = "http://localhost:8081/v3/api-docs/";
const file = "./api.json";

async function downloadFile(url, targetFile) {
    return await new Promise((resolve, reject) => {
        http.get(url, response => {
            const code = response.statusCode ?? 0
            if (code >= 400) return reject(new Error(response.statusMessage));
            if (code > 300 && code < 400 && !!response.headers.location) return downloadFile(response.headers.location, targetFile);
            const fileWriter = fs
                .createWriteStream(targetFile)
                .on('finish', () => resolve({}))

            response.pipe(fileWriter)
        }).on('error', reject);
    });
}

(async function start() {
    try {
        await downloadFile(url, file);
        console.info("=> fetched api doc");
        execSync("npm run apigen");
        console.info("=> generated");
        fs.unlinkSync(file);
        console.info("=> done");
    } catch (e) {
        console.error(e);
    }
})();
