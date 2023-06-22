class OrdersPage 
{
    constructor(page)
    {
        this.page = page;
        this.ordersBtn = page.locator("[routerlink*='myorders']").last();
        this.rows = page.locator("tbody tr");
    }

    async clickOrdersBtn(){
       await this.ordersBtn.click();
       await this.page.locator("tbody tr").first().waitFor();
    }

    async clickViewBtn(orderId){{

        const rowsCount = await this.rows.count();
    
        for (let i = 0; i < rowsCount; i++) {
            let orderIdTable = await this.rows.nth(i).locator("th").textContent();
            
            if(orderId.includes(orderIdTable)){
                await this.rows.nth(i).locator("button").first().click();
                await this.page.locator(".email-title").waitFor();
                break;
            }
        }
    
    }}
}
module.exports = {OrdersPage};