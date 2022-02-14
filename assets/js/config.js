// API GATEWAY ENDPOINT URL FOR AWS LAMBDA+SES
const API_EMAIL_URL_ROOT = 'https://3qc9d77k52.execute-api.us-east-1.amazonaws.com/prod'
const API_HOME_EMAIL = API_EMAIL_URL_ROOT + '/contact'
const API_RHA_EMAIL = API_HOME_EMAIL + '/contact'
const API_WICYS_EMAIL = API_HOME_EMAIL + '/wicys-contact'
let API_EMAIL_URL = ''

let email_address = ''



let pathArray = window.location.pathname.split('/');
let page = pathArray[pathArray.length - 1];

if(page === 'contact.html') {
    API_EMAIL_URL = API_HOME_EMAIL;
	email_address = 'tamucybersec@gmail.com'
} else if(page === 'rha.html') {
    API_EMAIL_URL = API_RHA_EMAIL;
	email_address = 'tamucybersec@gmail.com'
} else if(page === 'wicys.html') {
    API_EMAIL_URL = API_WICYS_EMAIL;
	email_address = 'tamuwicys@gmail.com'
}