const apikey = `a8b62495c790457ebed5bf0fc959f5d1`
const blogcontainer = document.getElementById("block-container")
const searchfield = document.getElementById("search-area")
const searchbtn = document.getElementById("search-btn")
async function fetchrandomnews(){
    try{
        const apiurl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&from=2024-05-12s&pagesize=8&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("something went wrong",error)
        return [];
    }

}

searchbtn.addEventListener("click",async ()=>{
    const querry = searchfield.value
    if(querry !== ""){
        try{
            const articles = await fetchnewsquerry(querry)
            displayblogs(articles)

        }catch(error){
            console.error("something wrong with the fetching",error)
        }
    }
})

async function fetchnewsquerry(querry){
    try{
        const apiurl = `https://newsapi.org/v2/everything?q=${querry}&pagesize=8&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
    }catch(error){
        console.error("something went wrong",error)
        return [];
    }
}
function displayblogs(articles){
    blogcontainer.innerHTML=""
    articles.forEach(articles => {
        const blogcard = document.createElement("div")
        blogcard.classList.add("card")
        const img = document.createElement("img")
        img.src=articles.urlToImage
        img.alt=articles.title
        const title = document.createElement("h2")
        title.textContent = articles.title
        const description = document.createElement("p")
        description.textContent = articles.description
        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener("click",()=>{
            window.open(articles.url,"_blank");
           })
        blogcontainer.appendChild(blogcard);
    });
}


(async ()=>{
    try{
        const articles = await fetchrandomnews();
        displayblogs(articles);
    }catch(error){
        console.error("something went wrong",error);
    }
})();