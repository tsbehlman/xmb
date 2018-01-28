const labelTemplate = (function() {
	const label = document.createElement( "label" );
	label.appendChild( document.createTextNode( "" ) );
	return label;
})();
const selectTemplate = (function() {
	const template = document.createDocumentFragment();
	template.appendChild( labelTemplate.cloneNode( true ) );
	template.appendChild( document.createElement( "select" ) );
	return template;
})();
const rangeTemplate = (function() {
	const template = document.createDocumentFragment();
	template.appendChild( labelTemplate.cloneNode( true ) );
	const input = document.createElement( "input" );
	input.type = "range";
	template.appendChild( input );
	return template;
})();

class Configuration {
	constructor( parent ) {
		this.form = document.createElement( "form" );
		parent.appendChild( this.form );
	}
	
	addList( name, map, defaultValue, setValueCallback ) {
		const valueMap = new Map( map );
		const container = selectTemplate.cloneNode( true );
		container.firstChild.firstChild.nodeValue = name;
		container.firstChild.for = container.lastChild.id = "option-" + name;
		container.lastChild.name = name;
	
		for( const key of valueMap.keys() ) {
			const option = document.createElement( "option" );
			option.appendChild( document.createTextNode( key ) );
			if( key === defaultValue ) {
				option.selected = true;
			}
			container.lastChild.appendChild( option );
		}
	
		container.lastChild.addEventListener( "change", function() {
			setValueCallback( valueMap.get( this.value ) );
			Object.assign( drawParams, valueMap.get( this.value ) );
		}, false );
		
		this.form.appendChild( container );
		setValueCallback( valueMap.get( defaultValue ) );
	}
	
	addRange( name, defaultValue, min, max, step, setValueCallback ) {
		const container = rangeTemplate.cloneNode( true );
		container.firstChild.firstChild.nodeValue = name;
		container.firstChild.for = "option-" + name;
		container.lastChild.id = "option-" + name;
		container.lastChild.name = name;
		container.lastChild.min = min;
		container.lastChild.max = max;
		container.lastChild.step = step;
		container.lastChild.value = defaultValue;
		container.lastChild.addEventListener( "input", function() {
			setValueCallback( parseFloat( this.value ) );
		}, false );
		this.form.appendChild( container );
		setValueCallback( defaultValue );
	}
}