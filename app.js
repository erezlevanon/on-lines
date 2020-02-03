const app = angular.module('WIFIKite', ['ngAnimate', 'ngMaterial', 'ngMessages']);

app.directive('draggable', function ($document) {
    return function (scope, element, attr) {
        console.log(attr.$$element.parent()[0].id);
        const id = attr.$$element.parent()[0].id;

        let startX = 0;
        let startY = 0;

        if (id === 'plans') {
            startX = 500;
            startY = 2800;
        } else if (id === 'guide') {
            startX = 680;
            startY = 3050;
        }

        let x = startX,
            y = startY;
        let container = attr.$$element.parent();

        container.css({
            top: y + 'px',
            left: x + 'px'
        });

        element.css({
            position: 'relative',
            cursor: 'pointer'
        });

        element.on('mousedown', function (event) {
            // Prevent default dragging of selected content

            event.preventDefault();
            startX = event.screenX - x;
            startY = event.screenY - y;

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
            container = attr.$$element.parent();
        });

        function mousemove(event) {
            y = event.screenY - startY;
            x = event.screenX - startX;
            container.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    }
});

class MainController {
    constructor($window) {
        this.window_ = $window;

        this.shouldShowPlans = false;
        this.shouldShowGuide = false;

        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }

    }

    showPlans() {
        this.shouldShowPlans = true;
    }

    hidePlans() {
        this.shouldShowPlans = false;
    }

    showGuide() {
        this.shouldShowGuide = true;
    }

    hideGuide() {
        this.shouldShowGuide = false;
    }

    openGuide() {
        this.window_.alert('You did it. go to the next step.')
    }

}

app.controller('MainController', MainController);
