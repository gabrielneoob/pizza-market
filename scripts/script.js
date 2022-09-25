// async function puxarData() {
//   try {
//     const response = await fetch('../pizza.json');
//     const data = await response.json();
//     const pizzas = await data.map((pizza) => pizza.name)
//     console.log(data);
//     console.log(pizzas);
//   }
//   catch (e) {
//     console.log(e);
//   }
// };


const pizzajson = fetch('../pizza.json');
let pizzas = pizzajson
  .then((response) => response.json())
  .then((dataJson) => pizzas = dataJson)
  .catch((e) => console.log(e));


function mostrarTempo() {
  const hora = new Date();
  const horas = hora.getHours();
  const minutes = hora.getMinutes();
  const seconds = hora.getSeconds();
  document.body.innerHTML = `${horas}:${minutes}:${seconds}`;
  console.log(`${horas}:${minutes}:${seconds}`);
}

setInterval((mostrarTempo), 1000);