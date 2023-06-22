class LoginPage{


    constructor(page)
    {
        this.page = page;
        this.usernanme = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginBtn = page.locator("#login");
    }

    async validLogin(username, password){
        await this.usernanme.fill(username);
        await this.password.type(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
}

module.exports = {LoginPage};