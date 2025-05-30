import { expect } from '@playwright/test'

export class CheckoutPage {

    constructor(page){
        this.page = page
        
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator ('[data-qa="basket-item-price"]')
        this.basketRemoveButton = page.locator ('[data-qa="basket-card-remove-item"]')
        this.checkoutButton = page.locator ('[data-qa="continue-to-checkout"]')
    }

    async removeCheapestItemFromCart(){

        await this.basketCards.first().waitFor({ state: 'visible' })
        const cardCountBeforeRemove = await this.basketCards.count()
        //await this.page.pause()
        await this.basketItemPrice.first().waitFor({ state: 'visible' })
        const allPricesText = await this.basketItemPrice.allInnerTexts()
        
        const justNumbers = allPricesText.map((element)=>{
            element.replace("$","")
            return parseInt(element)
        })

        const smallestPrice = Math.min(...justNumbers)
        const indexofCheapestItem = justNumbers.indexOf(smallestPrice)
        const specificRemoveButton = this.basketRemoveButton.nth(indexofCheapestItem)   
        await specificRemoveButton.waitFor({ state: 'visible' })
        await specificRemoveButton.click()

        await expect(this.basketCards).toHaveCount(cardCountBeforeRemove - 1)
        //expect(cardCountBeforeRemove).toBeGreaterThan(cardCountAfterRemove)
        

        //console.log(justNumbers)

    }

    async continueToCheckout()
    {
        await this.checkoutButton.waitFor({ state: 'visible' })
        await this.checkoutButton.click()
        await this.page.waitForURL(/\/login/)
        //await this.page.pause()
    }

}