import { expect } from "@playwright/test"
export class PaymentPage {
    constructor(page) {
        this.page = page
        
        this.grabDiscountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                    .locator('[data-qa="discount-code"]')
        this.discountInput = page.locator('[data-qa="discount-code-input"]')
        this.submitDiscountCodeButton = page.getByRole( 'Button' ,{name:'Submit discount'})
        this.discountMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalPrice = page.locator('[data-qa="total-value"]')
        this.totalPriceAfterDiscount = page.locator ('[data-qa="total-with-discount-value"]')
        this.cardOwnerNameInput = page.getByPlaceholder('Credit card owner')
        this.cardNumberInput = page.getByPlaceholder('Credit card number')
        this.cardExpiryInput = page.getByPlaceholder('Valid until')
        this.cardCVC = page.getByPlaceholder('Credit card CVC')
        this.payButton = page.getByRole( 'Button' ,{name:'Pay'})
    }
    async activateDiscount ()
    {
        await this.grabDiscountCode.waitFor({ state: 'visible' })
        const discountCode = await this.grabDiscountCode.innerText()
        //Option 1 Laggy input
        await this.discountInput.fill(discountCode)
        await expect(this.discountInput).toHaveValue(discountCode)
        
        //Option 2 Laggy input
        /*await this.discountInput.focus()
        await this.page.keyboard.type(discountCode, { delay: 500})
        expect(await this.grabDiscountCode.innerText()).toBe(discountCode)*/

        await expect(this.discountMessage).toBeHidden()

        await this.submitDiscountCodeButton.waitFor()

        let priceBeforeDiscount = await this.totalPrice.innerText()
        priceBeforeDiscount = parseInt(priceBeforeDiscount.replace( '$' , '' ), 10)

    
        await this.submitDiscountCodeButton.click()

        await expect(this.discountMessage).toBeVisible()

        let priceAfterDiscount = await this.totalPriceAfterDiscount.innerText()
        priceAfterDiscount = parseInt(priceAfterDiscount.replace( '$' , '' ), 10)
        expect(priceAfterDiscount).toBeLessThan(priceBeforeDiscount)

    }

    async fillPaymentDetails (userPaymentDetails){
        await this.cardOwnerNameInput.waitFor({ state: 'visible' })
        await this.cardOwnerNameInput.fill(userPaymentDetails.creditCardOwner)

        await this.cardNumberInput.waitFor({ state: 'visible' })
        await this.cardNumberInput.fill(userPaymentDetails.creditCardNumber)

        await this.cardExpiryInput.waitFor({ state: 'visible' })
        await this.cardExpiryInput.fill(userPaymentDetails.validUntil)

        await this.cardCVC.waitFor({ state: 'visible' })
        await this.cardCVC.fill(userPaymentDetails.cvc)

    }

    async pay() {
        await this.payButton.waitFor({ state: 'visible' })
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/)
    }

}
