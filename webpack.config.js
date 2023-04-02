require('dotenv').config();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //alllows for the html template
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //creates a seperate css file

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; //sets the environment whether in production or not, else development

module.exports = (env,argv) => {
  const isProduction = argv.mode === 'production'; //argv.mode reads the mode whether in production or development, wouldn't have been necessary if NODE_ENV worked

  return {
    entry: path.resolve(__dirname,'src/app.js'),

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname,'dist'), //put the output in a folder known as dist in the root folder
      clean: true //deletes the folder and creates a new one anytime the project is built
    },

    module: {
      rules: [
        {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/ //sll files ending in .js except those in node_modules should be translated by babel
        },
        {
        test: /\.s?css$/,
        use: [
          isProduction ?//use style loader in dev mode and minicssextract in production mode
            MiniCssExtractPlugin.loader:"style-loader", //adds the style tag to the string to make it a style. the only difference between the 2 is that minicssextract creates a seperate file for the style
            {
              loader: "css-loader", //gathers all css into a string
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader", //gathers all sass into a string
              options: {
                sourceMap: true
              }
            }
        ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i, //for reading images of different formats
          type: 'asset/resource',
        }
      ]
    },

    devtool: isProduction ? 'source-map' : 'inline-source-map',

    plugins: [
      new HtmlWebpackPlugin({
        title:"GlobalTrain",
        filename:"index.html",
        template:"src/template.html",
        // favicon:"src/Images/logo.png" //don't add the ./
      }),
      new MiniCssExtractPlugin()
    ],
    devServer: {
      static: {
        directory:path.resolve(__dirname,'dist')
      },
      historyApiFallback: true //load the index.html file instead of an error when a client refreshes because the route is not in the server
    },
  };
};
