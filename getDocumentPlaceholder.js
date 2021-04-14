const { google } = require('googleapis');
const keys = require('./keys.json');
const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  'https://www.googleapis.com/auth/spreadsheets',
]);
client.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Connected!');
    gsrun(client);
  }
});
async function gsrun(cl) {
  const gsapi = google.sheets({
    version: 'v4',
    auth: cl,
    createPDF: createPDF,
  });
  const opt = {
    spreadsheetId: '1IUtoRuuR7ik2JQpW-5yjtqnEyC1tII8kFpCxYNG7MtE',
    range: 'Form Responses 1!A2:F2',
  };
  let data = await gsapi.spreadsheets.values.get(opt);
  console.log(data.data.values);
}
