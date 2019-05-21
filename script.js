$(function(){

    var getData = function(url, callback){
        $.ajax({
            method: 'GET',
            url: url
        }).done(function(data){
            callback(data);
        })
    };

    var createUl = function(){
        if(!$('#saved-jokes').length){
            var ul = $('<ul></ul>').attr('id','saved-jokes');
            ul.insertAfter($('button[name=save]'));
        }
    };

    var createList = function(el, text, click){
        var li = $('<li></li>').text(text);
        $(el).append(li);
        if(click){
            li.on('click', function(){
                createUl();
                if($(this).text() !== $('#saved-jokes li:last-child').text()){
                    createList('#saved-jokes', $(this).text());
                }
            });
        }
    }

    getData('https://api.chucknorris.io/jokes/random', function(data){
        $('#joke').text(data.value);
    });

    getData('https://api.chucknorris.io/jokes/categories', function(data){
        for (var item in data) {
            $('select[name=categories]').append(new Option(data[item]));
        }
    });

    $('select[name=categories]').on('change', function(){
        if($(this).find('option:first').attr('disabled') !== true){
            $(this).find('option:first').attr("disabled", "true");
        }
        getData('https://api.chucknorris.io/jokes/random?category='+$(this).val(), function(data){
            $('#joke').text(data.value);
        })
    });

    $('body').on('click', 'button[name=save]', function(){
        createUl();
        if($('#joke').text() !== $('#saved-jokes li:last-child').text()){
            createList('#saved-jokes', $('#joke').text())
        } else {
            return;
        }
    });

    $('input[name=search]').on('keyup', function(){
        if($(this).val().length >= 3){
            getData('https://api.chucknorris.io/jokes/search?query='+$(this).val(), function(data){
                $('#search-results').empty();
                for (var item in data.result) {
                    createList('#search-results', data.result[item].value, true);
                }
            });
        }
    });

    $(document).on('keyup', function(e){
        var keyCode = e.keyCode;
        if(keyCode == 82) {
            console.log('hi');
        }
    })

});
