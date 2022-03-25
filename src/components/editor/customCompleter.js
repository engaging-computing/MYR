import myrReference from "../../myr/reference.js";
import myrTextures from "../structural/Textures.js";

export const customCompleter = {
    getCompletions: function (editor, session, pos, prefix, callback) {
        let BasicAutocompleteKeyWords = [
            "const",
            "yield",
            "import",
            "get",
            "set",
            "async",
            "await",
            "break",
            "case",
            "default",
            "delete",
            "do",
            "else",
            "for",
            "function",
            "if",
            "return",
            "switch",
            "typeof",
            "let",
            "var",
            "while",
            "enum",
            "export",
            "implements",
            "private",
            "public",
            "protected",
            "static"
        ];

        let texture = myrTextures();
        let Texture = [...texture.TexturePack.map(obj => obj.title),
            "group()"
        ];

        let reference = myrReference();
        let keyWords = [...reference.geometry.map(obj => obj.name + "()"),
            ...reference.geometry.map(obj => obj.byname + "()"),
            ...reference.transformations.map(obj => obj.name + "()"),
            ...reference.animations.map(obj => obj.name + "()"),
            "group()"
        ];

        let Colors = [
            "aliceblue",
            "antiquewhite",
            "aqua",
            "aquamarine",
            "azure",
            "beige",
            "bisque",
            "black",
            "blanchedalmond",
            "blue",
            "blueviolet",
            "brown",
            "burlywood",
            "cadetblue",
            "chartreuse",
            "chocolate",
            "coral",
            "cornflowerblue",
            "cornsilk",
            "crimson",
            "cyan",
            "darkblue",
            "darkcyan",
            "darkgoldenrod",
            "darkgray",
            "darkgreen",
            "darkgrey",
            "darkkhaki",
            "darkmagenta",
            "darkolivegreen",
            "darkorange",
            "darkorchid",
            "darkred",
            "darksalmon",
            "darkseagreen",
            "darkslateblue",
            "darkslategray",
            "darkslategrey",
            "darkturquoise",
            "darkviolet",
            "deeppink",
            "deepskyblue",
            "dimgray",
            "dimgrey",
            "dodgerblue",
            "firebrick",
            "floralwhite",
            "forestgreen",
            "fuchsia",
            "gainsboro",
            "ghostwhite",
            "gold",
            "goldenrod",
            "gray",
            "green",
            "greenyellow",
            "grey",
            "honeydew",
            "hotpink",
            "indianred",
            "indigo",
            "ivory",
            "khaki",
            "lavender",
            "lavenderblush",
            "lawngreen",
            "lemonchiffon",
            "lightblue",
            "lightcoral",
            "lightcyan",
            "lightgoldenrodyellow",
            "lightgray",
            "lightgreen",
            "lightgrey",
            "lightpink",
            "lightsalmon",
            "lightseagreen",
            "lightskyblue",
            "lightslategray",
            "lightslategrey",
            "lightsteelblue",
            "lightyellow",
            "lime",
            "limegreen",
            "linen",
            "magenta",
            "maroon",
            "mediumaquamarine",
            "mediumblue",
            "mediumorchid",
            "mediumpurple",
            "mediumseagreen",
            "mediumslateblue",
            "mediumspringgreen",
            "mediumturquoise",
            "mediumvioletred",
            "midnightblue",
            "mintcream",
            "mistyrose",
            "moccasin",
            "navajowhite",
            "navy",
            "oldlace",
            "olive",
            "olivedrab",
            "orange",
            "orangered",
            "orchid",
            "palegoldenrod",
            "palegreen",
            "paleturquoise",
            "palevioletred",
            "papayawhip",
            "peachpuff",
            "peru",
            "pink",
            "plum",
            "powderblue",
            "purple",
            "rebeccapurple",
            "red",
            "rosybrown",
            "royalblue",
            "saddlebrown",
            "salmon",
            "sandybrown",
            "seagreen",
            "seashell",
            "sienna",
            "silver",
            "skyblue",
            "slateblue",
            "slategray",
            "slategrey",
            "snow",
            "springgreen",
            "steelblue",
            "tan",
            "teal",
            "thistle",
            "tomato",
            "turquoise",
            "violet",
            "wheat",
            "white",
            "whitesmoke",
            "yellow",
            "yellowgreen"
        ];

        callback(null, BasicAutocompleteKeyWords.map(function (word) {
            return {
                caption: word,
                value: word,
                meta: "keyword",
                score: 1
            };
        }));

        callback(null, keyWords.map(function (word) {
            return {
                caption: word,
                value: word,
                meta: "MYR",
                score: 2
            };
        }));

        callback(null, Colors.map(function (word) {
            return {
                caption: word,
                value: word,
                meta: "color",
                score: 0
            };
        }));

        callback(null, Texture.map(function (word) {
            return {
                caption: word,
                value: word,
                meta: "texture",
                score: 3
            };
        }));
    }
};

export default customCompleter;