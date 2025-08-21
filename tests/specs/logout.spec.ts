import test from "@playwright/test";
import { LoginPage, } from "../pages/LoginPage";
import { LogoutPage } from "../pages/LogoutPage";
import { user } from "../fixtures/user";


test.describe("Logout do Aluno", () => {
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.clickLoginButton();
        await loginPage.fillLoginForm(user.valid.email, user.valid.password);
        await loginPage.submitLoginForm(); 

        logoutPage = new LogoutPage(page);
        
    });

    test("CT03 - Deve fazer logout com sucesso", async () => {
        
        await logoutPage.clickLogoutButton();
        await logoutPage.validateLogoutSucess();
    });

});