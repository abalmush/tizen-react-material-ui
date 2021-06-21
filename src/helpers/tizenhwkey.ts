export default function tizenhwkey() {
    document.addEventListener('tizenhwkey', function(event) {
        if(event.keyName == 'back') {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
}
