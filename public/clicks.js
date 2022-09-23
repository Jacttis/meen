
const button = document.getElementById('buttonBuscar');
const input=document.getElementById('text');
const buttonBuscarEspecifica=document.getElementById('buttonBusquedaEspecifica');

buttonBuscarEspecifica.addEventListener('click', function(e) {
  // realizar la busqueda y generar la lista 
  fetch('/pelicula-especifica', {method: 'GET'})
  .then(function(response) {  
    if(response.ok) {
      return response.json();
    }
    throw new Error('Request failed.');
  })
  .then((data) => {
      let lista = "";
      data.forEach((peli)=>
      {
        lista = lista + "<p>" +"Title:"+peli.title+" year:"+peli.year+" imdb:"+peli.imdb+" tomatoes:"+peli.tomatoes+" metacritic:"+peli.metacritic+"</p>";
      })
      const divRes = document.getElementById("resultados");
      divRes.innerHTML = lista;
      return;
  } )
  .catch(function(error) {
    console.log(error);
  });

});
button.addEventListener('click', function(e) {
    // realizar la busqueda y generar la lista 
    fetch('/peliculas'+`?input=${input.value}`, {method: 'GET'})
    .then(function(response) {  
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then((data) => {
        let lista = "";
        data.forEach((peli)=>
        {
            lista = lista + "<p>" +"Title:"+peli.title+" year:"+peli.year+" imdb:"+peli.imdb+" tomatoes:"+peli.tomatoes+" metacritic:"+peli.metacritic+"</p>";
        })
        const divRes = document.getElementById("resultados");
        divRes.innerHTML = lista;
        return;
    } )
    .catch(function(error) {
      console.log(error);
    });

   

});