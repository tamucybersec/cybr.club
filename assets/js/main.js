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
// trasition instagram logo
$("#instagram").hover(function () {
    $(this).addClass('fa-instagram');
    $(this).removeClass('fa-instagram-square');
}, function () {
    $(this).removeClass('fa-instagram');
    $(this).addClass('fa-instagram-square');
});

/*========== ABOUT PAGE  ==========*/
// Dynamically create alumni table
const officerCol = ['name', 'position', 'socials']
$( document ).ready(function() {
  let numCols = 3;
  let offciersBody = $('#officers');
  for(let i = 0; i < officers.length; ++i) {
    let name = officers[i].name;
    let position = officers[i].position;
    let image = officers[i].image;

    let officer = $(`
    <div class="col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
      <div class="card about border-0 shadow">
        <img class="card-img-top" src="${image}">
        <div class="card-body">
          <h5 class="card-title mb-0">${name}</h5>
          <div class="card-text text-black-50">${position}</div>
          <hr class="m-0 p-0 my-2">
          <ul class="social-media">
          ${officers[i].socials.linkedin ? 
            `<li>
              <a href="${officers[i].socials.linkedin}"><i class="fab fa-linkedin about fa-lg"></i></a>
            </li>`
            : ''}
          ${officers[i].socials.github ? 
            `<li>
              <a href="${officers[i].socials.github}"><i class="fab fa-github-square about fa-lg"></i></a>
            </li>`
            : ''}
          ${officers[i].socials.email ? 
            `<li>
              <a href="mailto:${officers[i].socials.email}"><i class="fas fa-envelope about fa-lg"></i></a>
            </li>`
            : ''}
          ${officers[i].socials.website ? 
            `<li>
              <a href="${officers[i].socials.website}"><i class="fas fa-link about fa-lg"></i></a>
            </li>`
            : ''}
          </ul>
        </div>
      </div>
    </div>
    `).appendTo(offciersBody);
  }
});

// Dynamically create alumni table
const alumniCol = ['name', 'position', 'gradYear']
$( document ).ready(function() {
  let numCols = 3;
  let tbody = $('.alumni-table tbody');
  for(let i = 0; i < alumni.length; ++i) {
    console.log(alumni[i]);
    tbody.append(`
      <tr>
        <td>
        ${alumni[i].name}
        ${alumni[i].socials.linkedin ? 
          `<a href="${alumni[i].socials.linkedin}"><i class="fab fa-linkedin text-white fa-lg"></i></a>`
          : ''}
        ${alumni[i].socials.github ? 
        `<a href="${alumni[i].socials.github}"><i class="fab fa-github-square text-white fa-lg"></i></a>`
        : ''}
        ${alumni[i].socials.email ? 
          `<a href="mailto:${alumni[i].socials.email}"><i class="fas fa-envelope text-white fa-lg"></i></a>`
          : ''}
        ${alumni[i].socials.website ? 
          `<a href="${alumni[i].socials.website}"><i class="fas fa-link text-white fa-lg"></i></a>`
          : ''}
        </td>
        <td>${alumni[i].position}</td>
        <td>${alumni[i].gradYear}</td>
      </tr>
    `);
  }
});