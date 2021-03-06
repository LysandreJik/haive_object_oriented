import React from 'react';
import LiquidContainer from "../../structure/containers/LiquidContainer";
const SVG = require('svg.js');

export class ContainerStructureDesign extends React.Component{
    constructor(){
        super();
        this.points = [
            {x: 9, y: 71}, {x: 54, y: 10}, {x: 611, y: 10}, {x: 655, y: 71}, {x: 655, y: 939}, {x:611, y: 990},
            {x: 425, y: 990}, {x: 425, y: 952}, {x: 241, y: 952}, {x: 241, y: 990}, {x: 55, y: 990}, {x: 9, y: 939},
            {x: 9, y: 71}
        ];

        this.state = {toggle: "tubes"};
        this.updateDimensions = this.updateDimensions.bind(this);
        this.getCircles = this.getCircles.bind(this);
        this.selectPlaceTubes = this.selectPlaceTubes.bind(this);
        this.selectPlaceLiquids = this.selectPlaceLiquids.bind(this);
    }

    getCircles(init){
        let start = {x:(this.max.x*this.ratio)/10, y: (this.max.y*this.ratio)/10};
        let ratio = 2;
        let distance = {x:(8*start.x)/(this.props.container.getWidth()*ratio + this.props.container.getWidth() - 1), y:(8*start.y)/(this.props.container.getHeight()*ratio + this.props.container.getHeight() - 1)};
        this.circles = [];

        for(let i = 0; i < this.props.container.getWidth(); i++){
            for(let j = 0; j < this.props.container.getHeight(); j++){
                this.circles.push({xIndex: i, yIndex: j, x: start.x+i*(distance.x + distance.x*ratio), y:start.y+j*(distance.y + distance.y*ratio), radius:distance.x*ratio});
            }
        }

        let parent = this;


        if(init){
            this.circleSVGDark = [];
            this.circleSVGLight = [];
            for(let i = 0; i < this.circles.length; i++){
                this.circleSVGDark.push(this.draw.circle(this.circles[i].radius).move(this.circles[i].x+2, this.circles[i].y+2));
                this.circleSVGLight.push(this.draw.circle(this.circles[i].radius).move(this.circles[i].x, this.circles[i].y));

                this.circleSVGLight[i].fill({color: this.props.container.getTip(i).isDirty() ? "#747BFE" : this.props.container.getTip(i).isAvailable() ? "#000" : '#75aaff', opacity: this.props.container.getTip(i).isAvailable() ? 0 : 1});
                this.circleSVGDark[i].fill('none');
                this.circleSVGLight[i].stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round'});
                this.circleSVGDark[i].stroke({ color: '#747BFE', width: 4, linecap: 'round', linejoin: 'round'});
                this.circleSVGLight[i].click(function(){parent.clickedOnCircle({x: parent.circles[i].xIndex, y: parent.circles[i].yIndex})});
                this.circleSVGLight[i].mouseover(function(){parent.circleSVGLight[i].animate(50, '>').fill({color: "#000", opacity: 0.2})});
                this.circleSVGLight[i].mouseout(function(){parent.circleSVGLight[i].animate(50, '>').fill({color: parent.props.container.getTip(i).isDirty() ? "#747BFE" : parent.props.container.getTip(i).isAvailable() ? "#000" : '#75aaff', opacity: parent.props.container.getTip(i).isAvailable() ? 0 : 1})});
            }
        }else{
            for(let i = 0; i < this.circles.length; i++){
                this.circleSVGLight[i].fill({color: this.props.container.getTip(i).isDirty() ? "#747BFE" : this.props.container.getTip(i).isAvailable() ? "#000" : '#75aaff', opacity: this.props.container.getTip(i).isAvailable() ? 0 : 1});
                this.circleSVGLight[i].radius(this.circles[i].radius/2).move(this.circles[i].x, this.circles[i].y);
                this.circleSVGDark[i].radius(this.circles[i].radius/2).move(this.circles[i].x+2, this.circles[i].y+2);
            }
        }

    }

