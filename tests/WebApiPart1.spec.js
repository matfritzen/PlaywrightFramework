const { test, request, expect } = require("@playwright/test");
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = {userEmail:"matheus-fritzen@hotmail.com",userPassword:"Test@123"};
const orderPayload = {orders:[{country:"Brazil",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};
let response;

test.beforeAll(async ()=>
{

    // Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);


})

test.beforeEach(()=>
{


})

test('@Web Client App login', async ({page}) => 
{

    page.addInitScript(value => {

        window.localStorage.setItem('token',value)


    },response.token);

    await page.goto("https://rahulshettyacademy.com/client/");


    await page.locator("[routerlink*='myorders']").last().click();
    await page.locator("tbody tr").first().waitFor();


    const rows = await page.locator("tbody tr");
    const rowsCount = await page.locator("tbody tr").count();

    for (let i = 0; i < rowsCount; i++) {
        let orderIdTable = await rows.nth(i).locator("th").textContent();
        
        if(response.orderId.includes(orderIdTable)){
            await rows.nth(i).locator("button").first().click();
            await page.locator(".email-title").waitFor();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text.-main").textContent();

    expect(await page.locator(".email-title").isVisible()).toBeTruthy();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});