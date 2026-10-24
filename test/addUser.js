const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const BASE_URL = 'https://belajar-bareng.onrender.com';

function randomLetters(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
  return result;
}


describe('Fitur Add User', function () {
  let driver;

  
  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    await driver.get(BASE_URL);
    await driver.wait(until.elementLocated(By.css('[data-testid="username-input"]')), 60000);

    await driver.findElement(By.css('[data-testid="username-input"]')).sendKeys('admin');
    await driver.findElement(By.css('[data-testid="password-input"]')).sendKeys('admin');
    await driver.findElement(By.css('[data-testid="login-button"]')).click();
    await driver.wait(until.urlContains('/users'), 15000);
  });

  //  tutup browser
  after(async function () {
    await driver.quit();
  });


  it('Berhasil menambahkan user baru', async function () {
    const newUsername = 'qa' + randomLetters(8); // contoh: qaxkdmwpre
    const newAge = '25';

    // Action: buka halaman Add
    const buttonAdd = await driver.wait(until.elementLocated(By.css('[data-testid="add-button"]')), 15000);
    await buttonAdd.click();
    await driver.wait(until.urlContains('/add'), 15000);

    // Assertion 1: Add Users
    const pageTitle = await driver.wait(until.elementLocated(By.xpath("//h2[text()='Add Users']")), 15000);
    assert.strictEqual(await pageTitle.getText(), 'Add Users');

    // Action: isi form lalu submit
    await driver.findElement(By.css('[data-testid="username-input"]')).sendKeys(newUsername);
    await driver.findElement(By.css('[data-testid="age-input"]')).sendKeys(newAge);
    await driver.findElement(By.css('[data-testid="submit-button"]')).click();

    // Assertion 2: notifikasi sukses muncul
    const toastSuccess = await driver.wait(
      until.elementLocated(By.css('[data-testid="toast-item-success-added"]')),
      15000
    );
    await driver.wait(until.elementIsVisible(toastSuccess), 15000); 
    assert.strictEqual(await toastSuccess.isDisplayed(), true);

    // Assertion 3:  kosong lagi setelah submit
    const usernameValue = await driver.findElement(By.css('[data-testid="username-input"]')).getAttribute('value');
    assert.strictEqual(usernameValue, '');

    // Assertion 4: user baru 
    await driver.findElement(By.css('[data-testid="list-button"]')).click();
    await driver.wait(until.urlContains('/users'), 15000);
    const newUserCard = await driver.wait(
      until.elementLocated(By.xpath(`//h3[text()='${newUsername}']`)),
      15000
    );
    assert.strictEqual(await newUserCard.isDisplayed(), true);
  });

}); 