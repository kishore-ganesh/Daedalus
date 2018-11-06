class Post{
    constructor(title, content, image){
        this.title=title;
        this.postContent=content;
        this.headerImage=image;
    }

    copy(source){
        this.title=source.title;
        this.postContent=source.postContent;
        this.headerImage=source.headerImage;
        this.author=source.author;
    }

    
}

module.exports={Post};