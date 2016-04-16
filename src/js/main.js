class mixer {
    constructor(ingredients) {
        this._mixerDisplay = document.getElementById('mixerDisplay');
        this._mixerPrintScreen = document.getElementById('mixerPrintScreen');

        this.originalIngredients = ingredients;
        this.addedIngredients = [];
        this._addEventHandlers();
        this._mixerDisplay.innerHTML = this.originalIngredients[0][0];
        this._currentlyChanging = false;
        this._pointers = {
            row: 0,
            ingredient: 0
        };
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

        if (!this.addedIngredients[this._pointers.row]) {
            this.addedIngredients.push([]);
        }

        this.addedIngredients[this._pointers.row][this._pointers.ingredient] =
            {
                name: this.currentIngredient,
                value: add
            };

        const nextPointer = this._incrementPointers(this._pointers)

        if (nextPointer) {
            this._displayIngredient(this.currentIngredient, this.originalIngredients[nextPointer.row][nextPointer.ingredient], add);
        } else {
            this._displayIngredient(this.currentIngredient, undefined, add);
            this._print();
        }
        this._pointers = this._incrementPointers(this._pointers);

    }

    _displayIngredient(last, current, isAdded) {
        this._mixerDisplay.classList.add(isAdded ? 'mixer-display--added' : 'mixer-display--rejected');
        this._currentlyChanging = true;

        setTimeout(() => {            
            this._mixerDisplay.classList.remove('mixer-display--added'); 
            this._mixerDisplay.classList.remove('mixer-display--rejected');   

            if (current !== undefined) {
                this._currentlyChanging = false;
                this._mixerDisplay.innerHTML = current; 
            } else {
                this._mixerDisplay.innerHTML = 'dein getränk wird gedruckt, bitte warte.';
            }
        }, 1000);
    }

    _getCurrentIngredient() {
        let ingredient = this.originalIngredients[this._pointers.row][this._pointers.ingredient];
        return ingredient;
    }

    _incrementPointers(pointer) {
        if (this.originalIngredients[pointer.row][pointer.ingredient + 1]){
            return {
                row: pointer.row,
                ingredient: pointer.ingredient + 1
            }
        }
        if (this.originalIngredients[pointer.row + 1]) {
            return {
                row: pointer.row + 1, 
                ingredient: 0
            }
        }
    }

    _print() {
        let printOutput = '';

        for (let line of this.addedIngredients) {
            printOutput += '<p>';

            for(let ingredient of line) {
                printOutput += '<span class="mixer-ingredient--'
                printOutput += ingredient.value ? 'added' : 'rejected';
                printOutput += '">' + ingredient.name + '</span>&nbsp;'
            }

            printOutput += '</p>';
        }

        this._mixerPrintScreen.innerHTML = printOutput;

        window.print();
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

const ingredientsFew = [
    [
        'rum',
        'vodka'
    ],
    [
        'milch'
    ],
    [
        'limetten',
        'rohrzucker'
    ]
]


const voMix = new mixer(ingredientsFew);
