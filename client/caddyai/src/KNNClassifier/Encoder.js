const oneHotEncode = (data, categories) => {
  const encoded = data.map((item) => {
    const row = [];

    Object.keys(item).forEach((key) => {
      if (categories[key]) {
        const encoding = categories[key].map((val) => (val === item[key] ? 1 : 0));
        row.push(...encoding);
      } else {
        row.push(item[key]);
      }
    });

    return row;
  });

  return encoded;
};

// Example usage
const categories = {
  surface: ["Fairway", "Rough", "Thick Rough", "Sand", "Dirt"],
  slope: ["Uphill", "Downhill", "Flat"],
  pinElevation: ["Neutral", "Above", "Below"],
  wind: ["→", "←", "↑", "↓", "negligible"],
  lie: ["flat", "slope right", "slope left", "slope back", "slope forward"],
  club: ["Driver", "3 wood", "5 wood", "7 wood", "3 hybrid", "4 hybrid", "5 hybrid", "6 hybrid", "3 iron", "4 iron", "5 iron", "6 iron", "7 iron", "8 iron", "9 iron", "G wedge", "S wedge", "L wedge"]
};
