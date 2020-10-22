let Description= require('./description').Description
let AbstractDescriptionStore = require('./description').AbstractDescriptionStore

let description = [];
exports.inMemoryDescriptionStore= class InMemoryDescriptionStore extends AbstractDescriptionStore{
    async close(){}

    async update(key,title, body){
        description[key].title = title
        description[key].body = body
        return description[key]
    }
    async create(key,title, body){
        description[key]= new Description(key,title, body)

        return description[key]
    }
    async read(key){
        if(description[key])
            return description[key]
        else
            throw new Error(`Description ${key} does not exist`)
    }

    async destroy(key){
        if(description[key])
            delete description[key]
        else
            throw new Error(`Description ${key} does not exist`)

    }
    async keyList(){
        return Object.keys(description)

    }
    async count(){
        return description.length
    }

}
