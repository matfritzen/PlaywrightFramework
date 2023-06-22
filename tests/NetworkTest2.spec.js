const { test, request, expect } = require("@playwright/test");
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = {userEmail:"matheus@gmail.com",userPassword:"Test@123"};
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

test('@API Intercepting Request API Test', async ({page}) => 
{

    page.addInitScript(value => {

        window.localStorage.setItem('token',value)


    },responseOrder.token);

    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator("[routerlink*='myorders']").last().click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64791286568c3e9fb17cde38",
    route=> route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64790e7b568c3e9fb17cdcfe"}))

    await page.locator("button:has-text('View')").first().click();
    await page.pause();
    
});