/*
 * @Author: 张思勉
 * @Date: 2023-04-01 22:18:37
 * @LastEditTime: 2023-04-24 22:17:36
 * @LastEditors: 张思勉
 * @Description:
 * @FilePath: \webpack-code\config\webpack.prod.js
 */
const path = require("path"); //nodejs核心模块,专门用来处理路径问题
// const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //入口
  entry: "./src/main.js", //相对路径
  //输出
  output: {
    //文件的输出路径
    //__dirname是nodejs的变量，代表当前文件的文件夹目录
    path: path.resolve(__dirname, "../dist"), //绝对路径
    //文件的输出名称
    filename: "js/main.js",
    //自动清空上次打包的内容
    //原理，在打包前，将path整个目录内容清空，再进行打包
    clean: true,
  },
  //加载器
  module: {
    rules: [
      //loader的配置
      {
        test: /\.css$/,
        //use执行顺序：从右至左(从下到上)
        use: [
          // "style-loader", //将js中css通过创建style标签添加到html文件中生效
          MiniCssExtractPlugin.loader, //提取css成单独的文件
          "css-loader", //将css资源编译成commonjs的模块到js中
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: ["postcss-preset-env"], //能解决大多数css兼容性问题
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: ["postcss-preset-env"],
          //     },
          //   },
          // },
          "sass-loader", //将sass编译成css文件
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            //小于100kb的图片会转成base64
            maxSize: 1024 * 100,
          },
        },
        generator: {
          //输出图片名称
          //[hsah:10] hash取前10位
          filename: "images/[hash:10][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?)$/,
        //不转base64格式
        type: "asset/resource",
        generator: {
          filename: "font/[hash][ext]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, //排除node_modules中的js文件(这些js不处理)
        loader: "babel-loader",
        // options: {
        //   //智能预设，能够编译ES6语法
        //   presets: ["@babel/preset-env"],
        // },
      },
    ],
  },
  //插件
  plugins: [
    //plugin的配置
    // new ESLintPlugin({
    //   //eslint需要检测哪些文件
    //   context: path.resolve(_dirname, "src"),
    // }),
    new HtmlWebpackPlugin({
      //模板：以public/index.html文件创建新的html文件
      //新的html文件特点：1.结构和原来一致 2.自动引入打包输出的资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
  ],
  //模式
  mode: "production",
};
