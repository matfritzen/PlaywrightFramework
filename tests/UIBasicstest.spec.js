const {test, expect} = require('@playwright/test');

let text;

test('@Web Browser Context Playwright test',async ({browser})=>
{
    //chrome - plugins/cookies
    // the newContext() method is to open a new browser without cookes/plugins like anonymous.
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a")

    await username.type("matheus");
    await password.type("learning");
    await signInBtn.click();
    
    // console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await username.fill("rahulshettyacademy")
    
    await Promise.all(
        [
            page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop"),
            signInBtn.click(),
        ]
        )

    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});

test('@Web UI Controls',async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const userCheckbox = page.locator(".radiotextsty").last();
    const termsAndConditionsCheckbox = page.locator("#terms");
    const documeentLink = page.locator("[href*='documents-request']")

    await dropdown.selectOption("consult");
    await userCheckbox.click();
    await page.locator("#okayBtn").click();
    await expect(userCheckbox).toBeChecked();

    await termsAndConditionsCheckbox.check();
    await expect(termsAndConditionsCheckbox).toBeChecked();
    await termsAndConditionsCheckbox.uncheck();
    expect(await termsAndConditionsCheckbox.isChecked()).toBeFalsy();

    await expect(documeentLink).toHaveAttribute("class", "blinkingText")
    

    // await page.pause();


});

test('@Web Child Windows handle',async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const documeentLink = page.locator("[href*='documents-request']")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documeentLink.click()
    ]);

    text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0];
    console.log(domain)
    
    await username.type(domain)
    // await page.pause();
});