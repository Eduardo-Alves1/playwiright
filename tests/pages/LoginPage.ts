import { expect, Page } from "@playwright/test";
//import { tirarPrint } from "../utils/utils";


export class LoginPage {

    constructor(private readonly page: Page) { }

    async navigate() {
        await this.page.goto('/');
    }

    async clickLoginButton() {
        await this.page.locator('button.btn-entrar').click();
    }

    async fillLoginForm(email: string, password: string) {
        await this.page.getByPlaceholder('Digite seu e-mail').fill(email);
        await this.page.getByPlaceholder('Senha').fill(password);
    }

    async submitLoginForm() {
        const confirmarButton = this.page.getByRole('button', { name: 'Sim, encerrar' });
        await this.page.locator('button.btn-login').click();

        try {
            // espera até 5s o botão aparecer
            await confirmarButton.waitFor({ state: 'visible', timeout: 5000 });
            console.log('Popup detectado, aguardando botão ficar clicável...');

            // garante que está visível e habilitado
            await expect(confirmarButton).toBeVisible({ timeout: 5000 });
            await expect(confirmarButton).toBeEnabled({ timeout: 5000 });

            // agora clica
            await confirmarButton.click();
            console.log('Clique em "Sim, encerrar" realizado!');
        } catch (e) {
            console.log('Modal não apareceu, seguindo com login...');
        }
    }


    async validateLoginSucess() {
        await this.page.waitForURL('**/dashboard');
        //await tirarPrint(this.page, 'login-sucesso', 'screenshots');
    }

    async validateLoginError() {
        await this.page.locator('.error-message').isVisible();
        //await tirarPrint(this.page, 'login-error', 'screenshots');
    }

}
