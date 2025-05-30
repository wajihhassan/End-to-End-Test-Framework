export class SignupPage{

    constructor(page){
        this.page = page

        this.emailInput = page.getByPlaceholder('E-Mail')
        this.passwordInput = page.getByPlaceholder('Password')
        this.registerButton = page.getByRole('button', { name: /Register/i })
    }

    signupAsNewUser = async (email, password) => {
        await this.emailInput.waitFor({ state: 'visible' })
        await this.emailInput.fill(email)

        await this.passwordInput.waitFor({ state: 'visible' })
        await this.passwordInput.fill(password)

        await this.registerButton.waitFor({ state: 'visible' })
        await this.registerButton.click()
        //await this.page.pause()
    }
}