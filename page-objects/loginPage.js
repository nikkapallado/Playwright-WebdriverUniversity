const { expect } = require('@playwright/test');

exports.loginPage = class loginPage {
    constructor(page) {
        this.page = page;
        this.username_input = page.getByPlaceholder('Username');
        this.password_input = page.getByPlaceholder('Password');
        this.login_button = page.getByRole('button');
    };

    async goToPage(url) {
        await this.page.goto(url);
    }

    async enterUsername(username) {
        await this.username_input.type(username, {delay: 15});
    }

    async enterPassword(password) {
        await this.password_input.type(password, {delay: 15});
    }

    async clickLoginButton() {
        await this.login_button.click();
    }

    async validateSuccessfulLogin() {
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('validation succeeded');
            await dialog.dismiss();
        })
    }

    async validateFailedLogin() {
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('validation failed');
            await dialog.dismiss();
        })
    }
}
