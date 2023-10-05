import Counter from './counter.js';

const Counters = {
    data () {
        return {
            total: 0,
        }
    },
    components: {
        Counter: Counter,
    },
    props: [ "nb" ],
    computed: {
        NB () {
            var tab = [];
            for ( var i = 0; i < this.nb; i++ ) {
                tab.push( i + 1 );
            }
            console.log("NB Called", tab);
            return tab;
        }
    },
    template: `
        <div v-for="i in NB">
            Counter {{i}} : <counter @add="add($event)" @sub="sub($event)" />
        </div>
        <br><br>
        Total: {{ total }} <br>
    `,
    methods: {
        add ( value ) {
            this.total += parseInt( value );
        },
        sub ( value ) {
            this.total -= parseInt( value );
        }
    },
}

export default Counters;