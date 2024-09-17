const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
    $.ajax({
        url: URL + i,
        method: 'GET',
        success: function (data) {
            mostrarPokemon(data);

        }
    });
    listTipoPokemon();
    listNamePokemon();
}

$('#searchInputt').on('input', function () {
    const searchValue = this.value.toLowerCase();

    if (searchValue) {
        $.ajax({
            url: `https://pokeapi.co/api/v2/type/${searchValue}`,
            method: 'GET',
            success: function (data) {
                mostrarPokemonPorTipo(data.pokemon);
            },
            error: function () {
                console.error('Error fetching Pokémon');
                $('#listaPokemon').html(`<p>Filtrando pokemones "${searchValue}".</p>`);
            }
        });
    }
});

function mostrarPokemonPorTipo(pokemons) {
    const pokemonContainer = $('#listaPokemon');
    pokemonContainer.html('');  // Limpiar resultados anteriores

    pokemons.forEach(pokemonEntry => {
        $.ajax({
            url: pokemonEntry.pokemon.url,
            method: 'GET',
            success: function (pokemonData) {
                let tipos = pokemonData.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
                tipos = tipos.join('');

                let pokeId = pokemonData.id.toString();
                if (pokeId.length === 1) {
                    pokeId = "00" + pokeId;
                } else if (pokeId.length === 2) {
                    pokeId = "0" + pokeId;
                }

                const div = `
                    <div class="pokemon">
                        <div class="pokemon-imagen">
                            <img src="${pokemonData.sprites.other["official-artwork"].front_default}" alt="${pokemonData.name}">
                        </div>
                        <div class="pokemon-info">
                            <div class="nombre-contenedor">
                                <p class="pokemon-id">#${pokeId}</p>
                                <h2 class="pokemon-nombre">${pokemonData.name}</h2>
                            </div>
                            <div class="pokemon-tipos">
                                ${tipos}
                            </div>
                            <div class="pokemon-stats">
                                <p class="stat">${pokemonData.height}m</p>
                                <p class="stat">${pokemonData.weight}kg</p>
                            </div>
        <a class="volver" href="#pokeApi">VOLVER INICIO</a>

                        </div>
                    </div>
                `;

                pokemonContainer.append(div);
            }
        });
    });
}

function mostrarPokemon(poke) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    const div = `
        <div class="pokemon">
            <div class="pokemon-imagen">
                <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${pokeId}</p>
                    <h2 class="pokemon-nombre">${poke.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${tipos}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${poke.height}m</p>
                    <p class="stat">${poke.weight}kg</p>
                 </div>
        <a class="volver" href="#pokeApi">VOLVER INICIO</a>

            </div>
        </div>
    `;
    $(listaPokemon).append(div);
}

botonesHeader.forEach(boton => $(boton).on("click", (event) => {
    const botonId = event.currentTarget.id;

    $(listaPokemon).html("");

    for (let i = 1; i <= 151; i++) {
        $.ajax({
            url: URL + i,
            method: 'GET',
            success: function (data) {
                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }
            }
        });
    }
}));

$('#searchInput').on("keypress", (event) => {
    if (event.key === "Enter") {
        $('#searchButton').click();
    }
});

function buscarPokemon(nombre) {
    $.ajax({
        url: `${URL}${nombre.toLowerCase()}`,
        method: 'GET',
        success: function (data) {
            mostrarPokemon(data);
        },
        error: function () {
            $('#listaPokemon').html('<p>Pokémon no encontrado</p>');
        }
    });
}

$('#searchButton').on("click", () => {
    const nombrePokemon = $('#searchInput').val().trim();
    if (nombrePokemon) {
        buscarPokemon(nombrePokemon);
    }
});

function listTipoPokemon() {
    $.ajax({
        url: "https://pokeapi.co/api/v2/type?limit=100000&offset=0",
        method: 'GET',
        success: function (data) {
            const tipos = data.results.map(tipo => tipo.name);
            const tiposHTML = tipos.map(tipo => `<option value="${tipo}">${tipo}</option>`);
            document.getElementById('tipoPokemon').innerHTML = tiposHTML.join('');
        }
    });
}



function listNamePokemon() {
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
        method: 'GET',
        success: function (data) {
            const tipos = data.results.map(nombre => nombre.name);
            const tiposHTML = tipos.map(tipo => `<option value="${tipo}">${tipo}</option>`);
            document.getElementById('namePokemon').innerHTML = tiposHTML.join('');
        }
    });
}



