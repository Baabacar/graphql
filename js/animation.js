// Animation resolver
const resolver = {
    resolve: function resolve(options, callback) {
        const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
        const combinedOptions = Object.assign({}, options, { resolveString: resolveString });

        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function randomCharacter(characters) {
            return characters[getRandomInteger(0, characters.length - 1)];
        }

        function doRandomiserEffect(options, callback) {
            const characters = options.characters;
            const timeout = options.timeout;
            const element = options.element;
            const partialString = options.partialString;

            let iterations = options.iterations;

            setTimeout(() => {
                if (iterations >= 0) {
                    const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

                    if (iterations === 0) {
                        element.textContent = partialString;
                    } else {
                        element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                    }

                    doRandomiserEffect(nextOptions, callback)
                } else if (typeof callback === "function") {
                    callback();
                }
            }, timeout);
        }

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
        }

        doResolverEffect(combinedOptions, callback);
    }
}

// Animation variables and options
let strings = [];
let counter = 0;
let isAnimating = false;
let animationFrameId;

const options = {
    offset: 0,
    timeout: 5,
    iterations: 10,
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'],
    resolveString: '',
    element: null
}

// Animation function
function animate() {
    if (!isAnimating) return;

    resolver.resolve(options, () => {
        counter++;
        if (counter >= strings.length) {
            counter = 0;
        }
        options.resolveString = strings[counter];
        options.offset = 0;
        animationFrameId = requestAnimationFrame(animate);
    });
}

// Function to stop animation
function stopAnimation() {
    isAnimating = false;
    cancelAnimationFrame(animationFrameId);
}

// Function to update animation in DOM
export function updateAnimationInDom(newStrings) {
    stopAnimation();
    strings = newStrings;
    counter = 0;
    
    const element = document.querySelector('[data-target-resolver]');
    if (element) {
        options.element = element;
        options.resolveString = strings[counter];
        isAnimating = true;
        animate();
    }
}

// Initialize animation on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('[data-target-resolver]');
    if (element && strings.length > 0) {
        options.element = element;
        options.resolveString = strings[counter];
        isAnimating = true;
        animate();
    }
});