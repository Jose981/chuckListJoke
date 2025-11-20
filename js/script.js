// Acceder y obtener respuesta de la api ok
// Almacenar el chiste en la localStorage ok
// Mostrarlo ok
const botonChiste = document.getElementById('fetchJoke')
const listaChistes = document.getElementById('jokeList')
const borrarTodo = document.getElementById('borrarTodos');
console.log(localStorage)
let chistes = JSON.parse(localStorage.getItem('chistes') || '[]');
chistes.forEach(pintarChiste);
botonChiste.addEventListener("click", () => {
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al acceder a la api")
            } else {
                return response.json();
            }
        })
        .then(data => {
            // Nuevo chiste
            const textoChiste = data.value;
            // 1. Lo meto en el array en memoria
            chistes.push(textoChiste);
            // 2. Guardo TODO el array en localStorage (como JSON)
            localStorage.setItem('chistes', JSON.stringify(chistes)) || "";
            // 3. Lo pinto en pantalla si quieres
            pintarChiste(textoChiste);
        })
})
function pintarChiste(textoChiste) {
    let divChiste = document.createElement('div')
    divChiste.classList.add("divChiste");
    let chiste = document.createElement('p')
    let botonBorrar = document.createElement('button')
    chiste.innerHTML = textoChiste
    botonBorrar.innerHTML = "Borrar"
    botonBorrar.addEventListener('click', () => {
        borrarChiste(textoChiste, divChiste)
    })
    divChiste.appendChild(chiste)
    divChiste.appendChild(botonBorrar)

    listaChistes.appendChild(divChiste)
}
function borrarChiste(textoChiste, divChiste) {
    chistes = chistes.filter(c => c !== textoChiste);
    localStorage.setItem('chistes', JSON.stringify(chistes));
    divChiste.remove();
}
borrarTodo.addEventListener('click', () => {
    localStorage.clear()
    listaChistes.innerHTML = ""
});

