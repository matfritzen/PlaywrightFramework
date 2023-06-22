const { test, request, expect } = require("@playwright/test");
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = {userEmail:"matheus-fritzen@hotmail.com",userPassword:"Test@123"};
const orderPayload = {orders:[{country:"Brazil",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]};
const fakePayloadOrders = {data:[],message:"No Orders"};

let responseOrder;

test.beforeAll(async ()=>
{

    // Login API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    responseOrder = await apiUtils.createOrder(orderPayload);


})

test.beforeEach(()=>
{


})

test('@API Intercepting Response API Test', async ({page}) => 
{

    page.addInitScript(value => {

        window.localStorage.setItem('token',value)


    },responseOrder.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63e2f196568c3e9fb10f6e5a",
    async route=>
    {
        // you have to do this setup before you make the action that will trigger the API request
        //intercepting response
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakePayloadOrders); // The JSON.stringify is a workaroung because the body is not able to read the fakePayloadOrders correctly
        route.fulfill(
            {
                response,
                body
            }
        ); // fulfill method send the response to browser

    }
    )

    await page.locator("[routerlink*='myorders']").last().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63e2f196568c3e9fb10f6e5a"); // This step is being used a workaround because the fetch() method of the line 42 is not working as expected.
    await page.locator(".mt-4").waitFor();
    // expect(page.locator(".mt-4")).toHaveText(" You have No Orders to show at this time.");
});