//  Langkah 1
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

const BASE_URL = 'https://belajar-bareng.onrender.com';

// Langkah 2
describe('Fitur Login', function () {
  let driver;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    await driver.get(BASE_URL);
    await driver.wait(until.elementLocated(By.css('[data-testid="username-input"]')), 60000);
  });

  afterEach(async function () {
    await driver.quit();
  });

  // Langkah 3
  it('Login berhasil dengan username dan password valid', async function () {
    // Element
    const inputUsername = await driver.findElement(By.css('[data-testid="username-input"]'));
    const inputPassword = await driver.findElement(By.css('[data-testid="password-input"]'));
    const buttonLogin = await driver.findElement(By.css('[data-testid="login-button"]'));

    // Action
    await inputUsername.sendKeys('admin');
    await inputPassword.sendKeys('admin');
    await buttonLogin.click();

    // Assertion 1: users
    await driver.wait(until.urlContains('/users'), 15000);
    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, `${BASE_URL}/users`);

    // Assertion 2: List Users
    const pageTitle = await driver.wait(until.elementLocated(By.xpath("//h2[text()='List Users']")), 15000);
    assert.strictEqual(await pageTitle.getText(), 'List Users');

    // Assertion 3: tombol Add 
    const buttonAdd = await driver.findElement(By.css('[data-testid="add-button"]'));
    assert.strictEqual(await buttonAdd.isDisplayed(), true);
  });

}); 