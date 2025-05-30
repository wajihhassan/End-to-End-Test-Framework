import { expect } from '@playwright/test';
import { NavigationPage } from './NavigationPage.js'
export class ProductPage {

    constructor(page){
        this.page = page;

        this.addToBasketButton = page.locator('[data-qa="product-button"]')
        this.sortDropDown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
        await this.page.goto('/');
    }

    addToBasket = async (index) => {
        
        const navigationPage = new NavigationPage(this.page)
        const basketCountBefore = await navigationPage.getBasketCount()
        const specificAddButton = this.addToBasketButton.nth(index)
        await specificAddButton.waitFor({ state: 'visible' })
        await expect(specificAddButton).toHaveText('Add to Basket')
        await specificAddButton.click()
        await expect(specificAddButton).toHaveText('Remove from Basket')
        const basketCountAfter = await navigationPage.getBasketCount()
        expect(basketCountBefore).toBeLessThan(basketCountAfter)
        //console.log(basketCountBefore, basketCountAfter)

    }

    sortProductsByCheapest = async () =>{
        await this.sortDropDown.waitFor({ state: 'visible' })
        await this.productTitle.first().waitFor({ state: 'visible' })

        const productTitlesBeforeSort = await this.productTitle.allInnerTexts()

        await this.sortDropDown.selectOption("price-asc")

        const productTitlesAfterSort = await this.productTitle.allInnerTexts()

        expect(productTitlesBeforeSort).not.toEqual(productTitlesAfterSort)

        //await this.page.pause()

    }
}