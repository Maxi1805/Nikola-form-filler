import express from "express";
import puppeteer from "puppeteer";
import bodyParser from "body-parser";
import cors from "cors";

async function fillTextFields(page, { name, phone, email, address }) {
  await page.type('#input_1_1_3', name);
  await page.type('#input_1_5', phone);
  await page.type('#input_1_2', email);

  await new Promise((resolve) => setTimeout(resolve, 5000));
  await page.evaluate(() => (document.getElementById('input_1_20').value = ''));
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await page.type('#input_1_20', address);
  await page.keyboard.press('Enter');
}

async function setSliderValue(page, sliderValue) {
  await page.waitForSelector('.noUi-handle', { visible: true });
  await page.evaluate((value) => {
    const slider = document.querySelector('.noUi-target');
    if (slider && slider.noUiSlider) {
      slider.noUiSlider.set(value);
    }
  }, sliderValue);
}

async function selectOptions(page, { origin, typeOfInstallation, inclination, material }) {
  await page.select('#input_1_34', origin);
  await page.select('#input_1_24', typeOfInstallation);

  if (typeOfInstallation === 'Techo') {
    await page.select('#input_1_25', inclination);
  }
  if (typeOfInstallation !== 'Suelo') {
    await page.select('#input_1_26', material);
  }
}

async function uploadFile(page, filepath) {
  const fileInput = await page.$('#input_1_27');
  await fileInput.uploadFile(filepath);
}

async function fillForm(data) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://nikola.cl/empecemos/', { waitUntil: 'domcontentloaded' });
  await page.setViewport({ width: 1280, height: 800 });

  await page.waitForFunction(() => {
    const input = document.querySelector('#gform_submit_button_1');
    return input && !input.disabled && input.offsetParent !== null;
  });

  await fillTextFields(page, data);
  await setSliderValue(page, data.sliderValue);
  await selectOptions(page, data);
  if (data.filepath) {
    await uploadFile(page, data.filepath);
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  await page.click('#gform_submit_button_1');

  await new Promise(resolve => setTimeout(resolve, 3000));

  await browser.close();
}

async function automateProcess(data) {
  for (const entry of data) {
    await fillForm(entry);
  }
}

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/automate", async (req, res) => {
  const data = req.body;
  try {
    await automateProcess(data);
    res.status(200).json({ message: "Automatización completada" });
  } catch (error) {
    console.error("Error en la automatización:", error);
    res.status(500).json({ message: "Error en la automatización" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
