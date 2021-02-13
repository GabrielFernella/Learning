# Pacotes na ordem de instalação
1. npx create-react-app project
2. npm i eslint -D
3. npx eslint --init
    √ How would you like to use ESLint? · style       
    √ What type of modules does your project use? · esm
    √ Which framework does your project use? · react
    √ Does your project use TypeScript? · No / Yes
    √ Where does your code run? · browser
    √ How would you like to define a style for your project? · guide
    √ Which style guide do you want to follow? · airbnb      
    √ What format do you want your config file to be in? · JSON
    √ Would you like to install them now with npm? · No / Yes
4. npm i prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
5. Crie o arquivo .prettierrc e insira
    {
        "singleQuote": true,
        "trailingComma": "all",
        "tabWidth": 2
    }
