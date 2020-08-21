import {imageKey} from '../keys/key_image';


//Takes search term and returns image URL from Giphy API 
async function getImage(searchTerm){
    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${imageKey}&s=${searchTerm}&weirdness=10`,{mode: 'cors'});
        const imageData = await response.json();
        return imageData.data.images.original.url;
    }
    catch(error){
        console.log(error);
    }

}



export default getImage;