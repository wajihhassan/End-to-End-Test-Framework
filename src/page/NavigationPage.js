import { expect } from '@playwright/test'
import { isDesktopViewPort } from '../utils/isDesktopViewPort'

export class NavigationPage {
    constructor (page) {
        this.page = page

        this.basketCounter = page.locator ('[data-qa="header-basket-count"]')
        //this.gotoCheckoutButton = page.locator ('[data-qa="desktop-nav-link"]:has-text("Checkout")')
        this.gotoCheckoutButton = page.getByRole ('link', { name: 'Checkout' })
        this.burgerButton = page.locator ('[data-qa="burger-button"]')
    }

    getBasketCount = async () => {

        await this.basketCounter.waitFor({ state: 'visible' })
        const text = await this.basketCounter.innerText()
        return parseInt(text, 10)

    }

    async gotoCheckout(){

        if(!await isDesktopViewPort(this.page)){

            await this.burgerButton.waitFor({ state: 'visible' })
            await this.burgerButton.click()

        }

        await this.gotoCheckoutButton.waitFor({ state: 'visible' })
        await this.gotoCheckoutButton.click()
        await this.page.waitForURL('/basket')
        await this.page.pause()
    }
}