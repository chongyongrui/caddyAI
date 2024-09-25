const reverseOneHotEncode = (oneHotVector, categories) => {
    const index = oneHotVector.indexOf(1);
    return categories[index];
  };
  
const predictedClub = reverseOneHotEncode(prediction[0], categories['club']);
console.log(`Predicted Club: ${predictedClub}`);
