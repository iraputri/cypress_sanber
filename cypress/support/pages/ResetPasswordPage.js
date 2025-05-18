class ResetPasswordPage{

    visit(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
    }

    getTitle(){
        return cy.get('.orangehrm-forgot-password-title');
    }

    getUsernameField(){
        return cy.get('input[name="username"]');
    }

    getResetButton(){
        return cy.get('.orangehrm-forgot-password-button--reset');
    }

    getCancelButton(){
        return cy.get('.orangehrm-forgot-password-button--cancel');
    }

    getInputErrorMessage(){
        return cy.get('.oxd-input-field-error-message')
    }

    waitForResetForm() {
        return cy.get('.oxd-form', { timeout: 10000 }).should('be.visible');
    }
      
    hasInputErrorClass(inputField) {
        // This page often times out.
        return inputField.should('have.class', 'oxd-input--error');
    }
}

export default new ResetPasswordPage();