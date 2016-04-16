class mixer {
    constructor(ingredients) {
        console.log('foo', ingredients);

        this.originalIngredients = ingredients;
        this.addedIngredients = [[]];
        this.currentIngredient = this._getCurrentIngredient();
        this._addEventHandlers();
    }

    addIngredient(ingredient, isAdded) {
        this.addedIngredients.push(ingredient, isAdded);
    }

    _addEventHandlers() {
        window.addEventListener('keypress', (event) => {
            if(event.keyCode === 97) {
                this._addCurrentIngredient(true);
            }

            if (event.keyCode === 115) {
                this._addCurrentIngredient(false);
            }
        });
    }

    _addCurrentIngredient(add) {

        this.addedIngredients[this.addedIngredients.length - 1].push(
            {
                name: this.currentIngredient,
                value: add
            }
        )

        this.currentIngredient = this._getCurrentIngredient(); 

        if (!this.originalIngredients[0].length) {
            this.originalIngredients.shift();
            this.addedIngredients.push([]);
        }

        console.log(this.addedIngredients);
        
        if (!this.originalIngredients.length) {
            console.log('all done!');
            return;
        }
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
