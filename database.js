
async function saveWeatherData(city, data) {
    const db = await openDatabase();
    db.collection('weatherHistory').add({
        city: city,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        description: data.weather[0].description,
        timestamp: new Date()
    });
}
async function openDatabase() {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: 'YOUR_FIREBASE_API_KEY',
            authDomain: 'your-app.firebaseapp.com',
            projectId: 'your-app-id'
        });
    }
    return firebase.firestore();
}
