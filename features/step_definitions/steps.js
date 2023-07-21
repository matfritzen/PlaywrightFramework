const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const {expect} = require('@playwright/test');
const playwright = require('@playwright/test'); 


Given('a login to Ecommerce application with {string} and {string}', {timeout : 100*1000}, async function (username, password) {

    const loginPage = this.poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(username, password);

  });

  Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const usernameInput = this.page.locator("#username");
    const passwordInput = this.page.locator("[type='password']");
    const signInBtn = this.page.locator("#signInBtn");

    await usernameInput.type(username);
    await passwordInput.type(password);
    await signInBtn.click();

  });

When('Add {string} to Cart', async function (productName) {

    const dashboardPage = this.poManager.getDashboardPage();

    await dashboardPage.selectProduct(productName);
    await dashboardPage.clickCartButton();
  });

Then('Verify {string} is displayed in the Cart', async function (product) {
    const cartPage = this.poManager.getCartPage();

    await cartPage.verifyProductIsDisplayed(product);
    await cartPage.clickCheckoutBtn();
  });

When('Enter valid details and Place the Order', async function () {

    const checkoutPage = this.poManager.getCheckoutPage();

    await checkoutPage.selectCountry("India");
    await checkoutPage.clickPlaceOrderBtn();

  });

Then('Verify order is present in the Order History', async function () {

    const orderDetailsPage = this.poManager.getOrderDetailsPage();

    await expect(orderDetailsPage.orderTitle).toHaveText(" Thankyou for the order. ");

    let orderId = await orderDetailsPage.orderId.textContent();

    const ordersPage = this.poManager.getOrdersPage();

    await ordersPage.clickOrdersBtn();
    await ordersPage.clickViewBtn(orderId);

    const viewPage = this.poManager.getViewPage();


    const orderIdDetails = await viewPage.orderIdDetails.textContent();

    expect(await viewPage.viewTitle.isVisible()).toBeTruthy();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  });


Then('Verify Error message is displayed', async function () {
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
  });2