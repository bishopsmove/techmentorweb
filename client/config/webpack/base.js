const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VendorChunkPlugin = require("webpack-vendor-chunk-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const config = require("../../../config");

const rootPath = path.join(__dirname, "../../../");
const sourcePath = path.join(__dirname, "../../src");

const createFilePath = (directoryName, fileExtension) => {    
    let path = directoryName + "/[name]." + fileExtension;
    
    if (!config.selfHost) {
        path += "?hash=[chunkhash]";
    }

    return path;
}

const extractSass = new ExtractTextPlugin({
    filename: createFilePath("content", "css")
});

let plugins = [
    new webpack.DefinePlugin(
    { 
        "webpackDefine": {
            "environment": JSON.stringify(config.environment),
            "configuration": JSON.stringify(config.configuration),
            "apiUri": JSON.stringify(config.apiUri),
            "audience": JSON.stringify(config.authAudience),
            "authDomain": JSON.stringify(config.authDomain),
            "authorizeUri": JSON.stringify(config.authAuthorizeUri),
            "clientId": JSON.stringify(config.authClientId),
            "responseType": JSON.stringify(config.authResponseType),
            "scope": JSON.stringify(config.authScope),
            "sentryUri": JSON.stringify(config.clientSentryUri)
        } 
    }),

    // Extract all 3rd party modules into a separate 'vendor' chunk
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor", 
        minChunks: ({ resource }) => /node_modules/.test(resource)
    }),
    
    // Generate a 'manifest' chunk to be inlined in the HTML template
    new webpack.optimize.CommonsChunkPlugin('manifest'),

    // Need this plugin for deterministic hashing
    // until this issue is resolved: https://github.com/webpack/webpack/issues/1315
    // for more info: https://webpack.js.org/how-to/cache/
    new WebpackMd5Hash(),

    new HtmlWebpackPlugin({
        hash: false,
        filename: "index.html",
        template: path.join(sourcePath, "/index.html"),
    }),
    // new ScriptExtHtmlWebpackPlugin({
    //     defaultAttribute: "defer"
    //   }),
    extractSass
];

if (config.configuration === "release") {
    const namedModules = new webpack.NamedModulesPlugin();
    const namedChunks = new webpack.NamedChunksPlugin((chunk) => {
        if (chunk.name) {
            return chunk.name;
        }

        let n = [];
        
        chunk.forEachModule(m => n.push(path.relative(m.context, m.request)))
        
        return n.join("_");
    });

    plugins.unshift(namedChunks);   // This will end up in index 1 after the next line
    plugins.unshift(namedModules);  // This will be the first entry

    let uglify = new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    });

    plugins.push(uglify);
}

module.exports = {
    name: "client",
    target: "web",
    entry: {
        app: [path.join(sourcePath, "/index.ts")]
    },
    output: {
        path: path.join(rootPath, "/dist"),
        publicPath: "/",
        filename: createFilePath("scripts", "js"),
        chunkFilename: createFilePath("scripts", "js")
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".vue", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                loader: "ts-loader",
                options: {
                    configFile: path.join(rootPath, "tsconfig.json"),
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    esModule: true
                }
            },
            {
                test: /\.scss$/,
                loader: extractSass.extract({
                    use: 
                    [
                        {
                            loader: "css-loader"
                        }, 
                        {
                            loader: "sass-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: "images/[name].[ext]?[hash:7]"
                }
            }
        ]
    },
    plugins: plugins
};