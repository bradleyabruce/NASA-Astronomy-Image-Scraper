const apiEndpoint = "https://api.nasa.gov/planetary/apod"
const apiKey = "bpbnLxar9CWdhuE0RycUScuu2A887xwM0sxdPlCV"
const rootDiv = document.getElementById("main")

try
{
    rootDiv.onload = queryAPI()
}
catch(error)
{
    alert(error)
}


function queryAPI()
{
    var request = new XMLHttpRequest()
    request.open("GET", apiEndpoint + "?api_key=" + apiKey, true)
    request.send()

    request.onload = function()
    {
        if (request.status == 200)
        {
            var jsonData = JSON.parse(request.response)

            var title = jsonData["title"]
            var info = jsonData["explanation"]
            var date = jsonData["date"]
            var imgURL = jsonData["url"]
    
            var dict = 
            {
                title: title,
                info: info,
                date: date         
            }
    
            displayText(dict)
            displayImages(imgURL)
        }
        else{
            alert("An error occurred while attempting to get Astronomy Image of the Day.")
        }
    }
}

function displayText(dict)
{
    const titleDiv = document.getElementById("titleDiv")
    const textDiv = document.getElementById("textDiv")
    const dateDiv = document.getElementById("dateDiv")

    titleDiv.innerHTML = "<b>Image Title: </b>" + dict["title"]
    textDiv.innerHTML = "<b>Image Description: </b>" + dict["info"]
    dateDiv.innerHTML = "<b>Today's Date: </b>" + dict["date"]
}

function displayImages(imgURL)
{
    var image = new Image
    image.src = imgURL

    image.onload = function(){
        // Set canvas to correct size
        const imgCanvas = document.getElementById("imgCanvas")  
        imgCanvas.width = image.width
        imgCanvas.height = image.height
        // Draw image
        var ctx = imgCanvas.getContext('2d')
        ctx.drawImage(image, 0, 0)
    }
}