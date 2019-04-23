#!/usr/bin/env node --experimental-modules

import pkg from "../../../package"
import selfpkg from "../package"
import { Development } from "air-m2-builder"
import fs from "fs"
import path from "path"
import webpack from "webpack"
import webpackConfig from "../webpack.config.js"

const units = [];

const pth = path.resolve("./node_modules/application/m2units.json");

if (fs.existsSync(pth)) {
    let m2units = JSON.parse(fs.readFileSync(pth, "utf8"));
    units.push(...Object.keys(m2units).map( key => ({ name: key, npm: m2units[key] }) ));
}

let conf = {};
const pthConf = path.resolve("./air-m2.config.json");
if (fs.existsSync(pthConf)) {
    conf = JSON.parse(fs.readFileSync(pthConf, "utf8"));
}
conf.port = conf.port || 9000;

let m2units = selfpkg.m2units || {};
units.push(...Object.keys(m2units).map( key => ({ name: key, npm: m2units[key] }) ));

webpack( webpackConfig ).run(function (err) {
    if(err) throw err;
    new Development({
        units,
        dirname: path.resolve(),
        port: conf.port,
        content: { dir: `${path.resolve()}/node_modules/application/dist/` },
        m2units: { dir: "m2units/", },
        name: pkg.name,
        mode: "development",
    }).run();
});