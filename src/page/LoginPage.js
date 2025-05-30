

export class LoginPage{

    constructor(page){
        this.page = page

        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Password')
        this.loginButton = page.getByRole('button', { name: 'login' })
        this.registerButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    async continueToSignupPage(){
        await this.registerButton.waitFor({ state: 'visible' })
        await this.registerButton.click()
        await this.page.waitForURL(/\/signup/)
        //await this.page.pause()
    }

}