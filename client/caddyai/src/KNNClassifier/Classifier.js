const KNN = require('ml-knn');

// Split the dataset into features (X) and labels (y)
const X = encodedData.map(row => row.slice(0, -categories['club'].length)); // Features excluding club
const y = encodedData.map(row => row.slice(-categories['club'].length)); // Labels (one-hot encoded clubs)

// Initialize the KNN classifier
const knn = new KNN(X, y, { k: 3 }); // You can change k to a value that fits your needs

// Predict a new instance
const newInstance = oneHotEncode([{
  distance: 150,
  surface: "Fairway",
  slope: "Uphill",
  pinElevation: "Neutral",
  wind: "→",
  lie: "flat"
}], categories);

const prediction = knn.predict(newInstance);
