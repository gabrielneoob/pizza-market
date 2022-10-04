const c = (el) => document.querySelector(el);

const pizzaData = async function () {
  try {
    const response = await fetch('../pizza.json');
    const data = await response.json();
    data.map((item, index) => {
      const pizzaItem = c('.models .pizza-item').cloneNode(true);
      // atribuindo as informações
      const pizzaId = item.id;
      const pizzaImg = item.img;
      const pizzaName = item.name;
      const pizzaSizes = item.sizes;
      const pizzaPrice = item.price;
      const pizzaDescription = item.description;

      //preenchendo as informações
      pizzaItem.querySelector('.pizza-item--img img').src = pizzaImg;
      pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizzaPrice.toString().replace('.', ',')}`;
      pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizzaDescription;
      console.log(pizzaItem);
      pizzaItem.querySelector('.pizza-item--name').innerHTML = pizzaName;

      c('.pizza-area').appendChild(pizzaItem);

    })
  }
  catch (e) {
    console.log(e);
  }
}

pizzaData();
