describe('Reqres Resource API', () => {
    const url = 'https://reqres.in/api/unknown/';

    before(function(){
        cy.fixture('getUserByIDData.json').then((resources) => {
            this.resources = resources;
        })
    })

    it('GET resource by ID', function(){
        this.resources.forEach(({status, id, responseCode, expectData}) => {
            cy.log(`Resource is ${status}`);
            cy.request({
                method: 'GET',
                url: `${url}${id}`,
                headers: {
                    'x-api-key': 'reqres-free-v1'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(responseCode);
                if (expectData) {
                    expect(response.body.data).to.not.be.empty;
                    expect(response.body.data).to.have.property('id', id);
                } else {
                    expect(response.body).to.deep.equal({});
                }
            })
        })
    })
})