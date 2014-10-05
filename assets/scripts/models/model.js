var Person = Backbone.Model.extend({
    initialize: function(){
        //console.log('person initialized');
        this.on('all',function(e){
            //console.log('all event for person '+this.get('name')+' event '+e);
        });
    },
    defaults: {
        name: 'undefined',
        age: 'undefined',
    },
    urlRoot: "passwords"
    // url: function(){
    //     var base = this.urlRoot || (this.collection && this.collection.url) || "/";
    //     if(this.isNew()) return base;

    //     return base + '?id=' + encodeURIComponent(this.id);
    // }
});

//Setting up backbone for HTTP
Backbone.emulateHTTP = true;
Backbone.emulateJSON = true;

var person = new Person({name: "Joe", age:"25"});
//Save data to server
//person.save();
//Get data from server
//person.fetch();
var People = Backbone.Collection.extend({
    initialize: function(){
        //console.log('People initialized');
        this.on('all',function(e){
            //console.log('all event for people '+e);
        });
    },
    model: Person
});

var people = new People();

//add person to people collection
people.add([
        person,
        {name: "Bob",age:'24'},
        {name: "Jim",age:'26'}
    ]);

//Remove person from the collection
//people.remove(person);

//resets the collection
//people.reset();


//listening to add / remove on the collection
people.on('add',function(){
    //console.log('added');
});

people.on('remove',function(){
    
});

//console.log(people.pluck('name'));

//console.log(people.toJSON());

//CRUD operations
/*

Create POST
Read GET
Update PUT
Delete DELETE

*/












