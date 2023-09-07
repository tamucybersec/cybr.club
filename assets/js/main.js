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

/*========== FOOTER  ==========*/
// trasition instagram logo
$('#instagram').hover(function () {
    $(this).addClass('fa-instagram');
    $(this).removeClass('fa-instagram-square');
}, function () {
    $(this).removeClass('fa-instagram');
    $(this).addClass('fa-instagram-square');
});

/*========== ABOUT PAGE  ==========*/
$(document).ready(function() {
  if (window.location.pathname == '/about.html') {
    $( document ).ready(function() {
	  for(let i = 0; i < officers.length; i++) {
		  //Section for the committee on the webpage. Selects HTML element by ID using jQuery. For example, the right side of the expression might be $("executive-board") for one section
          let section = $(officers[i][0]);
	  
		  for(let j = 1; j < officers[i].length; j++) {
			let name = officers[i][j].name;
			let position = officers[i][j].position;
			let major_year = officers[i][j].major_year;
			let image = officers[i][j].image;

			let officer_card = $(`
			<div class="col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-4">
			  <div class="card about border-0 shadow">
			    <!-- <img class="card-img-top" src="${image}" alt="${name}"> -->
				<div class="card-body">
				  <h5 class="card-title mb-0">${name}</h5>
				  <div class="card-text text-black-50">${position}</div>
				  <div class="card-text major-year">${major_year}</div>
				  <hr class="m-0 p-0 my-2">
				  <ul class="social-media">
				  ${officers[i][j].socials.linkedin ? 
					`<li>
					  <a href="${officers[i][j].socials.linkedin}"><i class="fab fa-linkedin about fa-lg"></i></a>
					</li>`
					: ''}
				  ${officers[i][j].socials.github ? 
					`<li>
					  <a href="${officers[i][j].socials.github}"><i class="fab fa-github-square about fa-lg"></i></a>
					</li>`
					: ''}
				  ${officers[i][j].socials.email ? 
					`<li>
					  <a href="mailto:${officers[i][j].socials.email}"><i class="fas fa-envelope about fa-lg"></i></a>
					</li>`
					: ''}
				  ${officers[i][j].socials.website ? 
					`<li>
					  <a href="${officers[i][j].socials.website}"><i class="fas fa-link about fa-lg"></i></a>
					</li>`
					: ''}
				  ${officers[i][j].socials.website_2 ? 
					`<li>
					  <a href="${officers[i][j].socials.website_2}"><i class="fas fa-link about fa-lg"></i></a>
					</li>`
					: ''}
				  </ul>
				</div>
			  </div>
			</div>
			`)
			
			officer_card.appendTo(section);
		  }
      }
    });

    // Dynamically create alumni table
    $( document ).ready(function() {
      let tbody = $('.alumni-table tbody');
      for(let i = 0; i < alumni.length; ++i) {
        tbody.append(`
          <tr>
            <td>
			  <div style="display: inline-block;">
              ${alumni[i].name}
			  </div>
			  <div style="display: inline-block;">
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
			  </div>
            </td>
            <td>${alumni[i].position}</td>
            <td>${alumni[i].gradYear}</td>
          </tr>
        `);
      }
    });
  }
});