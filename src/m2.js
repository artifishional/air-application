import { stream, ModelVertex, HTMLView, error } from "air-m2"

const entry = document.currentScript.getAttribute("data-entry-unit") || "master";

function get(_name) {
    const [ , gets = null ] = window.location.href.split("?");
    if(gets === null) return null;
    const argv = gets.split("&").map( arg => arg.split("=") );
    const exist = argv.find( ([name]) => name === _name );
    return exist || null;
}

function onload() {
    return stream(function( emt ) {
        window.document && window.document.readyState === "complete" && emt();
        window.addEventListener("load", emt);
    });
}

let locale = (get("lang")||[, "en"])[1].toLocaleLowerCase();
const currency = (get("currency") || [ , "usd"])[1].toLocaleLowerCase();

const localesList = [ "ru", "en" ];

if(!localesList.includes(locale)) {
    locale = localesList[1];
}

const model = new ModelVertex( [ "$", {},
    [ "intl", {id: "intl", source: () => stream((emt, { hook }) => {
            let state = { locale, currency, localesList };
            emt(state);
            hook.add( ({action, locale}) => {
                if(action === "changeLocale") {
                    state = { ...state, locale };
                    emt( state );
                }
            } );
        }),} ],

    [ "error", { id: "error", source: error } ],
    [ "main", { use: [ {path: `./${entry}`} ] } ],
],);

window.model = model;

onload().at( function () {

    const view = new HTMLView(
        [ "$", { use: [ { path: `./${entry}`, schtype: "html" } ] } ],
    );

    const ans = view.obtain("", {
        $: {modelschema: model}
    }).at( ([{target}]) => {
        document.body.append( target );
        console.info("complete");
    } );

    window.MAIN = ans;

} );