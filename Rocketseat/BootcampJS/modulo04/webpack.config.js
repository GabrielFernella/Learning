const path =  require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'), // pasta do arquivo de entrada
  output: { // arquivo onde estará todo o código copilado para navegador, que o browser entenda
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js' //nome do arquivo que será criado
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [ //toda vez que o babel encontrar esse tipo de arquivo ele deve transpilar
      {
        test: /\.js$/, //expressão regular
        exclude: /node_modules/, //excluir da transpilação tudo que estiver dentro de node_modules
        use: {
          loader: 'babel-loader' //ferramenta de transpilação do código
        }
      },
      {
        test: /\.css$/
      }
    ]
  }
}