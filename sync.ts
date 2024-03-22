import { getScriptPaths } from "./lib/windmill.ts";
import { Cron } from "croner"
async function sync () {
    const paths = getScriptPaths();
}

async function main () {
    const job = Cron('*/10 * * * * *', async () => {
        await sync()
    });
}

main()