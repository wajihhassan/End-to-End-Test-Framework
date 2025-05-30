import { expect } from '@playwright/test'
export class NavigationPage {
    constructor (page) {
        this.page = page

        this.basketCounter = page.locator ('[data-qa="header-basket-count"]')
        this.gotoCheckoutButton = page.locator ('[data-qa="desktop-nav-link"]:has-text("Checkout")')
    }

    getBasketCount = async () => {

        await this.basketCounter.waitFor({ state: 'visible' })
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)

    }

    async gotoCheckout(){
        await this.gotoCheckoutButton.waitFor({ state: 'visible' })
        await this.gotoCheckoutButton.click()
        await this.page.waitForURL('/basket')
        await this.page.pause()
    }
}