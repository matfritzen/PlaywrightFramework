const {test, expect} = require('@playwright/test');
const {customtest} = require("../tests/utils/test-base");
const { POManager } = require('../pageObjects/POManager');
// Json -> string -> js object
const dataSet = JSON.parse(JSON.stringify(require("../tests/utils/placeorderTestData.json")));


for(const data of dataSet){

test(`@Web Client App login for ${data.productName}`, async ({page}) => 
{

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);

    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.selectProduct(data.productName);
    await dashboardPage.clickCartButton();

    const cartPage = poManager.getCartPage();

    await cartPage.verifyProductIsDisplayed(data.productName);
    await cartPage.clickCheckoutBtn();


    const checkoutPage = poManager.getCheckoutPage();

    await checkoutPage.selectCountry("India");
    await checkoutPage.clickPlaceOrderBtn();

    const orderDetailsPage = poManager.getOrderDetailsPage();

    await expect(orderDetailsPage.orderTitle).toHaveText(" Thankyou for the order. ");

    let orderId = await orderDetailsPage.orderId.textContent();

    const ordersPage = poManager.getOrdersPage();

    await ordersPage.clickOrdersBtn();
    await ordersPage.clickViewBtn(orderId);

    const viewPage = poManager.getViewPage();


    const orderIdDetails = await viewPage.orderIdDetails.textContent();

    expect(await viewPage.viewTitle.isVisible()).toBeTruthy();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();


})

customtest(`@Web Using Custom Test to test according to ${data.productName} `, async ({page, testDataForOrder}) => 
{

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();

    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.selectProduct(testDataForOrder.productName);
    await dashboardPage.clickCartButton();

    const cartPage = poManager.getCartPage();

    await cartPage.verifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.clickCheckoutBtn();
})

}