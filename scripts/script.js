const c = (c) => document.querySelector(c);
const el = (el) => document.querySelectorAll(el);

async function puxarData() {
  try {
    // puxar dadaos de pizza.json
    const response = await fetch('../pizza.json');
    const data = await response.json();

    //colocar dados
    data.map((item, i) => {
      let pizzaQt = 1;

      let pizzaItem = c('.models .pizza-item').cloneNode(true);
      // puxar dados do json e por
      pizzaItem.querySelector('.pizza-item--img img').setAttribute('src', item.img);
      pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
      pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toString().replace('.', ',')}`;
      pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

      pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        const pizzaWindow = c('.pizzaWindowArea');
        let pizzaPrice = item.price;
        pizzaWindow.style.opacity = 0;
        pizzaWindow.style.display = 'flex';
        setTimeout(() => {
          pizzaWindow.style.opacity = 1;
        }, 200)
        pizzaWindow.querySelector('.pizzaBig img').src = item.img;
        pizzaWindow.querySelector('.pizzaInfo h1').innerHTML = item.name;
        pizzaWindow.querySelector('.pizzaInfo--desc').innerHTML = item.description;
        pizzaWindow.querySelector('.pizzaInfo--actualPrice').innerHTML = pizzaPrice;

        pizzaWindow.querySelector('.pizzaInfo--qt').innerHTML = pizzaQt;

        pizzaWindow.querySelector('.pizzaInfo--qtmenos').addEventListener('click', (e) => {
          e.preventDefault();
          if (pizzaQt > 1) {
            pizzaQt -= 1;
            pizzaPrice -= item.price;
            pizzaWindow.querySelector('.pizzaInfo--actualPrice').innerHTML = pizzaPrice.toFixed(2);
            pizzaWindow.querySelector('.pizzaInfo--qt').innerHTML = pizzaQt;
            console.log(pizzaQt);
            console.log(pizzaPrice);
          }
        })


        pizzaWindow.querySelector('.pizzaInfo--qtmais').addEventListener('click', (e) => {
          pizzaQt += 1;
          pizzaPrice = item.price * pizzaQt;
          pizzaWindow.querySelector('.pizzaInfo--qt').innerHTML = pizzaQt;
          pizzaWindow.querySelector('.pizzaInfo--actualPrice').innerHTML = pizzaPrice.toFixed(2);
          console.log(pizzaQt);
          console.log(pizzaPrice);

        })

        // CLOSE WINDOW
        pizzaWindow.querySelector('.pizzaInfo--cancelButton').addEventListener('click', (e) => {
          pizzaWindow.style.opacity = '0';
          pizzaWindow.style.display = 'none';
          pizzaQt = 1;
          console.log(pizzaQt)
        })
      })




      c('.pizza-area').appendChild(pizzaItem);
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