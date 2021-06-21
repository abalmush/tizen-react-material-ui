echo "Building \"basic\" project please wait..."
cd basic
tizen clean
tizen build-web
tizen package --type wgt -- .buildResult
cd ..