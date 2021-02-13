import React from 'react';

const App = () => {

  const mario = {
    cliente: 'mario',
    idade: 31,
    compras: [
      {nome: 'notebook', preco: 'R$ 3000'},
      {nome: 'kindle', preco: 'R$ 500'}
    ],
    ativa: true,
  }

  const lucia = {
    cliente: 'lucia',
    idade: 25,
    compras: [
      {nome: 'TV', preco: 'R$ 3000'},
      {nome: 'PLAY4', preco: 'R$ 500'}
    ],
    ativa: false,
  }

  // passando os dados
  const dados = mario

  const total = dados.compras.map(item => Number(item.preco.replace('R$', '')),).reduce((a,b)=> a+b);

  return (
    <div>
      <p>Nome: {dados.cliente}</p>
      <p>Idade: {dados.idade}</p>
      <p>Situação: <span style={{ color: dados.ativa ? 'green' : 'red'}}>{dados.ativa ? "Ativa" : "False"} </span></p>
      <p>Total: R${total}</p> 
    </div>
  );
}

export default App;
