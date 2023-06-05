const lodash = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const initialValue = 0;
    return blogs.reduce((acc,v) => acc + v.likes, initialValue);
}

const favoriteBlog = (blogs) => {
    let index = 0;
    let mostLikes = blogs[0].likes;
    blogs.forEach((b, i) => {
        if (b.likes >= mostLikes) {
            mostLikes = b.likes;
            index = i;
        }
    })
    return {"title": blogs[index].title, "author": blogs[index].author, "likes": blogs[index].likes}
}

const mostBlogs = (blogs) => {
    let groups = lodash.groupBy(blogs, 'author');
    let object = lodash.sortBy(groups, function (e) {
        return e.length;
    })
    return {"author": lodash.last(object)[0].author, "blogs": lodash.last(object).length}
}


const mostLikes = (blogs) => {
    let groups = lodash.groupBy(blogs, 'author');
    let likes = 0;
    let author = '';
    let likeCounter = 0;
    lodash.forEach(groups, function(element) {
        likeCounter = 0;
        element.forEach((b) => {
            likeCounter += b.likes;   
            if (likeCounter >= likes) {
                likes = likeCounter;
                author = b.author;
            } 
        })
        
    })

    return {"author": author, "likes": likes}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}