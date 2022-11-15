const carrito = []

const entradas = [{ tipo: 'Campo Delantero', codigo: 1, precio: 6500},
                  { tipo: 'Campo General', codigo: 2, precio: 3500},
                  { tipo: 'Platea Preferencial', codigo: 3, precio: 6000},
                  { tipo: 'Platea', codigo: 4, precio: 5000},
                  { tipo: 'Platea Alta', codigo: 5, precio: 4000}]

const mensajeInicial = "Selecciona el tipo de entrada por el codigo numérico:"

function buscarEntrada(codigo) {
    let resultado = entradas.find(prenda => prenda.codigo === parseInt(codigo))
    return resultado
}

class Compra {
    constructor(carrito) {
        this.carrito = carrito
    }
    obtenerSubtotal() {
        if (carrito.length > 0) {
            return this.carrito.reduce((acc, entrada)=> acc + entrada.precio, 0).toFixed(2)
        } else {
            return `⚠Error⚠`
        }
    }
    validarCompra() {
        if (this.obtenerSubtotal() !== '⚠Error⚠') {
            return `Validamos el pago de $ ${this.obtenerSubtotal()}.`
        } else {
            return `¡Error en el pago!`
        }
    }
}

function comprar() {
    let codigo = prompt(mensajeInicial)
    if (!parseInt(codigo)) {
        alert("⚠ Error al ingresar el codigo")
        return
    }
    let entradaElegida = buscarEntrada(codigo)
    carrito.push(entradaElegida)
    let respuesta = confirm("¿Querés agregar otra entrada al carrito?")
    if (respuesta) {
        comprar()
    } else {
        finalizarCompra() 
    }
}

function verCarrito() {
    console.table(carrito)
}

function finalizarCompra() {
    if (carrito.length === 0) {
        console.error("El carrito está vacío")
        return
    }
    const shopping = new Compra(carrito)
    alert(`El costo total es de $ ${shopping.obtenerSubtotal()}`)
    let respuesta = confirm("¿Deseas confirmar tu compra?")
        if(respuesta){
            alert(shopping.validarCompra())
            carrito.length = 0
        }
}

