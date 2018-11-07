class Post{
    constructor(title, content, image){
        this.title=title;
        this.postContent=content;
        this.headerImage=image;
        this.stars=0;
    }

    copy(source){
        this.title=source.title;
        this.postContent=source.postContent;
        this.headerImage=source.headerImage;
        this.author=source.author;
        if(source.stars){
            this.stars=source.stars;
        }
        
    }

    
}

module.exports={Post};