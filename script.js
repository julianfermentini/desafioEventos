document.getElementById("botoncito").addEventListener("click", () => {
  alert("Compra exitosa");
});

const productos = [remera, jean, buzo, zapatillas];

const carrito = [];

let productoElegido;

//getElementById  === un solo nodo
//getElementsByClassName  === htmlCollection ( array )

const container = document.querySelector(".container");

//function saludar(){}
const saludar = () => {
  alert("Bienvenido a BRAGA");
  let nombre = prompt("Ingrese su nombre: ");
  while (!isNaN(nombre)) {
    nombre = prompt("Ingrese su nombre");
  }
  container.innerHTML = `<h1>Bienvenido ${nombre.toUpperCase()}</h1>`;
};

const consultarProductos = () => {
  let texto = "";
  for (const p of productos) {
    texto += `${p.id}) ${p.nombre}\n`;
  }
  let prod = parseInt(prompt(`Que producto llevara? :\n${texto} `));

  while (prod > 4 || prod < 1 || isNaN(prod)) {
    prod = parseInt(prompt(`Que producto llevara? :\n${texto} `));
  }

  return prod;
};

const llevarProducto = () => {
  let buscarProducto = productos.find(
    (element) => element.id === productoElegido
  );

  //some
  let existe = carrito.some((element) => element.id === productoElegido);

  if (existe) {
    buscarProducto.cantidad++;
  } else {
    buscarProducto.cantidad = 1;
    carrito.push(buscarProducto);
  }

  const seguir = confirm("Desea agregar otro producto ?");

  if (seguir) {
    productoElegido = consultarProductos();
    llevarProducto();
  }
};

const mostrarProductos = () => {
  const divCaja = document.createElement("div");
  divCaja.className = "caja";
  container.appendChild(divCaja);

  carrito.forEach((element) => {
    divCaja.innerHTML += `<div class="cajita">
    <p>${element.nombre.toUpperCase()}</p>
    <p>c/u$${element.precio}</p>
    <p>Cantidad : ${element.cantidad}</p>
    <h3>Subtotal : $${element.precio * element.cantidad}</h3>
    </div>`;
  });
};

const calcularTotal = () => {
  let cajaTotal = document.createElement("div");
  cajaTotal.className = "cajita";
  //reduce
  let total = carrito.reduce((acc, ite) => acc + ite.precio * ite.cantidad, 0);

  cajaTotal.innerHTML = `<h2>El total es : $${total}</h2>`;

  container.appendChild(cajaTotal);
};

saludar();
productoElegido = consultarProductos();
llevarProducto();
mostrarProductos();
calcularTotal();
