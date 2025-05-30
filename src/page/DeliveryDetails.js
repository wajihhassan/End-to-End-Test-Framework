
import { expect } from '@playwright/test'

export class DeliveryDetails {

    constructor(page){
        this.page = page

        this.firstNameInput = page.getByPlaceholder('First name')
        this.lastNameInput = page.getByPlaceholder('Last name')
        this.streetInput = page.getByPlaceholder('Street')
        this.postCodeInput = page.getByPlaceholder('Post code')
        this.cityInput = page.getByPlaceholder('City')
        this.dropDownCountry = page.locator ('[data-qa="country-dropdown"]')
        this.saveAddressButton = page.getByRole ( 'button', { name: 'Save address for next time' })
        this.continueToPaymentButton = page.getByRole ( 'button', { name: 'Continue to payment' })
        this.saveAddressContainer = page.locator ('[data-qa="saved-address-container"]')
        this.saveContainerInputValues = page.locator ('[data-qa="saved-address-container"]')
        this.savedContainerFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedContainerLastName = page.locator ('[data-qa="saved-address-lastName"]')
        this.savedContainerStreetName = page.locator ('[data-qa="saved-address-street"]')
        this.savedContainerPostCode = page.locator ('[data-qa="saved-address-postcode"]')
        this.savedContainerCityName = page.locator ('[data-qa="saved-address-city"]')
        this.savedContainerCountryName = page.locator ('[data-qa="saved-address-country"]')
    }
        
    async fillDeliveryDetails (userAddress) {

        await this.firstNameInput.waitFor({ state: 'visible' })
        await this.firstNameInput.fill(userAddress.firstName)

        await this.lastNameInput.waitFor({ state: 'visible' })
        await this.lastNameInput.fill(userAddress.lastName)
        
        await this.streetInput.waitFor({ state: 'visible' })
        await this.streetInput.fill(userAddress.street)
        
        await this.postCodeInput.waitFor({ state: 'visible' })
        await this.postCodeInput.fill(userAddress.postCode)
        
        await this.cityInput.waitFor({ state: 'visible' })
        await this.cityInput.fill(userAddress.city)

        // Select the country from the dropdown
        await this.dropDownCountry.waitFor({ state: 'visible' })
        await this.dropDownCountry.selectOption({ label: 'Pakistan' })
        //await this.page.pause()

    }

    async saveDetails () {
        await this.saveAddressButton.waitFor({ state: 'visible' })
        const saveAddresCountBefore = await this.saveAddressContainer.count()

        // Click the save address button
        await this.saveAddressButton.click()

        
        await this.saveAddressContainer.waitFor({ state: 'visible' })
        expect(await this.saveAddressContainer.count()).toBe(saveAddresCountBefore + 1)

        await this.savedContainerFirstName.waitFor({ state: 'visible' })
        expect(await this.savedContainerFirstName.innerText()).toBe(await this.firstNameInput.inputValue())

        await this.savedContainerLastName.waitFor({ state: 'visible' })
        expect(await this.savedContainerLastName.innerText()).toBe(await this.lastNameInput.inputValue())

        await this.savedContainerStreetName.waitFor({ state: 'visible' })
        expect(await this.savedContainerStreetName.innerText()).toBe(await this.streetInput.inputValue())

        await this.savedContainerPostCode.waitFor({ state: 'visible' })
        expect(await this.savedContainerPostCode.innerText()).toBe(await this.postCodeInput.inputValue())

        await this.savedContainerCityName.waitFor({ state: 'visible' })
        expect(await this.savedContainerCityName.innerText()).toBe(await this.cityInput.inputValue())

        await this.savedContainerCityName.waitFor({ state: 'visible' })
        expect(await this.savedContainerCityName.innerText()).toBe(await this.cityInput.inputValue())

        await this.page.pause()
    }

}
