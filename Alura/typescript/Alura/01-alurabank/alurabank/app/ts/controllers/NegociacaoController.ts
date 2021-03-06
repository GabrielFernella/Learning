class NegociacaoController {
    private _inputData: HTMLInputElement;
    private _inputQuantidade: HTMLInputElement;
    private _inputValor: HTMLInputElement;
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');

    constructor(){
        this._inputData = <HTMLInputElement>document.querySelector('#data');
        this._inputQuantidade = <HTMLInputElement>document.querySelector('#quantidade');
        this._inputValor = <HTMLInputElement>document.querySelector('#valor');
        this._negociacoesView.update();
    }

    adiciona(event: Event){
        event.preventDefault(); //para não executar quando a página carregar pela primeira vez

        //Passando os input para o Model de Negociação
        const negociacao = new Negociacao(
            new Date(this._inputData.value.replace(/-/g, ',')),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );

        this._negociacoes.adiciona(negociacao);

        this._negociacoes.paraArray().forEach(negociacao => {
            console.log(negociacao.data)
            console.log(negociacao.quantidade)
            console.log(negociacao.valor)
        })
    }
}