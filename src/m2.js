import * as m2 from "air-m2"
import {SceneSchema, stream, keyF, ModelSchema, Render} from "air-m2"
import { View as View2 } from "air-html"

window.__M2 = m2;

function onload() {
    return stream(function( emt ) {
        window.document && window.document.readyState === "complete" && emt();
        window.addEventListener("load", emt);
    });
}

window.modelschema = new ModelSchema( {
    schema: [ "$", {source: {path: "./master"}} ,
        [ "locale", {id: "locale", source: () => stream(emt => emt("en")),} ],
        [ "currency", {id: "currency", source: () => stream(emt => emt("usd")), } ],
    ],
} );

onload().at( function () {

    const scene = new SceneSchema({
        viewbuilder: (...argv) => new View2(...argv),
        schema: [ "$", {source: {path: "./master", schtype: "html"}} ],
    });

    scene.obtain("", { modelschema: modelschema.get() }).at( ({action: name, node}) => {
        if(!document.querySelector("#schema-tree"))
            document.body.append( node.target );
    } );

} );