    clickedOnCircle(circle){
        this.props.container.bookTip(circle.x, circle.y);
        this.getCircles();
        this.setState({updatedContainer: this.state.updatedContainer});
    }

    componentDidMount(){
        let ratio = 0.8;
        this.max = {x: 666, y: 1000};

        this.dimensions = {
            height:document.getElementById("structure-design-maindiv").clientHeight,
            width:document.getElementById("structure-design-maindiv").clientWidth
        };

        this.ratio = Math.min((this.dimensions.height*ratio)/this.max.y, (this.dimensions.width*ratio)/this.max.x, 1);
        let parent = this;
        this.points = this.points.map(function(item){return {x:item.x*parent.ratio, y:item.y*parent.ratio}});

        this.draw = SVG('container-structure-design-svg').size(this.max.x*this.ratio, this.max.y*this.ratio);
        this.polyline2 = this.draw.polyline([[this.points[0].x+2, this.points[0].y+2]]);
        this.polyline2.fill('none');
        this.polyline2.stroke({ color: '#747BFE', width: 4, linecap: 'round', linejoin: 'round'});
        this.polyline = this.draw.polyline([[this.points[0].x, this.points[0].y]]);
        this.polyline.fill('none');
        this.polyline.stroke({ color: '#75aaff', width: 4, linecap: 'round', linejoin: 'round'});


        for(let i = 2; i < this.points.length+1; i++){
            this.polyline2.animate(50, '>').plot(this.points.slice(0, i).map(function(item){return [item.x+2, item.y+2]}));
            this.polyline.animate(50, '>').plot(this.points.slice(0, i).map(function(item){return [item.x, item.y]}));
        }

        this.getCircles(true);
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions(){
        this.points = [
            {x: 9, y: 71}, {x: 54, y: 10}, {x: 611, y: 10}, {x: 655, y: 71}, {x: 655, y: 939}, {x:611, y: 990},
            {x: 425, y: 990}, {x: 425, y: 952}, {x: 241, y: 952}, {x: 241, y: 990}, {x: 55, y: 990}, {x: 9, y: 939},
            {x: 9, y: 71}
        ];
        let ratio = 0.8;

        this.dimensions = {
            height:document.getElementById("structure-design-maindiv").clientHeight,
            width:document.getElementById("structure-design-maindiv").clientWidth
        };

        this.ratio = Math.min((this.dimensions.height*ratio)/this.max.y, (this.dimensions.width*ratio)/this.max.x, 1);
        this.draw.size(this.max.x*this.ratio, this.max.y*this.ratio);
        let parent = this;
        this.points = this.points.map(function(item){return {x:item.x*parent.ratio, y:item.y*parent.ratio}});
        this.polyline2.plot(this.points.map(function(item){return [item.x+2, item.y+2]}));
        this.polyline.plot(this.points.map(function(item){return [item.x, item.y]}));

        this.getCircles();
    }

    selectPlaceTubes(){
        this.setState({toggle: "tubes"});
    }

    selectPlaceLiquids(){
        this.setState({toggle: "liquids"});
    }

    render(){
        return(
            <div id="structure-design-maindiv" className="structure-design-maindiv">
                ok lol
                <div id={"container-structure-design-svg"} className={"container-structure-design-svg"}></div>
                <button onClick={this.selectPlaceTubes} className={(this.state.toggle === "tubes" ? "selected " : "") +"btnghost container-structure-design-left-button"}>Place tubes</button >
                <button
                    onClick={this.props.container instanceof LiquidContainer ? this.selectPlaceLiquids : ""}
                    className={
                        (this.state.toggle === "liquids" ? "selected " : "") +
                        (this.props.container instanceof LiquidContainer ? "" : "disabled ") +
                        "btnghost container-structure-design-right-button"}>
                    Place liquids
                </button>
            </div>
        );
    }
}