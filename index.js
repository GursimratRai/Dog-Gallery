var breedInput = $('#breed');
var gallery = $('#gallery'); 

//collecting list of breeds using dog api.
$.get( 'https://dog.ceo/api/breeds/list/all', function(data){
   var breedOptions = data.message;
   for(let type in breedOptions)
   {
       var option = '$(<option value='+ type + '>' + type + '</option>)';
       breedInput.append(option);
   }
});

//showing sub-breed input field if available.
breedInput.change(function(){
    $('#subBreed').remove();
    var breed = breedInput.val();
    var url = 'https://dog.ceo/api/breed/' + breed +'/list';
    $.get(url,function(data){
        if(data.message.length!=0)
        {
            breedInput.after('<select id="subBreed"></select>');
            var subBreedInput = $('#subBreed');
            var subBreedOptions = data.message; 
            for(let type in subBreedOptions)
            {
                var option = '$(<option value=' + subBreedOptions[type] + '>' + subBreedOptions[type] + '</option>)';
                subBreedInput.append(option);
            }
        }
    });
});

//submit/fetch button functionality.
//fetch images and append it into the image container (gallery).
$('button').click(function(){
    $('#gallery img').remove();
    var breed = breedInput.val(); 
    var subBreed = $('#subBreed').val();
    
    var url = 'https://dog.ceo/api/breed/' + breed;
    if(subBreed !== undefined)
    {
        url += '/' + subBreed;
    }
    url += '/images';

    $.get(url,function(data){
        var imgUrls = data.message; 
        for(let imgUrl in imgUrls)
        {
            var img = '<img src=' + imgUrls[imgUrl] + ' alt=' + breed+ '>';
            gallery.append(img);
        }
    });
});
