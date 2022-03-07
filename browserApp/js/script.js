function updateEvents() {
    fetch('events')
        .then(response => response.json())
        .then(data => {
            $("#events").html(JSON.stringify(data))
        })
}

function updateSuperHeroes() {
    fetch('superheroes')
        .then(response => response.json())
        .then(data => {
            $("#superheroes").html(JSON.stringify(data))
        })
}

function reportEvent() {
    const params = {
        name: $('#eventname').val(),
        location: $('#eventlocation').val(),
        requiredSkills: $('#eventlocation').val().split(',')
    }

    fetch('reportEvent', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then(response => response.json())
        .then(_data => {
            updateEvents()
            updateSuperHeroes()
        })
}

function declareSuperhero() {
    const params = {
        name: $('#superheroname').val()
    }
    fetch('declareSuperhero', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then(response => response.json())
        .then(_data => {
            updateEvents()
            updateSuperHeroes()
        })
}


$(document).ready(function () {
    updateEvents()
            updateSuperHeroes()
    $('#declareSuperhero').on("click", function () {
        declareSuperhero()
    })
    $('#reportEvent').on("click", function () {

        reportEvent()

    })
});