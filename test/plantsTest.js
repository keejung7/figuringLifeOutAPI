process.env.NODE_ENV = 'test';

const Plant = require('../api/models/figuringLifeOutModel')

// require dev-dependencies in package.json
const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHTTP);

describe('Plants', () => {
    beforeEach((done) => {
        Plant.deleteMany({}, (err) => {
            done();
        });
    });

    /**
     *  GET /plants route to retrieve all plants
     */
    describe('/GET plants', () => {
        it('it should get all the plants', (done) => {
            chai.request(server)
                .get('/plants')
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    /**
     *  POST /plants to plant a new plant
     */
    describe('/POST plants', () => {
        it('it should POST a plant', (done) => {
            let plant = new Plant({
                scientific_name : "Rhododendron maximum",
                probability : 1.0,
                common_name : "great rhododendron",
                url : "https://en.wikipedia.org/wiki/Rhododendron_maximum",
                taxonomy : [],
                created_date : "2021-05-30T12:00:00.000Z"
            })
            chai.request(server)
                .post('/plants')
                .send(plant)
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('scientific_name');
                    res.body.should.have.property('probability');
                    res.body.should.have.property('common_name');
                    res.body.should.have.property('url');
                    res.body.should.have.property('taxonomy').be.a('array');
                    res.body.should.have.property('created_date');
                done();
            });
        });
    })
    /**
     *  GET /plants/:plantid to get individual plant info
     */
    describe('/GET/:id plant', () => {
        it('it should GET a plant by given id', (done) => {
            let plant = new Plant({
                scientific_name : "Rhododendron maximum",
                probability : 1.0,
                common_name : "great rhododendron",
                url : "https://en.wikipedia.org/wiki/Rhododendron_maximum",
                taxonomy : [],
                created_date : "2021-05-30T12:00:00.000Z"
            });
            plant.save((err, plant) => {
                chai.request(server)
                    .get('/plants/' + plant.id)
                    .end((err, res) => {
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(plant.id);
                        res.body.should.have.property('scientific_name');
                        res.body.should.have.property('probability');
                        res.body.should.have.property('common_name');
                        res.body.should.have.property('url');
                        res.body.should.have.property('taxonomy').be.a('array');
                        res.body.should.have.property('created_date');
                    done();
                });
            });
        });
    });

    /**
     *  PUT /plants/:plantid to update individual plant info
     */
    describe('/PUT/:id plant', () => {
        it('it should update a plant by given id', (done) => {
            let plant = new Plant({
                scientific_name : "Rhododendron maximum",
                probability : 1.0,
                common_name : "great rhododendron",
                url : "https://en.wikipedia.org/wiki/Rhododendron_maximum",
                taxonomy : [],
                created_date : "2021-05-30T12:00:00.000Z"
            });
            plant.save((err, plant) => {
                chai.request(server)
                    .put('/plants/' + plant.id)
                    .send({
                        scientific_name : "Rhododendron maximum",
                        probability : 0.5,
                        common_name : "American rhododendron",
                        url : "https://en.wikipedia.org/wiki/Rhododendron_maximum",
                        taxonomy : [],
                        created_date : "2021-05-30T12:00:00.000Z"
                    })
                    .end((err, res) => {
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('scientific_name');
                        res.body.should.have.property('probability').eql(0.5);
                        res.body.should.have.property('common_name').eql("American rhododendron");
                        res.body.should.have.property('taxonomy').be.a('array');
                    done();
                });
            });
        });
    });

    /**
     *  DELETE /plants/:plantid to delete plant info
     */
    describe('/DELETE/:id plant', () => {
        it('it should delete a plant by given id', (done) => {
            let plant = new Plant({
                scientific_name : "Rhododendron maximum",
                probability : 1.0,
                common_name : "great rhododendron",
                url : "https://en.wikipedia.org/wiki/Rhododendron_maximum",
                taxonomy : [],
                created_date : "2021-05-30T12:00:00.000Z"
            });
            plant.save((err,plant) => {
                chai.request(server)
                    .delete('/plants/' + plant.id)
                    .end((err, res) => {
                        console.log(res.body);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Plant successfully deleted');
                    done();
                });
            });
        });
    });
});