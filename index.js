import { format } from "date-fns";
import { chromium } from "playwright";

import "dotenv/config";

import { sendMessage } from "./utils/telegram.js";

const T_CHAT = process.env.T_CHAT;
const PERSONAL_DATA = process.env.PERSONAL_DATA || ''

const [PKK, FIRST_NAME, LAST_NAME] = PERSONAL_DATA.split(',');

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
  
    console.log("Opening info-car...");
  
    await page.goto(
      "https://info-car.pl/new/prawo-jazdy/sprawdz-status-prawa-jazdy"
    );
  
    await page.locator("id=cookiescript_accept").click();
  
    await page.getByLabel("Wybierz po czym chcesz wyszukać").fill("PKK");
    await page.press("text=PKK", "Enter");
  
    await page.getByPlaceholder("Wpisz numer pkk").fill(PKK);
    await page.getByPlaceholder("Wpisz imię").fill(FIRST_NAME);
    await page.getByPlaceholder("Wpisz nazwisko").fill(LAST_NAME);
  
    await page.locator("#regulations").click();
  
    await page.getByRole("button", { name: "Sprawdź" }).click();
  
    const element = page.getByText("Dokument do odbioru w urzędzie");
  
    if ((await element.getAttribute("class")) === "text-inactive") {
      console.log("Document is ready! Sending message to Telegram...");
  
      const message = `*Scan time: ${format(
        new Date(),
        "dd/MM/yyyy HH:mm:ss"
      )}*\n\n${FIRST_NAME} ${LAST_NAME}: Document is ready!`;
  
      await sendMessage(T_CHAT, message);
    }
  
    await browser.close();
  } catch (error) {
    console.error('Scan failed:', error);

    const message = `*Scan time: ${format(
      new Date(),
      "dd/MM/yyyy HH:mm:ss"
    )}*\n\n${FIRST_NAME} ${LAST_NAME}: Scan failed!`;

    await sendMessage(T_CHAT, message);
  }
})();
