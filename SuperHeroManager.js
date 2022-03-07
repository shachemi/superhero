const SuperHeroManager = function (superheroDatabase, eventsDatabase) {
    this.events = [];
    this.superheroes = [];
    this.superheroDatabase = superheroDatabase;
    this.eventsDatabase = eventsDatabase;

    this.getEvents = function () {
        return this.events
    }
    this.getSuperheroes = function () {
        return this.superheroes
    }

    this.findSuperHeroInDataBase = function (superhero) {
        return this.superheroDatabase.find((superheroData) => superhero.name === superheroData.name);
    }

    this.compareSkillsForEvent = function(superhero1, superhero2, event) {
        if (!eventsDatabase[event.type]) return 0;
        const superhero1Data = this.findSuperHeroInDataBase(superhero1);
        const superhero2Data = this.findSuperHeroInDataBase(superhero2);
        if (superhero1Data && superhero2Data) {
            // if both superheroes known in database, compare skills to event
            const superhero1MatchingSkills = eventsDatabase[event.type].filter(skill => superhero1Data.skills.includes(skill));
            const superhero2MatchingSkills = eventsDatabase[event.type].filter(skill => superhero2Data.skills.includes(skill));
            return superhero2MatchingSkills.length - superhero1MatchingSkills.length;
        } else if (!superhero1Data && !superhero2Data) {
            // if none is known, do not sort
            return 0
        } else {
            // else select known superhero over unknown
            return superhero1Data ? -1 : 1
        }
    }
    this.compareLocationForEvent = function(superhero1, superhero2, event) {
        const superhero1Data = this.findSuperHeroInDataBase(superhero1);
        const superhero2Data = this.findSuperHeroInDataBase(superhero2);
        if (superhero1Data && superhero2Data) {
            // if both superheroes known in database, compare location to event
            return superhero1Data.location === event.location ? -1 : 1;
        } else if (!superhero1Data && !superhero2Data) {
            // if none is known, do not sort
            return 0
        } else {
            // else select known superhero over unknown
            return superhero1Data ? -1 : 1
        }
    }

    this.assignMissions = function () {
        this.events.forEach((event) => {
            if (!event.superhero) {
                const availableHero = this.superheroes.sort((superhero1, superhero2) => {
                    return this.compareLocationForEvent(superhero1, superhero2, event)
                }).sort((superhero1, superhero2) => {
                    return this.compareSkillsForEvent(superhero1, superhero2, event)
                }).find((superhero) => superhero.isAvailable());
                if (availableHero) {
                    event.assign(availableHero);
                    availableHero.assign(event);
                }
            }
        })
    }
    this.addEvent = function (event) {
        this.events.push(event)
        this.assignMissions();
    }
    this.addSuperhero = function (superhero) {
        this.superheroes.push(superhero)
        this.assignMissions();
    }
    this.updateSuperheroDatabase = function (superheroDatabase) {
        this.superheroDatabase = superheroDatabase;
    }
    this.updateEventsDatabase = function (eventsDatabase) {
        this.eventsDatabase = eventsDatabase;
    }
}
module.exports = SuperHeroManager