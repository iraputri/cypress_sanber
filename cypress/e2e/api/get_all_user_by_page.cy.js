describe('Reqres User API', () => {
    const url = 'https://reqres.in/api/users?page=';

    before(function(){
        cy.fixture('getUserByPageData.json').then((pages) => {
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
                expect(response.body.page).to.equal(page);
                if (expectData) {
                    expect(response.body.data).to.not.be.empty;
                } else {
                    expect(response.body.data).to.be.empty;
                }
            })
        })
    })
})