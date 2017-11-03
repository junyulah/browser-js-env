import path = require("path");
import Server = require("./server");
import env  = require("./env");
import del = require("del");
import uuidv4 = require("uuid/v4");
import buildTestProject = require("./buildTestProject");

/**
 * sometimes, we just want to run some js code in browsers and get results
 */

/**
 * options = {
 *   testDir,
 *   keep
 * }
 */
export = async (jsCode: string, options: any = {}) => {
    const testDir = path.resolve(options.testDir || ("__test_in_browser_env__" + uuidv4()));
    let browser;

    try {
        await buildTestProject(jsCode, testDir, options);
        // build test project first
        const {start, receiveData} = Server(testDir, options);
        const {address} = await start(options.port = 0);

        const ret = await Promise.all([
            receiveData(),
            env(`http://127.0.0.1:${address.port}/index.html`, options)
        ]);

        const data: any = ret[0];
        browser = ret[1];

        if (data.type === "error") {
            throw new Error(data.errorMsg);
        }

        if (options.clean) {
            // clean test project
            await clear(testDir, browser);
        }

        return data.result;
    } catch (err) {
        if (options.clean) {
            // clean test project
            await clear(testDir, browser);
        }
        throw err;
    }
};

const clear = async (testDir: string, browser) => {
    // clean test project
    await del([testDir], {
        force: true
    });

    if (browser && typeof browser.kill === "function") {
        await browser.kill();
    }
};
