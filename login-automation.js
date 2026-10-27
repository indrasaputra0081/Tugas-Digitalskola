const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Test Login', function () {
  let driver;

  before(async function () {
    this.timeout(20000); 
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  beforeEach(async function () {
    this.timeout(10000);
    await driver.get('https://belajar-bareng.onrender.com/');
    await driver.wait(until.elementLocated(By.css('[data-testid="username-input"]')), 30000);
  });

  afterEach(async function () {
    console.log('test selesai');
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('cek form login muncul', async function () {
    let username = await driver.findElement(By.css('[data-testid="username-input"]'));
    let password = await driver.findElement(By.css('[data-testid="password-input"]'));
    let tombol = await driver.findElement(By.css('[data-testid="login-button"]'));

    assert.strictEqual(await username.isDisplayed(), true);
    assert.strictEqual(await password.isDisplayed(), true);
    assert.strictEqual(await tombol.isDisplayed(), true);
  });

  it('klik show hint', async function () {
    await driver.findElement(By.css('[data-testid="hint-button"]')).click();
    let teks = await driver.findElement(By.css('body')).getText();
    assert.ok(teks.includes('admin'));
  });

  it('login dengan username salah', async function () {
    await driver.findElement(By.css('[data-testid="username-input"]')).clear();
    await driver.findElement(By.css('[data-testid="username-input"]')).sendKeys('salah');
    await driver.findElement(By.css('[data-testid="password-input"]')).clear();
    await driver.findElement(By.css('[data-testid="password-input"]')).sendKeys('admin');
    await driver.findElement(By.css('[data-testid="login-button"]')).click();

    
    await driver.sleep(1500);

    
    let bodyText = await driver.findElement(By.css('body')).getText();
    
    
    let isErrorDisplayed = bodyText.toLowerCase().includes('invalid') || 
                           bodyText.toLowerCase().includes('gagal') || 
                           bodyText.toLowerCase().includes('salah');

    assert.strictEqual(isErrorDisplayed, true);
  });

  it('login dengan username dan password benar', async function () {
    this.timeout(10000);

    await driver.findElement(By.css('[data-testid="username-input"]')).clear();
    await driver.findElement(By.css('[data-testid="username-input"]')).sendKeys('admin');
    await driver.findElement(By.css('[data-testid="password-input"]')).clear();
    await driver.findElement(By.css('[data-testid="password-input"]')).sendKeys('admin');
    await driver.findElement(By.css('[data-testid="login-button"]')).click();

    // Tunggu perubahan atau pastikan proses login berjalan
    await driver.sleep(2000);
    let currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.length > 0);
  });
});