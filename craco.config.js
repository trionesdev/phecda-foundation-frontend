const CracoLessPlugin = require('craco-less');

const path = require('path');
const fs = require('fs');
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                // modifyLessRule: function (lessRule, _context) {
                //     lessRule.test = /\.(module)\.(less)$/;
                //     lessRule.exclude = /node_modules/;
                //     return lessRule;
                // },
                // cssLoaderOptions: {
                //     modules: {
                //         localIdentName: '[name]__[local]--[hash:base64:5]'
                //     }
                // },
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            'layout-header-background': '#333',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
    webpack: {
        alias: {
            '@': resolve('src'),
            '@apis': resolve('src/apis'),
            '@views': resolve('src/views'),
            '@components': resolve('src/components'),
        },
    },
    devServer: {
        historyApiFallback: true,
        // noInfo: false,
        // port:3100,
        proxy: {
            '/api/*': {
                // target: 'http://localhost:8080/',
                // target: 'http://192.168.10.202:82/', //测试站ip
                target: 'http://192.168.10.73:8080/', //戎宇ip
                // target: 'http://192.168.10.150:8080/', //陈涛ip
                // target: "http://dubhe-gateway.moensun.cn/",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    babel: {
        plugins: [],
    },
};
