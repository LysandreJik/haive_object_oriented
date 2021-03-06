import Haive from "../../src/structure/Haive";
import {CONTAINER_POSITIONS, CONTAINER_SUBTYPES, HAIVE_TYPES, LIQUID_MAGNITUDES} from "../../const/structure";
import LiquidContainer from "../../src/structure/containers/LiquidContainer";
import State from "../../src/structure/timeline/State";
import Timeline from "../../src/structure/timeline/Timeline";


let haiveInit = {name: "Haive 1", type: HAIVE_TYPES.DISPENSER};
let haiveInit2 = {name: "Haive 2", type: HAIVE_TYPES.FREEZER};

let liquidContainerInit = {
    subType: CONTAINER_SUBTYPES.FS6_FALCON_STAND,
};
let liquidContainerInit2 = {
    subType: CONTAINER_SUBTYPES.FS6_FALCON_STAND,
};
let liquidContainerInit3 = {
    subType: CONTAINER_SUBTYPES.MB_20_MAGNETIC_BEADS,
};

let haive = new Haive(haiveInit);
let haive2 = new Haive(haiveInit2);
let container1 = new LiquidContainer(liquidContainerInit);
let container2 = new LiquidContainer(liquidContainerInit2);
let container3 = new LiquidContainer(liquidContainerInit3);

haive.setContainer(container1, CONTAINER_POSITIONS.TOP_LEFT);
haive2.setContainer(container2, CONTAINER_POSITIONS.MIDDLE_LEFT);

let haives = [haive, haive2];
let held = {liquid: "NONE", quantity: 0, magnitude: LIQUID_MAGNITUDES.uL};
let copied = null;

let initialState = new State({haives:haives, held:held, copied:copied});

let timeline = new Timeline({initialState: initialState});

test('Initialization test', () => {
    expect(timeline.getCurrentState()).toBe(initialState);
});
test('Retrieve current state', () => {
    expect(timeline.getCurrentState()).toBe(initialState)
});
test('Updating current state', () => {
    console.log(haive.getContainer(CONTAINER_POSITIONS.TOP_LEFT).getContainerSubType().name);
    console.log(timeline.getCurrentState().getHaives()[0].getContainer(CONTAINER_POSITIONS.TOP_LEFT).getContainerSubType().name);
    haive.setContainer(container3, CONTAINER_POSITIONS.TOP_LEFT);
    console.log(haive.getContainer(CONTAINER_POSITIONS.TOP_LEFT).getContainerSubType().name);
    console.log(timeline.getCurrentState().getHaives()[0].getContainer(CONTAINER_POSITIONS.TOP_LEFT).getContainerSubType().name);
});
test('State Immutability', () => {});

//TODO Test saving states and updating IDs.

test('Timeline usual operation : adding a Haive component to the state', () => {
    let initialState = new State({haives:haives, held:held, copied:copied});
    let timeline = new Timeline({initialState: initialState});
    let nextState = timeline.getTemporaryState();
    let nextHaives = nextState.getHaives();
    nextHaives.push(new Haive(haiveInit2));
    timeline.updateState(nextState);
    expect(timeline.getCurrentState().getHaives().length).toBe(3);
    expect(nextState.getHaives().length).toBe(3);
    expect(initialState.getHaives().length).toBe(2);
});