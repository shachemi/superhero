var assert = require('assert');
const SuperHeroManager = require('./SuperHeroManager')
const Event = require('./Event')
const SuperHero = require('./SuperHero')

const fs = require('fs');
let database = fs.readFileSync('Database.json');
const superheroDatabase = JSON.parse(database)
let eventTypes = fs.readFileSync('EventTypes.json');
const eventsDatabase = JSON.parse(eventTypes)

describe('SuperHeroManager', function () {
    let superHeroManager = new SuperHeroManager(superheroDatabase, eventsDatabase);
    it('should init app with no event or superheroes', function () {
        assert.equal(superHeroManager.getEvents().length, 0)
    assert.equal(superHeroManager.getSuperheroes().length, 0)
  });
  it('should add an event', function () {
    const event = new Event('Tsunami', 'New York');
    superHeroManager.addEvent(event);
    assert.equal(superHeroManager.getEvents().length, 1)
});
  it('should add a superhero', function () {
      const superhero = new SuperHero('Batman');
      superHeroManager.addSuperhero(superhero);
      assert.equal(superHeroManager.getSuperheroes().length, 1)
    });
    it('superhero should be available if no event', function () {
        const superhero = new SuperHero('Batman');
        superHeroManager = new SuperHeroManager(superheroDatabase, eventsDatabase);
        superHeroManager.addSuperhero(superhero);
        assert.equal(superhero.isAvailable(), true)
    });
    it('should assign a superhero to an event when only one of each', function () {
        const superhero = new SuperHero('Batman');
        const event = new Event('Tsunami', 'New York');
        superHeroManager = new SuperHeroManager(superheroDatabase, eventsDatabase);
        superHeroManager.addSuperhero(superhero);
        superHeroManager.addEvent(event);
        assert.equal(superhero.event, event)
    });
    it('should assign most appropriate superhero if multiple available (skills)', function () {
        superHeroManager = new SuperHeroManager(superheroDatabase, eventsDatabase);
        const batman = new SuperHero('Batman');
        superHeroManager.addSuperhero(batman);
        const aquaman = new SuperHero('Aquaman');
        superHeroManager.addSuperhero(aquaman);
        const event = new Event('Tsunami', 'New York');
        superHeroManager.addEvent(event);
        assert.equal(event.superhero, aquaman)
    });
    it('should assign known superhero over unknown', function () {
        superHeroManager = new SuperHeroManager(superheroDatabase, eventsDatabase);
        const unknown = new SuperHero('Unknown');
        superHeroManager.addSuperhero(unknown);
        const batman = new SuperHero('Batman');
        superHeroManager.addSuperhero(batman);
        const event = new Event('Tsunami', 'New York');
        superHeroManager.addEvent(event);
        assert.equal(event.superhero, batman)
    });
    it('should assign closest superhero if multiple available of same skill', function () {
        superHeroManager = new SuperHeroManager(superheroDatabase, eventsDatabase);
        const batman = new SuperHero('Batman');
        superHeroManager.addSuperhero(batman);
        const daredevil = new SuperHero('Daredevil');
        superHeroManager.addSuperhero(daredevil);
        const event = new Event('Robbery', 'New York');
        superHeroManager.addEvent(event);
        assert.equal(event.superhero, daredevil)
    });
})