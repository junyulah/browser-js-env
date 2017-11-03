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
    let browserProc;

    try {
        await buildTestProject(jsCode, testDir, options);
        // build test project first
        const {start, setReceiveHandler} = Server(testDir, options);
        const {address} = await start(options.port = 0);

        // run test server and get data
        const data: any = await new Promise(async (resolve, reject) => {
            setReceiveHandler(resolve);

            // visit index html
            try {
               browserProc = await env(`http://127.0.0.1:${address.port}/index.html`, options);
            } catch (err) {
                reject(err);
            }
        });

        if (options.clean) {
            // clean test project
            await clear(testDir, browserProc);
        }

        if (data.type === "error") {
            throw new Error(data.errorMsg);
        } else {
            return data.result;
        }
    } catch (err) {
        // clean test project
        await clear(testDir, browserProc);
        throw err;
    }
};

const clear = async (testDir: string, browserProc) => {
    // clean test project
    await del([testDir], {
        force: true
    });

    if (browserProc && typeof browserProc.kill === "function") {
        browserProc.kill();
    }
};
