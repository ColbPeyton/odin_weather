//based on weather status return pre-defined color
export function generateBarColor(status){
    const temp = status;
    let color = '';
    switch(true){
        case (temp >= 200 && temp < 300):
            color = '#2D2A32'
            break;
        case (temp >= 300 && temp < 400):
            color = '#d8dbdc'
            break;
        case (temp >= 500 && temp < 600):
            color = '#afc3cc'
            break;
        case (temp >= 600 && temp < 700):
            color = '#fffafa'
            break;
        case (temp >= 700 && temp < 800):
            color = '#f0ffff'
            break;
        case (temp === 800):
            color = '#9be8ff'
            break;
        case (temp > 800 && temp < 900):
            color = '#585856'
            break;
        default:
            color = '#f7b801'
            break;
    }

    return color;
}

//based on weather status, return text color (removes conflict with background bar)
export function generateColorBasedOnBackground(status){
    const temp = status;
    const exp1 = temp >= 200 && temp < 300  ? true : false;
    const exp2 = temp > 800 && temp < 900 ? true : false;
    let color = '';
    if(exp1|| exp2){
        color = '#ECF8F8'
    }else{
        color = '#2D2A32'
    }
    return color;
}
