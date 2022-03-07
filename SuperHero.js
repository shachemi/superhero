const SuperHero = function(name) {
    this.name = name;
    this.event;
    
    this.assign = function(event) {
        this.event = event
    }
    this.unassign = function() {
        this.event = null
    }
    this.isAvailable = function() {
        return !this.event;
    }
    this.toJSON = function() {
        const json = {
            hero: this.name
        };
        if (this.event) {
            json.location = this.event.location
            json.action = 'Mission';
        }
        else {
            json.action = 'StandBy';
            json.location = 'Batcave';
        }
        return json
    }
}
module.exports = SuperHero