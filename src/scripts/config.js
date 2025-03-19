// API GATEWAY ENDPOINT URL FOR AWS LAMBDA+SES
const API_URL = 'https://3qc9d77k52.execute-api.us-east-1.amazonaws.com/prod/contact'
let email_address = ''

const pathArray = window.location.pathname.split('/');
const page = pathArray[pathArray.length - 1];

if(page === 'contact.html') {
    email_address = 'tamucybersec@gmail.com';
} else if(page === 'rha.html') {
    email_address = 'tamucybersec@gmail.com';
} else if(page === 'wicys.html') {
    email_address = 'tamuwicys@gmail.com';
}