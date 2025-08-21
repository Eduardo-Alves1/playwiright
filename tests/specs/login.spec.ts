import { test } from "@playwright/test";
import { LoginPage, LogoutPage } from "../pages/LoginPage";
import { user } from "../fixtures/user";

test.describe("Login do Aluno", () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test("CT01 - Deve fazer login com sucesso", async () => {
        await loginPage.clickLoginButton();
        await loginPage.fillLoginForm(user.valid.email, user.valid.password);
        await loginPage.submitLoginForm();
        await loginPage.validateLoginSucess();
    });

    test("CT02 - Deve mostrar mensagem de erro ao fazer login com credenciais inválidas", async () => {
        await loginPage.clickLoginButton();
        await loginPage.fillLoginForm(user.invalid.email, user.invalid.password);
        await loginPage.submitLoginForm();
        await loginPage.validateLoginError();

    });
});
