var Person = function(firstAndLast) {
    // See at the bottom how this are initialized
    var firstname = "";
    var lastname = "";
    
    this.getFirstName = function() { return firstname; };
    this.getLastName = function() { return lastname; };
    this.getFullName = function() { return firstname + " " + lastname; };
    this.setFirstName = function(newName) { firstname = newName; };
    this.setLastName = function(newSurname) { lastname = newSurname; };
    this.setFullName = function(newFullName) {
        var matches = newFullName.match(/\w+/g);
        if(matches !== null) {
            if(matches.length > 1) {
                firstname = matches[0];
                lastname = matches[1];
            }
        }
        else {
            firstname = null;
            lastname = null;
        }
    };
    
    // Initialize the private variables when the constructor is called
    // You have to call this function after its declaration! This is why it is at the bottom.
    this.setFullName(firstAndLast);
};

var bob = new Person('Bob Ross');
bob.getFullName();