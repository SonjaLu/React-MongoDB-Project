const mongoose = require('mongoose');
const RestaurantModel = require('./models/RestaurantSchema'); // Pfad zu Ihrem Restaurant-Schema

mongoose.connect('mongodb+srv://test:test@cluster0.pr6eji9.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Erfolgreich mit MongoDB verbunden'))
.catch(err => console.error('Fehler bei der Verbindung zu MongoDB:', err));

Restaurant.updateMany(
{}, 
{ $set: { "pic": { $concat: ["/uploads/", "$pic"] } } },
{ multi: true }
)
.then(result => {
console.log('Update Ergebnisse:', result);
mongoose.disconnect();
})
.catch(err => {
console.error('Fehler beim Aktualisieren der Bildpfade:', err);
mongoose.disconnect();
});
