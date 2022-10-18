window.onload = function () {
    // se crea la party
    var party = [
    {name: 'Bat', id: 'bat1'},
    {name: 'Slime', id: 'slime'},
    {name: 'Bat', id: 'bat2'}
    ];

    // lista
    // se guarda la lista
    var list = document.getElementById('party-monsters');
    party.forEach(function (character) {
        // los ítems de una lista son los elementos <li>
        var li = document.createElement('li');
        li.innerHTML = character.name + ' (<code>' + character.id + '</code>)';
        // añadir un atributo personalizado HTML
        // Siempre tienen el prefijo data-, a lo que se refiere dataset
        li.dataset.charaid = character.id;
        // se añade cada uno de los elementos a la lista
        list.appendChild(li);
    });

    // formulario
    // se guarda el dropdown del formulario
    var select = document.querySelector('select[name=chara]');
    party.forEach(function (character) {
        // el seleccionador está formado por elementos <option>
        var option = document.createElement('option');
        option.innerHTML = character.name;  // se muestra en el menú
        option.value = character.id;    // valor seleccionado
        select.appendChild(option);
    });

    // Evitar que el navegador realice una nueva request al servidor (?chara=slime)
    // Somos los únicos usuarios y, por lo tanto,
    // somos los únicos que queremos saber cuál es el valor del formulario
    var form = document.querySelector('form[name=killing-machine]');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var charaID = form.querySelector('[name=chara]').value;
        // acceder al elemento personalizado HTML
        var li = list.querySelector('[data-charaid=' + charaID + ']');
        // se añade la clase dead al elemento <li>, que contiene al personaje seleccionado
        li.classList.add('dead');
    });
};
