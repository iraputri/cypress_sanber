describe('Reqres User API', () => {
    const url = 'https://reqres.in/api/users?delay=';

    before(function(){
        cy.fixture('getUserWithDelayData.json').then((pages) => {
            this.pages = pages;
        })
    })

    it('GET all users by page', function(){
        this.pages.forEach(({page, expectData}) => {
            cy.log(`Page ${page}`);
            cy.request({
                method: 'GET',
                url: `${url}${page}`,
                headers: {
                    'x-api-key': 'reqres-free-v1'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.data).to.not.be.empty;
            })
        })
    })
})