const camiseta = document.getElementById ('camisetas')

const contadorCarrito = document.getElementById('contadorCarro')

const CarroContenedor = document.getElementById('carroContenedor')

const finalizarPedido = document.getElementById('finalizarPedido')

const VaciarCarroModal = document.getElementById('vaciarCarro')



const Carro = JSON.parse(localStorage.getItem('carrito')) || []

let carrito = []

let stockCamisetas = [{
      
          nombre: "Camiseta Boca",
          id: 1,
          precio: 3500,
          cantidad: 1,
          img: "./img/1.jpg"
      },
 
      {
          nombre: "Buzo Boca",
          id: 2,
          precio: 5000,
          cantidad: 1,
          stock: 1,
          img: "./img/6.jpg"
      },
  
      {
          nombre: "Pantalon Boca",
          id: 3,
          precio: 4000,
          cantidad: 1,
          stock: 1,
          img: "./img/11.jpg"
      }
    ]

  stockCamisetas.forEach((producto) => {
      const div = document.createElement('div')
      div.classList.add('producto')
      div.innerHTML = `
              <div class="card" style="width: 18rem;">
              <div class="card-body">
                  <img src=${producto.img}>
                  <h3>${producto.nombre}</h3>
                  <p class="precioProducto">Precio: $${producto.precio}</p>
                  <button id="agregar${producto.id}" class="btn btn-dark btn-sm">Agregar <i class="fas fa-shopping-cart"></i></button>
              </div>
          </div>
              `
  
      camiseta.appendChild(div)
  
  
      const boton = document.getElementById(`agregar${producto.id}`)
  
  
      boton.addEventListener('click', () => {
          agregarAlCarrito(producto.id)
      })
  })


  const agregarAlCarrito = (prodId) => {

    const listacarro = carrito.some(prod => prod.id === prodId)

    if (listacarro) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else {

        const item = stockCamisetas.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarro()
}


const actualizarCarro = () => {

  CarroContenedor.innerHTML = ""

  carrito.forEach((prod) => {
      const div = document.createElement('div')
      div.className = ('productoEnCarrito')
      div.innerHTML = `
      <p>${prod.nombre}</p>
      <p>Precio:$${prod.precio}</p>
      <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
      <button onclick="vaciarCarrito(${prod.id})" class="btn btn-outline-danger boton-eliminar"><i class="fas fa-trash-alt"></i></button>
      `

      CarroContenedor.appendChild(div)

      localStorage.setItem('carrito', JSON.stringify(carrito))

  })

  contadorCarrito.innerText = carrito.length


  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

const vaciarCarrito = (prodId) => {

  const item1 = carrito.find((prod) => prod.id === prodId)

  const indice = carrito.indexOf(item1)

  carrito.splice(indice, 1)

  actualizarCarro()

  borrarDatos()

}

function borrarDatos() {
  localStorage.clear();
}

// -----------------  Alerts  ------------------ //

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
  customClass: {
      popup: 'colored-toast'
    },
  }
)

Toast.fire({
  icon: 'success',
  iconColor: 'white',
  title: 'Bienvenido/a'
})



VaciarCarroModal.addEventListener('click', () => {
  
  Swal.fire({
      title: 'Está seguro de vaciar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a5dc86',
      cancelButtonColor: '#f27474',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Tu Carrito fué vaciado con éxito',
        )
      carrito.length = 0
      actualizarCarro()
      borrarDatos()
      }
    })
      carrito.length = 0
      actualizarCarro()
      borrarDatos()
})


finalizarPedido.addEventListener('click', () => {
  Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Pedido realizado con éxito',
      showConfirmButton: false,
      timer: 1500
    })
    
  carrito.length = 0
  actualizarCarro()
  borrarDatos()
})