class mixer {
    constructor(ingredients) {
        this._mixerDisplay = document.getElementById('mixerDisplay');
        this._mixerPrintScreen = document.getElementById('mixerPrintScreen');
        this._mixerPrintCount = document.getElementById('mixerPrintCount');

        this.originalIngredients = ingredients;
        this._addEventHandlers();
        this._initVars();
        this.counter = 1;
    }

    addIngredient(ingredient, isAdded) {
        this.addedIngredients.push(ingredient, isAdded);
    }

    _addEventHandlers() {
        const keysYes = [97, 115, 100, 102, 103];

        const keysNo = [103, 104, 105, 106, 107, 108, 246];

        window.addEventListener('keypress', event => {
            if (keysYes.indexOf(event.charCode) > 0 && !this._currentlyChanging) {
                this._addCurrentIngredient(true);
            }

            if (keysNo.indexOf(event.charCode) > 0 && !this._currentlyChanging) {
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

        this.addedIngredients[this._pointers.row][this._pointers.ingredient] = {
            name: this.currentIngredient,
            value: add,
        };

        const nextPointer = this._incrementPointers(this._pointers);

        if (nextPointer) {
            this._displayIngredient(
                this.currentIngredient,
                this.originalIngredients[nextPointer.row][nextPointer.ingredient],
                add
            );
        } else {
            this._displayIngredient(this.currentIngredient, undefined, add);
            this._print();
            this._reset();
            this.counter = this.counter + 1;
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
                this._mixerDisplay.innerHTML = 'dein getränk wird gedruckt, <br>bitte warte.';
            }
        }, 1000);
    }

    _getCurrentIngredient() {
        let ingredient = this.originalIngredients[this._pointers.row][this._pointers.ingredient];
        return ingredient;
    }

    _incrementPointers(pointer) {
        if (this.originalIngredients[pointer.row][pointer.ingredient + 1]) {
            return {
                row: pointer.row,
                ingredient: pointer.ingredient + 1,
            };
        }
        if (this.originalIngredients[pointer.row + 1]) {
            return {
                row: pointer.row + 1,
                ingredient: 0,
            };
        }
    }

    _print() {
        let printOutput = '';

        for (let line of this.addedIngredients) {
            printOutput += '<p>';

            for (let ingredient of line) {
                printOutput += '<span class="mixer-ingredient--';
                printOutput += ingredient.value ? 'added' : 'rejected';
                printOutput += '">' + ingredient.name + '</span>&nbsp;';
            }

            printOutput += '</p>';
        }

        this._mixerPrintScreen.innerHTML = printOutput;
        this._mixerPrintCount.innerHTML = '<p>mischgetränk #' + this.counter + ' zur werkschau 2017</p>';

        window.print();
    }

    _reset() {
        setTimeout(() => {
            this._initVars();
        }, 5000);
    }

    _initVars() {
        this._mixerDisplay.innerHTML = this.originalIngredients[0][0];
        this.addedIngredients = [];
        this._pointers = {
            row: 0,
            ingredient: 0,
        };
        this._currentlyChanging = false;
    }
}

const ingredients = [
    ['rum', 'vodka', 'becherovka', 'jäger', 'gin', 'berliner luft'],
    ['rhabarbersaft', 'apfelsaft', 'orangensaft', 'tonic', 'cola', 'mate', 'ginger ale', 'bitter lemon'],
    ['limetten', 'zitronen', 'rohrzucker', 'gurke', 'minze'],
];

const voMix = new mixer(ingredients);
