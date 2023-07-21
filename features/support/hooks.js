const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");
const { POManager } = require('../../pageObjects/POManager');
const playwright = require('@playwright/test');

Before(async function () {

    const browser = await playwright.chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);

})

// This method below is when the user need to setup a Before hook according to the TAG used in the scenario
// Before( {tags: "@Regression or @Validation"}, async function () {

//     const browser = await playwright.chromium.launch({
//         headless: false
//     });
//     const context = await browser.newContext();
//     this.page = await context.newPage();
//     this.poManager = new POManager(this.page);

// })

BeforeStep(function () {

})

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'features/screenshots/failed-screenshot1.png' });
    }
})


After(function () {

    console.log("The browser close by default");
})