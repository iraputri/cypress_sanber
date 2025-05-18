import LoginPage from '../../support/pages/LoginPage';
import ResetPasswordPage from '../../support/pages/ResetPasswordPage';
import resetPasswordData from '../../fixtures/resetPasswordData.json';

describe('orangehrm login with POM', () => {

    beforeEach(() => {
        ResetPasswordPage.visit();
    });

    it('User is on the reset password page', () => {
        ResetPasswordPage.waitForResetForm();
        ResetPasswordPage.getTitle().should('have.text', 'Reset Password');
        ResetPasswordPage.getUsernameField().should('exist');
        ResetPasswordPage.getResetButton().should('be.visible');
        ResetPasswordPage.getCancelButton().should('be.visible');
    })

    it('User try to reset password', () => {
        ResetPasswordPage.waitForResetForm();
        cy.intercept('POST', '**/auth/requestResetPassword').as('resetRequest');
      
        ResetPasswordPage.getUsernameField().type(resetPasswordData.username);
        ResetPasswordPage.getResetButton().click();
        
        cy.url().should('include', 'sendPasswordReset');
    
        cy.wait('@resetRequest').its('response.statusCode').should('equal', 302);
    
        ResetPasswordPage.getTitle().should('have.text', 'Reset Password link sent successfully');
    })

    it('User try to reset password using empty username', () => {
        ResetPasswordPage.waitForResetForm();
        // nothing to intercept
        
        ResetPasswordPage.getUsernameField().clear;
        ResetPasswordPage.getResetButton().click();
        
        cy.url().should('include', 'requestPasswordResetCode');

        ResetPasswordPage.hasInputErrorClass(ResetPasswordPage.getUsernameField());
        ResetPasswordPage.getInputErrorMessage().should('have.text', 'Required');
        ResetPasswordPage.getTitle().should('have.text', 'Reset Password');
    })

    it('User try cancel reset password', () => {
        // nothing to intercept
        ResetPasswordPage.waitForResetForm();
      
        ResetPasswordPage.getUsernameField().type(resetPasswordData.username);
        ResetPasswordPage.getCancelButton().click();
        
        cy.url().should('include', '/auth/login');

        LoginPage.waitForLoginForm();
        LoginPage.getBrandingImage().should('be.visible');
        LoginPage.getLogoImage().should('be.visible');
        LoginPage.getUsernameField().should('exist');
        LoginPage.getPasswordInput().should('exist');
        LoginPage.getLoginButton().should('be.visible');
    })

})