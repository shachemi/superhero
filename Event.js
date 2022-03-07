const Event = function(type, location) {
    this.type = type;
    this.location = location;
    
    this.assign = function(superhero) {
        this.superhero = superhero
    }
    this.toJSON = function() {
        const json = {
            type: this.type,
            location: this.location
        };
        if (this.superhero) {
            json.superhero = {
                name: this.superhero.name
            }
        }
        return json
    }
}
module.exports = Event