import {imageKey} from '../keys/key_image';


async function getImage(searchTerm){
    try{
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${imageKey}&s=${searchTerm}`,{mode: 'cors'});
        const imageData = await response.json();
        return imageData.data.images.original.url;
    }
    catch(error){
        console.log(error);
    }

}



export default getImage;