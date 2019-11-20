const machine = {
    state: 'sober',
    timer : '',
    transitions: {
        sober: {
            drink: function(bevrage, second) {
                console.log(this.state)
                if (bevrage.type === 'alcohol') {
                    this.changeState('drunk');
                }
            }
        },
        drunk: {
            drink: function(bevrage) {
                console.log(this.state)
                if (bevrage.type === 'alcohol') {
                    this.changeState('reallydrunk');
                } else if(bevrage.type === 'coffee') {
                    this.changeState('sober');
                }

            }
        },
        reallydrunk: {
            drink: function(bevrage) {
                console.log(this.state)
                if(bevrage.type === 'alcohol'){
                    this.changeState('passedout');
                    state_timer = performance.now();
                } else {
                    this.changeState('drunk');
                }
            }
        },
        passedout: {
            init: function() {
                this.timer = setInterval(function() {
                    console.log(performance.now() - state_timer)
                    if(machine.state === 'passedout' && performance.now() - state_timer > 1000*5) {
                        Jeff.dispatch('wake')
                    }
                    
                }, 1000)
            },
            wake: function() {
                this.changeState('hungover');
                console.log(this.dispatch('init'))
            }
        },
        hungover: {
            init: function() {
            console.log('ok buddie, time for you to wake up, you where wasted last night.')
                stream.getTracks().forEach( track => track.stop())
                disable = true;
                enableCallButtons()
                this.changeState('sober');

            },
            drink: function(bevrage) {
                if(bevrage.type === 'coffee'){
                    this.changeState('sober')
                }

                if(bevrage.type === 'alcohol'){
                    this.changeState('reallydrunk')
                }

            }
        }
        
    },
    dispatch(actionName, ...payload) {
        const actions = this.transitions[this.state];
        const action = this.transitions[this.state][actionName];
        if(action) {
            action.apply(machine, ...payload);
        } else {
            return 'invalid action in this state';
        } 
    },
    changeState(newState) {
        this.state = newState;

    }
}

window.Call = Object.create(machine, {
    name: {
        writable: false,
        enumerable: true,
        value: 'Jeff'
    }
})

Call.dispatch('drink', [{type: 'alcohol'}])
Call.dispatch('drink', [{type: 'coffee'}])
Call.dispatch('drink', [{type: 'coffee'}])

Call.dispatch('drink', [{type: 'alcohol'}])
Call.dispatch('drink', [{type: 'alcohol'}])
Call.dispatch('drink', [{type: 'alcohol'}])
const possibleStates = [
    'initial',
    'gather',
    'call',
    'called',
    'incall'
]
const callMachine = {
    state: 'initial',
    transitions: {
        initial: {
            init: function() {

            }
        },
        gather: {
            init: function() {}

        },
        call: {
            init: function() {}

        },
        called: {
            init: function() {}

        }
    },
    changeTo: function (newState) {
        if(possibleStates.includes(newState)) this.state = newState;
    },

}

export {
    callMachine
};