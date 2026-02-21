setTimeout( ()=>{
    document.title = "Learn more about fruits!";
}, 3000 );

//use onclick (in html) if using this
function toggle()
{
    var menu = document.getElementById('menu');
    const hamburger = document.querySelector('.hamburger');
    const bars = document.querySelectorAll('.hamburger .bar');
    if( menu.style.display === "block" )
    {
        menu.style.display = "none";
        
        hamburger.style.bottom = '';

        bars[0].style.transform = '';
        bars[0].style.position = '';
        bars[0].style.top = '';

        bars[1].style.opacity = '';

        bars[2].style.transform = '';
        bars[2].style.position = '';
        bars[2].style.bottom = '';

    }
    else
    {
        menu.style.display = "block";
        //hamburger transformation
        hamburger.style.margin = '0px 0px 0px 0px 0px';

        bars[0].style.transform = 'rotate(45deg)';
        bars[0].style.position = 'relative';
        bars[0].style.top = '9.5px';

        bars[1].style.opacity = '0';

        bars[2].style.transform = 'rotate(-45deg)';
        bars[2].style.position = 'relative';
        bars[2].style.bottom = '9.5px';
    }
}