class Negociacoes {
    //Array do tipo negocição
    private _negociacoes: Negociacao[] = [];

    //Adiciona uma negociação do tipo negociação
    adiciona(negociacao: Negociacao): void {
        this._negociacoes.push(negociacao)
    }

    //Pega os dados do Array
    paraArray(): Negociacao[] {
        return [].concat(this._negociacoes);
    }
}