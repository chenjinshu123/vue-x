const path = require('path')
const  htmlwebpackplugin = require('html-webpack-plugin')//在内存中根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports={
    entry:path.join(__dirname,'./src/main.js'), //输入文件的路径
    output:{
        path:path.join(__dirname,'./dist'), //输出文件的路径
        filename:'bundle.js' //输出文件的名称
    },
   mode:'development',
   plugins:[//所有webpack 插件的配置节点
       new htmlwebpackplugin({
           template:path.join(__dirname,'./src/index.html'),//指定的模板页面
           filename:'index.html' //设置生成的内存页面的名称
       }),
       new VueLoaderPlugin()
   ],
   module:{ //配置所有第三方loader模块
      rules:[ //第三方模块的匹配规则
        {test:/\.css$/,use: ['style-loader','css-loader']}, //处理CSS文件的loader
        {test:/\.less$/,use: ['style-loader','css-loader','less-loader']},//处理less文件的loader
        {test:/\.scss$/,use: ['style-loader','css-loader','sass-loader']},//处理sass文件的loader
        {test:/\.(jpg|png|gif|bmp|jpeg|ttf|eot|svg|woff|woff2)$/,use: 'url-loader'},//处理图片的loader
        {test:/\.js$/,use:'babel-loader',exclude:/node_moduels/},
        {test:/\.vue$/,use:'vue-loader'}
      ]
   }
}