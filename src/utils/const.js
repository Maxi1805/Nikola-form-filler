const requiredColumns = [
  "name",
  "phone",
  "email",
  "address",
  "sliderValue",
  "origin",
  "typeOfInstallation",
  "inclination",
  "material",
];

const validValues = {
  origin: ["Solcor", "Google", "Instagram", "Facebook", "Por recomendación", "Mailing"],
  typeOfInstallation: ["Techo", "Suelo", "Carport"],
  inclination: ["Plano", "Inclinado"],
  material: ["Teja Asfáltica", "Teja Chilena", "Zinc", "Otro"],
};

export { requiredColumns, validValues };