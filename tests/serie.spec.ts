import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../dist/index.js';
import { expect } from 'chai';
import 'mocha'

/*
name : string,
    sinopsis: string,
    year: number,
    lastSeason: number,
    seasons: number,
    duration: number,
    episodes: {season: string, episodes: number}[],
    cast: string[],
    directors: string[],
    genres: string[],
    users: {_id: Schema.Types.ObjectId} [],
*/



chai.use(chaiHttp);
describe('Serie routes', () => {
    let _idTestSerie: string;
    let server: any;
    const testSerie1 = {
      name: 'Test1',
      sinopsis: 'Test sinopsis',
      year: 2021,
      lastSeason: 2021,
      seasons: 1,
      duration: 20,
      episodes: [{season: "T1", episodes: 7}],
      cast: ["Test1", "Test1"],
      directors: ["Test1", "Test1"],
      genres: ["accion", "aventura"],
    };
    const testSerie2 = {
      name: 'Test2',
      sinopsis: 'Test sinopsis',
      year: 2021,
      lastSeason: 2021,
      seasons: 1,
      duration: 20,
      episodes: [{season: "T1", episodes: 7}, {season: "T2", episodes: 8}],
      cast: ["Test2", "Test2"],
      directors: ["Test2", "Test2"],
      genres: ["accion", "aventura"],
      };
      
    describe('POST /:serie', () => {
        //Crear usuarios
        it('should add a testSerie1', (done) => {
        chai
            .request(app)
            .post(`/series/serie`)
            .set('Content-Type', 'application/json')
            .send(testSerie1)
            .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Serie creado correctamente');
            done();
            });
        });
        it('should add a testSerie2', (done) => {
            chai
                .request(app)
                .post(`/series/serie`)
                .set('Content-Type', 'application/json')
                .send(testSerie2)
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message', 'Serie creado correctamente');
                done();
                });
            });
       
    //Errores al crear usuarios
    it('should give us an error when try to add a new thats not correct', (done) => {
        chai
            .request(app)
            .post(`/series/serie`)
            .set('Content-Type', 'application/json')
            .send(testSerie1)
            .end((err, res) => {
            expect(res).to.have.status(500);
            done();
            });
        });
    });
    //Modificar usuarios
    describe('PATCH /:serie', () => {
        it('Should change sinopsis of testSerie1', (done) => {
            chai
                .request(app)
                .patch(`/series/serie/?name=Test1`)
                .set('Content-Type', 'application/json')
                .send({sinopsis : "modified sinopsis"})
                .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
                });
            });
        it('Should change sinopsis of testSerie2', (done) => {
                chai
                    .request(app)
                    .patch(`/series/serie/?name=Test2`)
                    .set('Content-Type', 'application/json')
                    .send({sinopsis : "modified sinopsis"})
                    .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                    });
                });
            it('Should change name of a serie that doesnt exists', (done) => {
                chai
                    .request(app)
                    .patch(`/series/serie/?name=Test3`)
                    .set('Content-Type', 'application/json')
                    .send({name : "pepazo"})
                    .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    done();
                    });
                });
    });
    //Obtener usuarios
    describe('GET /:serie', () => {
        it('should get all the series', (done) => {
            chai
                .request(app)
                .get(`/series/series`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                });
            });
           
                it('should get testSerie2 by _query', (done) => {
                    chai
                        .request(app)
                        .get(`/series/serie/?name=Test2`)
                        .set('Content-Type', 'application/json')
                        .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                        });
                    });
    });
    //Borrar usuarios
    
    describe('Delete /?serie', () => {
        it('should delete the tests serie 1', (done) => {
            chai
                .request(app)
                .delete(`/series/serie/?name=Test1`)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                expect(res).to.have.status(200);
                done();
                });
            });
        it('should delete the tests serie 2', (done) => {
        chai
            .request(app)
            .delete(`/series/serie/?name=Test2`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
        });
    });
      
});     