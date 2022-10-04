const c = (el) => document.querySelector(el);
const cl = (els) => document.querySelector(els);

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

      // pizzaWindow
      pizzaItem.querySelector('a').addEventListener('click', (e) => {
        // ligando pizza area
        e.preventDefault();
        const pizzaWindowArea = c('.pizzaWindowArea');
        pizzaWindowArea.style.opacity = 0;
        pizzaWindowArea.style.display = 'flex';
        setTimeout(() => {
          pizzaWindowArea.style.opacity = 1;
        }, 150);

        // preenchendo pizza area
        pizzaWindowArea.querySelector('.pizzaInfo h1').innerHTML = pizzaName;
        pizzaWindowArea.querySelector('.pizzaBig img').src = pizzaImg;
        pizzaWindowArea.querySelector('.pizzaInfo--desc').innerHTML = pizzaDescription;
        pizzaWindowArea.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaPrice.toString().replace('.', ',')}`
      })

      c('.pizza-area').appendChild(pizzaItem);

    })
  }
  catch (e) {
    console.log(e);
  }
}

pizzaData();
