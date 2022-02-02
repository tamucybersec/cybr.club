// API GATEWAY ENDPOINT URL FOR AWS LAMBDA+SES
const API_HOME_EMAIL = 'https://3qc9d77k52.execute-api.us-east-1.amazonaws.com/prod/contact'
const API_RHA_EMAIL = API_HOME_EMAIL
const API_WICYS_EMAIL = API_HOME_EMAIL
API_EMAIL_URL = ''

let pathArray = window.location.pathname.split('/');
let page = pathArray[pathArray.length - 1];

if(page === 'contact.html') {
    API_EMAIL_URL = API_HOME_EMAIL;
} else if(page === 'rha.html') {
    API_EMAIL_URL = API_RHA_EMAIL;
} else if(page === 'wicys.html') {
    API_EMAIL_URL = API_WICYS_EMAIL;
}