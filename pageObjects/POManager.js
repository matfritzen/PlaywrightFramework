const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderDetailsPage } = require("./OrderDetailsPage");
const { OrdersPage } = require("./OrdersPage");
const { ViewPage } = require("./ViewPage");

class POManager 
{

    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderDetailsPage = new OrderDetailsPage(page);
        this.ordersPage = new OrdersPage(page);
        this.viewPage = new ViewPage(page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }
    
    getCartPage()
    {
        return this.cartPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getOrderDetailsPage()
    {
        return this.orderDetailsPage;
    }

    getOrdersPage()
    {
        return this.ordersPage;
    }

    getViewPage()
    {
        return this.viewPage;
    }
}
module.exports = {POManager};