const axios = require('axios')




exports.getActivity= function(){axios.get( 'https://www.boredapi.com/api/activity'  )
    .then(function(response)
    {
        console.log( response.data.activity)


        let span = document.createElement('span')
        span.innerText = response.data['activity']
        document.querySelector("#innerTextOutput").appendChild(span)

 
    }


)
.catch(function(error){
    console.log(error)
}



)}