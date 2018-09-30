#!/usr/bin/env node --experimental-modules

import pkg from "../../../package"
import selfpkg from "../package"
import { Development } from "air-m2-builder"
import path from "path"
import webpack from "webpack"
import webpackConfig from "../webpack.config.js"

const units = [];

let m2units = selfpkg.m2units || {};
units.push(...Object.keys(m2units).map( key => ({ name: key, npm: m2units[key] }) ));

webpack( webpackConfig ).run(function (err) {
    if(err) throw err;
    new Development({
        units,
        dirname: path.resolve(),
        port: 9000,
        content: { dir: `${path.resolve()}/node_modules/air-application/dist/` },
        m2units: { dir: "m2units/", },
        name: pkg.name,
        mode: "development",
    }).run();
});