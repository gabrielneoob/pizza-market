const e = (e) => document.querySelector(e);
const el = (el) => document.querySelectorAll(el);

async function puxarData() {
  try {
    // puxar dadaos de pizza.json
    const response = await fetch('../pizza.json');
    const data = await response.json();

    //colocar dados
    data.map((item, i) => {
      let pizzaItem = e('.models .pizza-item').cloneNode(true);
      // puxar dados do json e por
      pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
      pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
      pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toString().replace('.', ',')}`;
      pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;



      e('.pizza-area').appendChild(pizzaItem);
    })
  }
  catch (e) {
    console.log(e);
  }
};

puxarData();


// const pizzajson = fetch('../pizza.json');
// let pizzas;
// pizzajson
//   .then((response) => response.json())
//   .then((dataJson) => pizzas = dataJson)
//   .catch((e) => console.log(e));



// console.log(pizzas)