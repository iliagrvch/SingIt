const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        background: path.resolve('src/background/background.tsx'),
        contentScript: path.resolve('src/contentScripts/contentScript.tsx')
    },
    module:{
        rules:[
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader','css-loader'],
                test: /\.css$/i,
            },
            {
                type:'asset/resource',
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/
            }
            ]
        
    },
    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets:false}),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist')
                }
            ]

        }),
        
    ...getHtmlPlugins([
        'popup'
    ])
    ],
    resolve:{
        extensions: ['.tsx','.ts','.js']
    },
    output:{
        filename: '[name].js',
        path: path.resolve('dist')
    },
    optimization: {
        splitChunks:{
            chunks(chunk) {
                return chunk.name !== 'contentScript';
            }
        }
    }
};


function getHtmlPlugins(chunks){
return chunks.map(chunk=> new HtmlPlugin({
    title: 'Final Project Extenion',
    filename: `${chunk}.html`,
    chunks: [chunk]
}));
}
