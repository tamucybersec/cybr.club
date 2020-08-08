/*========== FOOTER DYNAMIC YEAR ==========*/
const date = new Date();
$('.year').html(date.getFullYear());

/*========== NAV UNDERLINE ANIMATION ==========*/
$(window).on('on', function(){
  const selector = 'ul li';
  let path = window.location.href.split('/')
  let lookup = path[path.length-1]

  $(selector).each(function(){
    $(this).children('a').removeClass('nav-link-fade-up-active');
    if($(this).find('a').attr('href')==('./'+lookup)) {
      $(this).children('a').addClass('nav-link-fade-up-active');
    }
  })
});

/*========== SMOOTH SCROLL TO LINK ==========*/
$(document).on('click', 'a[href^="#"]', function (event) { //when link with "#" clicked
  event.preventDefault(); //prevent default click event
  $('html, body').animate({ //animate window scrolling (on click of "#" link)
      scrollTop: $($.attr(this, 'href')).offset().top //when scrolling to link destination
  }, 1000); //at animated window speed of 1000ms
});

/*========== AUTOMATICALLLY FADE OUT MESSAEGES  ==========*/
setTimeout(function() {
    $('.alert').fadeOut('slow')
}, 3000)


/*========== FOOTER  ==========*/
// instagram trasition logo
$("#instagram").hover(function () {
    $(this).addClass('fa-instagram');
    $(this).removeClass('fa-instagram-square');
}, function () {
    $(this).removeClass('fa-instagram');
    $(this).addClass('fa-instagram-square');
});


/*========== Alumni Table  ==========*/
const alumni = [
  {
    name: 'John Zenick',
    position: 'President',
    gradYear: '2020'
  },
  {
    name: 'Nick March',
    position: 'Vice President',
    gradYear: '2020'
  },
  {
    name: 'Jonathan Alverson',
    position: 'General Officer',
    gradYear: '2020'
  },
]

const colNames = ['name', 'position', 'gradYear']
$( document ).ready(function() {
  let numCols = 3;
  var tbody = $('.alumni-table tbody');
  for(let i = 0; i < alumni.length; ++i) {
    var tr = $('<tr/>').appendTo(tbody);
    for(let j = 0; j < 3; ++j) {
      if( j != 2) {
        tr.append('<td>' + alumni[i][colNames[j]] + '</td>');
      } else {
        tr.append('<td>' + alumni[i][colNames[j]] + '</td>');
      }
    }
  }
});