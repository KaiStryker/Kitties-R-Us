$( '#navid .navbar-nav a' ).on( 'click', function () {
	$( '.navbar .navbar-nav' ).find( 'li .navitem .active' ).removeClass( 'active' );
	$( this ).parent( 'li' ).addClass( 'active' );
});