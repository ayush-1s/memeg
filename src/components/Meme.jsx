import React from "react";
 import * as htmlToImage from 'html-to-image';

function Meme(){
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    //Memes Data
    const [allMemes, setAllMemes] = React.useState([])
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])

    //Random Images
    function getMemeImage(){
        const randomNo = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNo].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    //Updating Text
    function handleChange(event){
        const {name,value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]:value
        }))
    }

    // To capture the image
    function capture() {
        htmlToImage
            .toPng(document.querySelector(".meme"), { quality: 1 })
            .then(function (data) {
                console.log(data);
                let link = document.createElement("a");
                link.download = "memeimg.png";
                link.href = data;
                link.click();
            });
    }

    return(
        <>
        <section>
            <div className="form">
                <input type="text" 
                placeholder="Top Text" 
                className="form-input"
                name="topText"
                value = {meme.topText} 
                onChange={handleChange}/>

                <input type="text" 
                placeholder="Bottom Text" 
                className="form-input"
                name="bottomText"
                value = {meme.bottomText}
                onChange={handleChange}/>

                <button className="form-btn" onClick={getMemeImage}>Get New Image✨</button>
                
                <button className="form-btn save" onClick={capture}>Download Meme⬇️</button>
                
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="" className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </section>
        </>
    )
}

export default Meme;