class mixer {
    constructor(ingredients) {
        console.log('foo', ingredients);

        this._mixerDisplay = document.getElementById('mixerDisplay');
        this.originalIngredients = ingredients;
        this.addedIngredients = [[]];
        this.currentIngredient = this._getCurrentIngredient();
        this._addEventHandlers();
        this._mixerDisplay.innerHTML = this.currentIngredient;
        this._currentlyChanging = false;

    }

    addIngredient(ingredient, isAdded) {
        this.addedIngredients.push(ingredient, isAdded);
    }

    _addEventHandlers() {
        window.addEventListener('keypress', (event) => {
            if(event.keyCode === 97 && !this._currentlyChanging) {
                this._addCurrentIngredient(true);
            }

            if (event.keyCode === 115 && !this._currentlyChanging) {
                this._addCurrentIngredient(false);
            }
        });
    }

    _addCurrentIngredient(add) {
        const lastIngedient = this.currentIngredient;
        this.currentIngredient = this._getCurrentIngredient(); 

        this.addedIngredients[this.addedIngredients.length - 1].push(
            {
                name: lastIngedient,
                value: add
            }
        )

        this._displayIngredient(lastIngedient, this.currentIngredient, add);

        if (!this.originalIngredients[0].length) {
            this.originalIngredients.shift();
            this.addedIngredients.push([]);
        }

        if (!this.originalIngredients.length) {
            console.log('all done!');
            return;
        }
    }

    _displayIngredient(last, current, isAdded) {
        this._mixerDisplay.classList.add(isAdded ? 'mixer-display--added' : 'mixer-display--rejected');
        this._currentlyChanging = true;

        setTimeout(() => {
            this._mixerDisplay.innerHTML = current;
            this._mixerDisplay.classList.remove('mixer-display--added'); 
            this._mixerDisplay.classList.remove('mixer-display--rejected'); 
            this._currentlyChanging = false;
        }, 1000);
    }

    _getCurrentIngredient() {
        return this.originalIngredients[0].shift();
    }
}

const ingredients = [
    [
        'rum',
        'vodka',
        'kräuter',
        'tequila',
        'korn',
        '43',
        'zubrovka',
        'martini',
        'gin'
    ],
    [
        'milch',
        'orangensaft',
        'tonic',
        'cola',
        'mate',
        'tomatensaft'
    ],
    [
        'limetten',
        'rohrzucker',
        'zitronen',
        'sellerie',
        'tabasco',
        'pfeffer',
        'gurke'
    ]
]

const voMix = new mixer(ingredients);
