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

const modelschema = new ModelSchema( {
    schema: [ "$", {source: {path: "./gamex-master"}} ,
        [ "locale", {id: "locale", source: () => stream(emt => emt("en")),} ],
        [ "currency", {id: "currency", source: () => stream(emt => emt("usd")), } ],
    ],
} );

onload().at( function () {

    const scene = new SceneSchema({
        viewbuilder: (...argv) => new View2(...argv),
        schema: [ "$", {source: {path: "./gamex-master-view", schtype: "html"}} ],
    });

    scene.obtain("", { modelschema: modelschema.get() }).at( ({action: name, node}) => {
         document.body.append( node.target );
    } );

} );