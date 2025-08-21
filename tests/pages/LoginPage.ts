import { Page } from "@playwright/test";
import { tirarPrint } from "../utils/utils";


export class LoginPage {
    
    constructor(private readonly page: Page) {}

    async navigate(){
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
            await confirmarButton.waitFor({ state: 'visible', timeout: 5000 }); 
            await confirmarButton.click({force: true}); 
        }catch (e) { 
            console.log('Modal não apareceu, seguindo com o Login', e); 
        }
    }

    async validateLoginSucess (){
        await this.page.waitForURL('**/dashboard');
        await tirarPrint(this.page, 'login-sucesso', 'screenshots');
    }

    async validateLoginError() {
        await this.page.locator('.error-message').isVisible();
        await tirarPrint(this.page, 'login-error', 'screenshots');
    }

}
