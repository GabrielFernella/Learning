class Negociacoes {
    constructor() {
        //Array do tipo negocição
        this._negociacoes = [];
    }
    //Adiciona uma negociação do tipo negociação
    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }
    //Pega os dados do Array
    paraArray() {
        return [].concat(this._negociacoes);
    }
}
