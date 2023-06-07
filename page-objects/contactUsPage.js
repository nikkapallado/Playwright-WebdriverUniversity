const random = require('random-string-generator');
const { expect } = require('@playwright/test');

exports.contactUsPage = class contactUsPage {
    constructor(page){
        this.page = page;
        this.firstName_input = page.getByPlaceholder('First Name');
        this.lastName_input = page.getByPlaceholder('Last Name');
        this.email_input = page.getByPlaceholder('Email Address');
        this.message_input = page.getByPlaceholder('Comments');
        this.submit_button = page.locator('input[type="submit"]');
        this.submissionMessage = page.locator('div[id="contact_reply"] > h1');
    }

    async goToPage(url){
        await this.page.goto(url);
    }

    async enterUniqueFirstName(){
        await this.firstName_input.fill(`AutoFN ${random(5)}`);
    }

    async enterUniqueLastName(){
        await this.lastName_input.fill(`AutoLN ${random(5)}`);
    }

    async enterUniqueEmail(){
        await this.email_input.fill(`${random(10)}@gmail.com`);
    }

    async enterUniqueMessage(){
        await this.message_input.fill(`Hello World ${random(20)}`);
    }

    async enterSpecificFirstName(firstName){
        await this.firstName_input.fill(firstName);
    }

    async enterSpecificLastName(lastName){
        await this.lastName_input.fill(lastName);
    }

    async enterSpecificEmail(email){
        await this.email_input.fill(email);
    }

    async enterSpecificMessage(message){
        await this.message_input.fill(message);
    }

    async clickSubmit(){
        await this.submit_button.click();
    }

    async waitAndValidateSubmissionMessage(){
        await expect(this.submissionMessage).toHaveText('Thank You for your Message!');
    }
}