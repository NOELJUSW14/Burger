$(function() {
  $('.create-form').on('submit', function(event) {
    event.preventDefault()

    var newBurger = {
      burger_name: $('#newBurger')
        .val()
        .trim(),
      devoured: 0,
    }
    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger,
    }).then(function() {
      alert('Added New Burger')
      console.log('Added New Burger'), location.reload()
    })
  })

  $('.eatburger').on('click', function(event) {
    event.preventDefault()

    var id = $(this).data('id')
    var devoured = $(this).data("devoured");
    var devouredState = {
      devoured: 1,
    }

    $.ajax('/api/burgers/' + id, {
      type: 'PUT',
      data: devouredState,
    }).then(function() {
      console.log('Burger devoured', devoured)
      location.reload()
    })
  })

  $('.deleteburger').on('click', function(event) {
    event.preventDefault()
    var id = $(this).data('id')

    $.ajax( "/api/burgers/" + id,{
      type: 'DELETE'
    }).then(function() {
      console.log('deleted burger', id)
      location.reload()
    })
  })
})
