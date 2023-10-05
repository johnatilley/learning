const Counter = {
    data () {
        return {
            count: 0,
            old_value: 0,
        }
    },

    template: `
        <input type="text" v-model="count"
            @keydown="verif($event)"
            @input="calcul()"
            @focus="focus()"
            @blur="blur()">
    `,
    methods: {
        verif ( event ) {
            if ( event.key != "Backspace" && event.key != "Delete"
                && event.key != "ArrowLeft" && event.key != "ArrowRight"
                && event.key != "ArrowUp" && event.key != "ArrowDown"
                && event.key != "Tab" && event.key != "Home" && event.key != "End" ) {
                if ( event.key < "0" || event.key > "9" ) {
                    event.preventDefault(); //  forbid the key
                }
            }
            this.old_value = event.target.value;
        },
        calcul () {
            this.$emit( "sub", this.old_value || 0 );
            this.$emit( "add", this.count || 0 );
        },
        focus () {
            if ( this.old_value == 0 ) {
                this.count = "";
            }
        },
        blur () {
            if ( !parseInt( this.count ) ) {
                this.old_value = 0;
                this.count = 0;
            }
        }
    },
    emits: [ "sub", "add" ]

}

export default Counter;