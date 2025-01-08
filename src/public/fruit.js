// const hamburger = document.getElementById('hamburger');
// const menu = document.getElementById('menu');

//SLOWER
// hamburger.addEventListener('click', ()=>{
//     // menu.classList.toggle('active');
//     if( menu.style.display === "none" )
//     {
//         menu.style.display = "block";
//         //hamburger turns into something else

//     }
//     else
//     {
//         menu.style.display = "none";
//     }

// });
// setTimeout( sth, 10000 );
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
        // bars[0].style.margin = '';

        bars[1].style.opacity = '';

        bars[2].style.transform = '';
        bars[2].style.position = '';
        bars[2].style.bottom = '';
        // bars[2].style.margin = '';

    }
    else
    {
        menu.style.display = "block";
        //hamburger murfs
        //const bar1 = document.querySelector('.hamburger .bar:nth-child(1)'); === the below, asides I used the better one
        hamburger.style.margin = '0px 0px 0px 0px 0px';

        bars[0].style.transform = 'rotate(45deg)';
        bars[0].style.position = 'relative';
        bars[0].style.top = '17px';
        // bars[0].style.margin = '30px 0px 0px 0px';

        bars[1].style.opacity = '0';

        bars[2].style.transform = 'rotate(-45deg)';
        bars[2].style.position = 'relative';
        bars[2].style.bottom = '17px';
        // bars[0].style.margin = '0px 0px 30px 0px';
    }
}