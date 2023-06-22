class DashboardPage{


    constructor(page)
    {
        this.page = page;
        this.products = page.locator('.card-body');
        this.titles = page.locator('.card-body b');
        this.cartButton = page.locator('[routerlink*="cart"]');

    }

    async selectProduct(productName)
    {
        const count = await this.products.count();

        for(let i = 0; i < count; i++)
        {
            if(await this.products.nth(i).locator('b').textContent() === productName)
            {
               await this.products.nth(i).locator("text= Add To Cart").click();
               break;
            }
        }
    }

    async clickCartButton()
    {
        await this.cartButton.click();
        await this.page.locator("div li").first().waitFor();
    }

}

module.exports = {DashboardPage};