const _description_key = Symbol('key')
const _description_title= Symbol('title')
const _description_body= Symbol('body')

exports.Description = class Description{
    constructor(key,title, body){
        this[_description_key]=key
        this[_description_title]=title
        this[_description_body]=body

    }
    get key(){return this[_description_key]}
    get title(){return this[_description_title]}
    set title(newTitle){this[_description_title]=newTitle}
    get body(){return this[_description_body]}
    set body(newBody){this[_description_body] = newBody}

}

exports.AbstractDescriptionStore = class AbstractDescriptionStore{
    async close(){}
    async update(key, title, body){}
    async create (key, title, body){}
    async read(key){}
    async destroy(key){}
    async keyList(){}
    async count(){}
}