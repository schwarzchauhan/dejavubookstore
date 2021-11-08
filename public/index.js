$(document).ready(function() {
    $('.my-side-nav a').addClass('my-sinnbold');
    // https: //api.jquery.com/eq/

    const tops = ['0px', '40px', '80px', '120px', '160px', '200px']
        // const lefts = ['-130px', '-130px', '-130px', '-130px', '-130px', '-130px']
    const mySideNavA = $('.my-side-nav a');
    console.log(mySideNavA.length);
    for (let i = 0; i < mySideNavA.length; i++) {
        const e = mySideNavA.eq(i);
        e.css({ top: tops[i], left: '-150px' });
    }

    $('.my-sinnbold').on("mouseover", function() {
        var x = this;
        console.log(x);
        $(x).addClass('slideRight');
    });
    $('.my-sinnbold').on("mouseout", function() {
        var x = this;
        console.log(x);
        $(x).removeClass('slideRight');
    });
});