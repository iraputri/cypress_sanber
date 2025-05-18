class LoginPage{
    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    getBrandingImage(){
        return cy.get('.orangehrm-login-branding');
    }

    getLogoImage(){
        return cy.get('.orangehrm-login-logo');
    }

    getTitle(){
        return cy.get('.orangehrm-login-title');
    }

    getUsernameField(){
        return cy.get('input[name="username"]');
    }

    getPasswordInput(){
        return cy.get('input[name="password"]');
    }

    getDropdown(){
        return cy.get('.oxd-userdropdown-img');
    }

    getLoginButton(){
        return cy.get('.orangehrm-login-button');
    }

    getLoginError(){
        return cy.get('.orangehrm-login-error');
    }

    getAlertContent(){
        return cy.get('.oxd-alert-content-text');
    }

    getInputErrorMessage(){
        return cy.get('.oxd-input-field-error-message')
    }

    waitForLoginForm() {
        return cy.get('.orangehrm-login-form', { timeout: 10000 }).should('be.visible');
    }
      

    hasInputErrorClass(inputField) {
        return inputField.should('have.class', 'oxd-input--error');
    }
      
    
}

export default new LoginPage();