const resolver = {
    resolve: function resolve(options, callback) {
        // The string to resolve
        const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
        const combinedOptions = Object.assign({}, options, { resolveString: resolveString });

        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        function randomCharacter(characters) {
            return characters[getRandomInteger(0, characters.length - 1)];
        };

        function doRandomiserEffect(options, callback) {
            const characters = options.characters;
            const timeout = options.timeout;
            const element = options.element;
            const partialString = options.partialString;

            let iterations = options.iterations;

            setTimeout(() => {
                if (iterations >= 0) {
                    const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

                    // Ensures partialString without the random character as the final state.
                    if (iterations === 0) {
                        element.textContent = partialString;
                    } else {
                        // Replaces the last character of partialString with a random character
                        element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                    }

                    doRandomiserEffect(nextOptions, callback);
                } else if (typeof callback === "function") {
                    callback();
                }
            }, timeout);
        };

        function doResolverEffect(options, callback) {
            const resolveString = options.resolveString;
            const characters = options.characters;
            const offset = options.offset;
            const partialString = resolveString.substring(0, offset);
            const combinedOptions = Object.assign({}, options, { partialString: partialString });

            doRandomiserEffect(combinedOptions, () => {
                const nextOptions = Object.assign({}, options, { offset: offset + 1 });

                if (offset <= resolveString.length) {
                    doResolverEffect(nextOptions, callback);
                } else if (typeof callback === "function") {
                    callback();
                }
            });
        };

        doResolverEffect(combinedOptions, callback);
    }
}

let strings = [];
let counter = 0;
let isAnimating = false;
let animationTimeout;

const options = {
    // Initial position
    offset: 0,
    // Timeout between each random character
    timeout: 10, // Increased timeout for better handling of longer texts
    // Number of random characters to show
    iterations: 5, // Adjusted iterations for better effect on longer texts
    // Random characters to pick from
    characters: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    // String to resolve
    resolveString: '',
    // The element
    element: null
}

// Callback function when resolve completes
function callback() {
    animationTimeout = setTimeout(() => {
        counter++;

        if (counter >= strings.length) {
            counter = 0;
        }

        let nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
        resolver.resolve(nextOptions, callback);
    }, 1000);
}

function stopAnimation() {
    clearTimeout(animationTimeout);
    isAnimating = false;
}

export function updateAnimationInDom(newStrings) {
    stopAnimation();
    strings = newStrings;
    counter = 0;
    
    // Reset the animation
    const element = document.querySelector('[data-target-resolver]');
    if (element) {
        options.element = element;
        options.resolveString = strings[counter];
        isAnimating = true;
        resolver.resolve(options, callback);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('[data-target-resolver]');
    if (element && strings.length > 0) {
        options.element = element;
        options.resolveString = strings[counter];
        isAnimating = true;
        resolver.resolve(options, callback);
    }
});
