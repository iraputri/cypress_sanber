class DashboardPage{
    getBrandBanner(){
        return cy.get('.oxd-brand-banner');
    }

    getBreadcrumb(){
        return cy.get('.oxd-topbar-header-breadcrumb-module');
    }

    getAttendanceChart(){
        return cy.get('.emp-attendance-chart');
    }

    getMainMenu(){
        return cy.get('.oxd-main-menu');
    }

    getToDoList(){
        return cy.get('.orangehrm-todo-list');
    }

    getQuickLaunch(){
        return cy.get('.orangehrm-quick-launch');
    }

    getBuzzWidget(){
        return cy.get('.bi-camera-fill');
    }

    getLeaveChart(){
        return cy.get('.emp-leave-chart');
    }

    getDistribChart(){
        return cy.get('p').contains('Employee Distribution by Sub Unit');
    }

    getLocationChart(){
        return cy.get('p').contains('Employee Distribution by Location');
    }

    waitForGrid() {
        return cy.get('.orangehrm-dashboard-grid', { timeout: 10000 }).should('be.visible');
    }
}

export default new DashboardPage();