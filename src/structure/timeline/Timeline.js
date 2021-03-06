const gv = require('../../../const/global');

export default class Timeline{
    constructor(initialState){
        console.log("Creating new Timeline");
        this._blocks = [];
        this._initialState = initialState;
        this._initialState.save("Initial state");
        this._states = [this._initialState];
        console.log("States", this._states);
        this._id = Timeline.getID();
    }

    updateState(state, description){
        state.save(description);
        console.log(state.getHaives());
        this._states.push(state);
        console.log(JSON.stringify(this.getStates().map(function(i){return i.getID()+": "+i.getDescription()+" ["+i.getHaives().map(function(j){return j.getObjectID()+", "})+ "]";}), null, 2));

        gv.haiveSelectorModel.refreshModel();

        if(gv.containerSelectModel !== undefined){
            gv.containerSelectModel.refreshModel();
        }

        console.log("Current state : ", this.getCurrentState());
    }

    getTemporaryState(){
        return this.getCurrentState().getClone();
    }

    getStates(){
        return this._states;
    }

    getCurrentState(){
        return this._states[this._states.length - 1];
    }

    getID(){
        return this._id;
    }

    static getID(){
        if(Timeline.id == undefined){
            Timeline.id = 0;
        }else{
            Timeline.id++;
        }

        return Timeline.id;
    }
}
