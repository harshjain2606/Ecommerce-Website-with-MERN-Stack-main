class APIFeatures {
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    search(){
        
        let keyword = this.queryString.keyword ? {
            name:{
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        }:{};
        this.query.find({...keyword})
        return this 
    }
    filter(){
        const queryStringCopy={...this.queryString};
        
        const removeField=['keyword','limit','page'];
        removeField.forEach(f=>delete queryStringCopy[f]);
        
        let queryString=JSON.stringify(queryStringCopy);
      
        
        queryString=queryString.replace(/\b(gt|gte|lt|lte)/g,m=>`$${m}`)
        
        this.query.find(JSON.parse(queryString))
        return this
    }
    paginate(resPerPage){
        const curPage=Number(this.queryString.page)||2;
        const skip = resPerPage*(curPage-1)
        
        this.query.limit(resPerPage).skip(skip)
        return this
    }
}

module.exports=APIFeatures