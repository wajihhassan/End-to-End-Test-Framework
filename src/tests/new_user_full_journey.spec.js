import { test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid"
import { ProductPage } from "../page/ProductPage.js"
import { NavigationPage } from "../page/NavigationPage.js"
import { CheckoutPage } from "../page/CheckoutPage.js"
import { LoginPage } from "../page/LoginPage.js"
import { SignupPage } from "../page/SignupPage.js"
import { DeliveryDetails } from "../page/DeliveryDetails.js"
import { deliveryDetails as userAddress } from "../Data/deliveryDetails.js"
import { PaymentPage } from "../page/PaymentPage.js"
import { paymentDetails as userPaymentDetails } from "../Data/paymentDetails.js"

test('End to end user journey',async ({page})=>{

    const productPage = new ProductPage(page)
    await productPage.visit()
    await productPage.sortProductsByCheapest()
    await productPage.addToBasket(0)
    await productPage.addToBasket(1)
    await productPage.addToBasket(2)

    const navigationPage = new NavigationPage(page)
    navigationPage.gotoCheckout()

    const checkoutPage = new CheckoutPage(page)
    await checkoutPage.removeCheapestItemFromCart()    
    await checkoutPage.continueToCheckout()

    const loginPage = new LoginPage(page)
    await loginPage.continueToSignupPage()


    
    const signupPage = new SignupPage(page)
    await signupPage.signupAsNewUser(uuidv4() + "@example.com", uuidv4())
    
    const deliveryDetail = new DeliveryDetails(page)
    await deliveryDetail.fillDeliveryDetails(userAddress)
    await deliveryDetail.saveDetails()
    await deliveryDetail.continueToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(userPaymentDetails)
    await paymentPage.pay()


    await page.pause()
})