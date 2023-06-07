const { test } = require('@playwright/test');
const { loginPage } = require('../page-objects/loginPage.js');

let login;
let context;
let page;

test.beforeAll(async function ({ browser }) {
    context = await browser.newContext();
    await context.tracing.start({ screenshots: true, snapshots: true });
    page = await context.newPage();
    login = new loginPage(page);
});

test.afterAll(async function () {
    await context.tracing.stop({ path: 'trace/login.zip' });
});

test.beforeEach(async function () {
    await login.goToPage('https://www.webdriveruniversity.com/Login-Portal/index.html?');
});

test.describe('L-001 - Login Page - Succesful Login', function () {
    test('TC-001 - Can login successfully with valid username and password', async function () {
        login.validateSuccessfulLogin();
        await login.enterUsername('webdriver');
        await login.enterPassword('webdriver123');
        await login.clickLoginButton();
    })
})

test.describe('L-002 - Login Page - Failed Login', function () {
    test('TC-001 - Can login unsuccessfully with invalid username and password', async function () {
        login.validateFailedLogin();
        await login.enterUsername('incorrectUsername');
        await login.enterPassword('password123');
        await login.clickLoginButton();
    })

    test('TC-002 - Can login unsuccessfully with valid username but invalid password', async function () {
        login.validateFailedLogin();
        await login.enterUsername('webdriver');
        await login.enterPassword('password123');
        await login.clickLoginButton();
    })
})