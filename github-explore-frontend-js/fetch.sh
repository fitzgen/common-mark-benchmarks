#!/usr/bin/env bash

set -ex

cd $(dirname $0)

function fetch {
    local readme_name=""
    if [[ "$3" != "" ]]; then
        readme_name="$3"
    else
        readme_name="README.md"
    fi
    curl -f "https://raw.githubusercontent.com/$1/$2/master/$readme_name" -o "$1-$2.md"
}

fetch marko-js marko
fetch MithrilJS mithril.js
fetch angular angular
fetch emberjs ember.js
fetch knockout knockout
fetch tastejs todomvc readme.md
fetch spine spine
fetch vuejs vue
fetch Polymer polymer
fetch facebook react
fetch matreshkajs matreshka
fetch aurelia framework
fetch optimizely nuclear-js
fetch jashkenas backbone
fetch dojo dojo
fetch jorgebucaran hyperapp
fetch riot riot
