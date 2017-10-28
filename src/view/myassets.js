/*
__/\\\________/\\\_____/\\\\\\\\\_____/\\\\\\\\\\\__/\\\________/\\\__/\\\\\\\\\\\\\\\_
 _\/\\\_______\/\\\___/\\\\\\\\\\\\\__\/////\\\///__\/\\\_______\/\\\_\/\\\///////////__
  _\/\\\_______\/\\\__/\\\/////////\\\_____\/\\\_____\//\\\______/\\\__\/\\\_____________
   _\/\\\\\\\\\\\\\\\_\/\\\_______\/\\\_____\/\\\______\//\\\____/\\\___\/\\\\\\\\\\\_____
    _\/\\\/////////\\\_\/\\\\\\\\\\\\\\\_____\/\\\_______\//\\\__/\\\____\/\\\///////______
     _\/\\\_______\/\\\_\/\\\/////////\\\_____\/\\\________\//\\\/\\\_____\/\\\_____________
      _\/\\\_______\/\\\_\/\\\_______\/\\\_____\/\\\_________\//\\\\\______\/\\\_____________
       _\/\\\_______\/\\\_\/\\\_______\/\\\__/\\\\\\\\\\\______\//\\\_______\/\\\\\\\\\\\\\\\_
        _\///________\///__\///________\///__\///////////________\///________\///////////////__

	HAIVE web application - GUI Version 0.0.2 (OO)
	For Molcure product
	Base sketch by Lisan
	http://molcure.com
	Author: Lysandre Debut
*/

import {HaiveSelector} from "./dashboard/haiveselector";

const HaiveStoreModel = require('../model/dashboard/haivestoremodel').HaiveStoreModel;
const HaiveStoreController = require('../controller/dashboard/haivestorecontroller').HaiveStoreController;

const HaiveTilesModel = require('../model/dashboard/haivetilesmodel').HaiveTilesModel;
const HaiveTilesController = require('../controller/dashboard/haivetilescontroller').HaiveTilesController;

const ProtocolConceptionModel = require('../model/protocolconceptionmodel').ProtocolConceptionModel;
const ProtocolConceptionController = require('../controller/protocolconceptioncontroller').ProtocolConceptionController;

const ProtocolDesignModel = require('../model/protocoldesignmodel').ProtocolDesignModel;
const ProtocolDesignController = require('../controller/protocoldesigncontroller').ProtocolDesignController;

const ContainerSelectModel = require('../model/containerchoice/containermodel').ContainerSelectModel;
const ContainerSelectController = require('../controller/containerchoice/containercontroller').ContainerSelectController;

import { AddLiquids } from '../view/protocolconceptionview';
import { ProtocolDesign } from '../view/protocoldesignview';

import React from 'react';
import { HaiveStore } from '../view/dashboard/haivestoreview';
import { HaiveTiles } from '../view/dashboard/haivetilesview';
import {ContainerSelect} from "./containerchoice/containerview";

const gv = require('../../const/global');

let haiveTilesController = new HaiveTilesController();
let haiveTilesModel = new HaiveTilesModel({controller:haiveTilesController});
let haiveStoreController = new HaiveStoreController({droppedTileFromStore:haiveTilesController.droppedTileFromStore});
let haiveStoreModel = new HaiveStoreModel({controller:haiveStoreController});

let containerSelectController = new ContainerSelectController();
let containerSelectModel = new ContainerSelectModel({controller:containerSelectController});
let containerSelect = <div className="myassetsmaincontent" id={"myassetsmaincontent"}><ContainerSelect model={containerSelectModel}/></div>;

let protocolConceptionController = new ProtocolConceptionController();
let protocolConceptionModel = new ProtocolConceptionModel({controller:protocolConceptionController});
let protocolconception = <div className="myassetsmaincontent" id={"myassetsmaincontentcontainers"}><AddLiquids/></div>;

let protocolDesignController = new ProtocolDesignController();
let protocolDesignModel = new ProtocolDesignModel({controller:protocolDesignController});
let protocoldesign = <div className="myassetsmaincontent" id={"myassetsmaincontent"}><ProtocolDesign/></div>;

let haive = <div className="myassetsmaincontent" id={"myassetsmaincontenthaivess"}>
    <HaiveSelector/>
</div>;


export class MyAssets extends React.Component{
    constructor(props){
        super(props);

        gv.myAssets = this;
        this.setSelectedComponent = this.setSelectedComponent.bind(this);

        this.state={selectedComponent:haive};
    }

    setSelectedComponent(component){
        this.setState({selectedComponent:component});
    }

    setSelected(selected){
        if(selected == 1){
            this.setSelectedComponent(haive);
        }else if(selected == 2){
            this.setSelectedComponent(containerSelect);
        }else if(selected == 3){
            this.setSelectedComponent(protocoldesign);
        }else if(selected == 2.1){
            this.setSelectedComponent(protocolconception);
        }

        for(let i = 1; i < 4; i++){
            document.getElementById('myassetsbarbuttons'+i).classList.remove('myassetsbarbuttonselected');
        }

        document.getElementById('myassetsbarbuttons'+Math.floor(selected)).classList.add('myassetsbarbuttonselected');
    }

    render(){
        return(
            <div id={"maincontent"} className={"maincontent"}>
                <div id={"bar"} className={"myassetsbar"}>
                    <button id="myassetsbarbuttons1" className={"myassetsbarbuttons myassetsbarbuttonselected"} onClick={() => this.setSelected(1)}>HAIVE SELECT</button>
                    <button id="myassetsbarbuttons2" className={"myassetsbarbuttons"} onClick={() => this.setSelected(2)}>CONTAINERS SELECT</button>
                    <button id="myassetsbarbuttons3" className={"myassetsbarbuttons"} onClick={() => this.setSelected(3)}>PROTOCOL EDITOR</button>
                </div>
                {this.state.selectedComponent}
            </div>
        );
    }
}
