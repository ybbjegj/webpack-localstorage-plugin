'use strict';

const webpack = require('webpack'),
    path = require('path');
const WebpackChunkHash = require('webpack-chunk-hash');
// const WebpackManifestPlugin=require('webpack-manifest-plugin');
const LocalStoragePlugin=require('../lib/LocalStoragePlugin');
const ROOTPATH=process.cwd();
let config={
    DISTPATH:path.join(ROOTPATH,'dist'),
    entry:{
        app:path.join(ROOTPATH,'js/app/index.js')
    }
};

let _config = {
    entry: {
        app:config.entry.app
    },
    context: path.join(ROOTPATH,'js'),
    output: {
        path: config.DISTPATH,
        publicPath: '../dist',
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    watch:true,
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module, count) => {
                console.log('module contenxt ', module.context);
                return module.context && module.context.indexOf('vendor') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks:['vendor'],
            filename: 'js/manifest.js'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new WebpackChunkHash(),
        // new WebpackManifestPlugin({
        //     fileName:'manifest.json'
        // }),
        // new chunkManifestPlugin(config.chunkManifestConfig.app),
        new LocalStoragePlugin({
            ignoreChunks:['manifest'],
            manifestName:'localcacheManifest.js',
            manifestFormat:'js',
            manifestVariableName:'webpackLocalcacheManifest'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     mangleProperties:{
        //         reserved:['webpack_local_cache']
        //     }
        // }),
    ],
    module: {
        rules: [
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude:/(node_modules)/,
            //     use:{
            //         loader:'babel-loader',
            //         options:{
            //             presets:['es2015','react']
            //         }
            //     }
            // }
        ]
    }
};
_config.devtool = 'inline-source-map';
module.exports = _config;
