import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Produto = () => {
  const params = useParams(); //para pegar os paramentros da URL
  //const location = useLocation(); // para pegar informações da rotaa
  return (
    <div>
      <h1>Produto</h1>
      <p>{params}</p>
    </div>
  );
};

export default Produto;
