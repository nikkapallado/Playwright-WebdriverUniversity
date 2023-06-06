const { test } = require('@playwright/test');
const { contactUsPage } = require('../page-objects/contactUsPage.js');

let contactUs;
let context;
let page;

test.describe('CU-001 - Contact Us Page - Succesful Submission', function () {
    test.beforeAll(async function ({browser}) {
        context = await browser.newContext();
        await context.tracing.start({ screenshots: true, snapshots: true });
        page = await context.newPage();
        contactUs = new contactUsPage(page);
    });

    test.afterAll(async function () {
        await context.tracing.stop({ path: 'trace/contactUs.zip' });
    });

    test.beforeEach(async function () {
        await contactUs.goToPage('https://www.webdriveruniversity.com/Contact-Us/contactus.html');
    });

    test('TC-001 - Can Submit Successfully Using Unique Data', async function () {
        await contactUs.enterUniqueFirstName();
        await contactUs.enterUniqueLastName();
        await contactUs.enterUniqueEmail();
        await contactUs.enterUniqueMessage();
        await contactUs.clickSubmit();
        await contactUs.waitAndValidateSubmissionMessage();

    })

    test('TC-002 - Can Submit Successfully Using Specific Data', async function () {
        await contactUs.enterSpecificFirstName(`Sarah`);
        await contactUs.enterSpecificLastName(`Woods`);
        await contactUs.enterSpecificEmail(`sarah_woods123@gmail.com`);
        await contactUs.enterSpecificMessage(`How are you today?`);
        await contactUs.clickSubmit();
        await contactUs.waitAndValidateSubmissionMessage();

    })
})