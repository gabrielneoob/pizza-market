let modalQt = 1;
let cart = [];
let modalKey = 0;
const c = (el) => document.querySelector(el);
const cl = (els) => document.querySelectorAll(els);



// events modal
const closeModal = () => {
  c('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    c('.pizzaWindowArea').style.display = 'none';
  }, 500)
  modalQt = 1;
}

const plusPizza = () => {
  modalQt += 1;

  c('.pizzaInfo--qt').innerHTML = modalQt;
}

const menosPizza = (data) => {
  modalQt -= 1;
  (modalQt === 0) ? closeModal() : c('.pizzaInfo--qt').innerHTML = modalQt;
}

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
      pizzaItem.setAttribute('data-key', index);
      pizzaItem.querySelector('.pizza-item--img img').src = pizzaImg;
      pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${pizzaPrice.toString().replace('.', ',')}`;
      pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizzaDescription;
      pizzaItem.querySelector('.pizza-item--name').innerHTML = pizzaName;

      // pizzaWindow
      pizzaItem.querySelector('a').addEventListener('click', (e) => {
        let key = +e.target.closest('.pizza-item').getAttribute('data-key');
        modalKey = key;
        modalQt = 1;

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
        c('.pizzaInfo--size.selected').classList.remove('selected');
        const sizes = Array.from(pizzaWindowArea.querySelectorAll('.pizzaInfo span'));
        sizes.map((size, index) => {
          size.innerHTML = pizzaSizes[index];
          if (index === 2) {
            size.parentElement.classList.add('selected');
          }
        });
        c('.pizzaInfo--qt').innerHTML = modalQt;

        pizzaWindowArea.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaPrice.toString().replace('.', ',')}`


        pizzaWindowArea.addEventListener('click', (e) => {
          console.log(e.target);
          if (e.target.classList.contains('pizzaWindowArea')) {
            closeModal();
          }
        })



      })

      Array.from(cl('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton')).map((item) => {
        item.addEventListener('click', closeModal);
      });


      c('.pizza-area').appendChild(pizzaItem);

    })

    c('.pizzaInfo--addButton').addEventListener('click', (e) => {
      const elPrincipal = c('.pizzaWindowBody');
      console.log(elPrincipal)
      cart.push({
        id: modalKey,
        name: elPrincipal.querySelector('h1').innerHTML,
        description: elPrincipal.querySelector('.pizzaInfo--desc').innerHTML,
        quantidade: +elPrincipal.querySelector('.pizzaInfo--qt').innerHTML,
        price: +elPrincipal.querySelector('.pizzaInfo--actualPrice').innerHTML.slice(3).replace(',', '.') * +elPrincipal.querySelector('.pizzaInfo--qt').innerHTML,
      })
      closeModal();
    })
  }
  catch (e) {
    console.log(e);
  }
}

pizzaData();

c('.pizzaInfo--qtmais').addEventListener('click', (e) => {
  modalQt += 1;
  c('.pizzaInfo--qt').innerHTML = modalQt;

});

c('.pizzaInfo--qtmenos').addEventListener('click', menosPizza);

cl('.pizzaInfo--size').forEach((size, index) => {
  size.addEventListener('click', (e) => {
    size.classList.add('selected');
  })
})

