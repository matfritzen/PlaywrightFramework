const {test, expect} = require('@playwright/test');


test('@Web UI Assignment', async ({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/client/");
    
    const username = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("#login");

    const products = page.locator('.card-body');
    const titles = page.locator('.card-body b');
    const productName = 'zara coat 3';
    const cartButton = page.locator('[routerlink*="cart"]');

    const email = "matheus-fritzen@hotmail.com";
    const psw = "Test@123";


    await username.type(email);
    await password.type(psw);
    await loginBtn.click();

    // await expect(productNames.first()).toBeVisible();
    await page.waitForLoadState('networkidle');
    await expect(titles.first()).toHaveText('zara coat 3');
    // console.log(await productNames.allTextContents());

    const count = await products.count();

    for(let i = 0; i < count; i++)
    {
        if(await products.nth(i).locator('b').textContent() === productName)
        {
           await products.nth(i).locator("text= Add To Cart").click();
           break;
        }
    }

    await cartButton.click();
    await page.locator("div li").first().waitFor(); // waitFor() method is used because the isVisible() method doesn't have the auto-waiting functionality

    const bool = await page.locator("h3:has-text('"+productName+"')").isVisible();    
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").type("ind", {delay:100});
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    let optionsCount = await dropdown.locator("button").count();

    for (let i = 0; i < optionsCount; i++) {

        let text = await dropdown.locator("button").nth(i).textContent();

        if(text.trim() === "India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
        
    }
    await expect(page.locator(".user__name [type='text']").nth(0)).toHaveText(email);
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    let orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    await page.locator("[routerlink*='myorders']").last().click();
    await page.locator("tbody tr").first().waitFor();


    const rows = await page.locator("tbody tr");
    const rowsCount = await page.locator("tbody tr").count();

    for (let i = 0; i < rowsCount; i++) {
        let orderIdTable = await rows.nth(i).locator("th").textContent();
        
        if(orderId.includes(orderIdTable)){
            await rows.nth(i).locator("button").first().click();
            await page.locator(".email-title").waitFor();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text.-main").textContent();

    expect(await page.locator(".email-title").isVisible()).toBeTruthy();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();


})