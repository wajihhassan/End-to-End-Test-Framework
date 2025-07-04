import {test} from "@playwright/test"
import { MyAccountPage } from "../page/MyAccountPage.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { adminDetails } from "../Data/userDetails.js"

test.only('Cookie injection test', async({ page }) => {
    
    //console.log(adminDetails.username)
    const loginToken = await getLoginToken( adminDetails.username, adminDetails.password )
    //console.warn("Login token: ", loginToken)
    const myAccountPage = new MyAccountPage(page)
    await myAccountPage.visit()

    //evaluate( Function(), [List] ) List can be used to pass parameters to the function as mention below
    //evaluate( Function(List), [List] ) List can be used to pass parameters to the function as mention below
    await page.evaluate((loginTokenInsideBrowser) => {
        document.cookie = "token=" + loginTokenInsideBrowser;
    }, [ loginToken ] )

    await myAccountPage.visit()
    await myAccountPage.waitForPageHeading()

    //await page.pause()
})