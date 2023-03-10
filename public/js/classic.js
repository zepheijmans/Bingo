function animateScale(elem, amount = 1.2) {
    elem.css('transform', 'scale(0)');
    elem.fadeIn('slow');
    elem.css('transform', `scale(${amount})`);
    setTimeout(function() {
        elem.css('transform', 'scale(1)');
    }, 300);
}

function addCard(number) {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    $('#bingo-cards').css('display', 'flex');
    $('#bingo-cards').prepend(`<div class="bingo-card" style="border-color:#${randomColor}"><span>${number}</span></div>`);

    animateScale($('#app-brand'), 1.05);
    if (!$('#clear').is('visible')) $('#clear').show();
    animateScale($('#bingo-cards').find('.bingo-card:first'));
}

$('#generate').on('click', function() {
    $.get('/classic/generate').done(function(response){
        if (response.card == 0) return $('#generate').html('Er zijn geen kaarten meer over.');
        addCard(response.card);
    });
})

$('#clear').on('click', function() {
    $('.confirm-wrapper').fadeIn('fast');
})

function hideConfirmation() {
    $('.confirm-wrapper').fadeOut('fast');
}

const generateText = $('#generate').innerHTML;
$('#confirmClear').on('click', function() {
    $.post('/classic/clear').done(function(response){
        hideConfirmation();
        $('#clear').hide(); 
        $('#bingo-cards').hide(); 
        $('#bingo-cards .bingo-card').remove();
        $('#generate').html(generateText);
    });
})

$('#cancelClear').on('click', hideConfirmation)
