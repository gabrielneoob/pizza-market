const el = (el) => document.querySelector(el);

const pizzaData = async function () {
  try {
    const response = await fetch('../pizza.json');
    const data = await response.json();
    data.map((item, index) => {
      const pizzaItem = el('.models .pizza-item').cloneNode(true);
      console.log(pizzaItem);
    })
  }
  catch (e) {
    console.log(e);
  }
}
