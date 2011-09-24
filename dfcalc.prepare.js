var indexesToLoad = [1,2,3,4,5];

var loadNextTab = function($) {
	if (indexesToLoad.length == 0) return;
	var index = indexesToLoad.shift();
	$("#tabs").tabs("load",index);
};

$(document).ready(function($) {
	$("#tabs").tabs({ cache: true, load: loadNextTab });
	$('#remaining').load('remaining.html');
	$('#totals').load('totals.html');
	$('#targets').load('targets.html');
	$('#message').load('message.html');
	/* attribute sliders */
	$("#strSlider").slider({ min: 25, max: 100, step: 5, slide: function(event, ui) { $("#strength").val(ui.value);value_changed('strength'); } });
	$("#endSlider").slider({ min: 25, max: 100, step: 5, slide: function(event, ui) { $("#endurance").val(ui.value);value_changed('endurance'); } });
	$("#agiSlider").slider({ min: 25, max: 100, step: 5, slide: function(event, ui) { $("#agility").val(ui.value);value_changed('agility'); } });
	$("#accSlider").slider({ min: 25, max: 100, step: 5, slide: function(event, ui) { $("#accuracy").val(ui.value);value_changed('accuracy'); } });
	$("#critSlider").slider({ min: 25, max: 100, step: 5, slide: function(event, ui) { $("#critical_hit").val(ui.value);value_changed('critical_hit'); } });
	$("#relSlider").slider({ min: 25, max: 100, step: 5, slide: function(event, ui) { $("#reloading").val(ui.value);value_changed('reloading'); } });
	/* proficiency sliders */
	$("#melSlider").slider({ min: 5, max: 100, step: 5, slide: function(event, ui) { $("#melee").val(ui.value);value_changed('melee'); } });
	$("#pisSlider").slider({ min: 5, max: 100, step: 5, slide: function(event, ui) { $("#pistols").val(ui.value);value_changed('pistols'); } });
	$("#rifSlider").slider({ min: 0, max: 100, step: 5, slide: function(event, ui) { $("#rifles").val(ui.value);value_changed('rifles'); } });
	$("#sgSlider").slider({ min: 0, max: 100, step: 5, slide: function(event, ui) { $("#shotguns").val(ui.value);value_changed('shotguns'); } });
	$("#mgSlider").slider({ min: 0, max: 100, step: 5, slide: function(event, ui) { $("#machine_guns").val(ui.value);value_changed('machine_guns'); } });
	$("#explSlider").slider({ min: 0, max: 100, step: 5, slide: function(event, ui) { $("#explosives").val(ui.value);value_changed('explosives'); } });
	/* weapon1 sliders */
	$("#wpn1AccSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { $("#wpn1Acc").val(ui.value);update_totals(); } });
	$("#wpn1RelSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { $("#wpn1Rel").val(ui.value);update_totals(); } });
	$("#wpn1CritSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { $("#wpn1Crit").val(ui.value);update_totals(); } });
	/* weapon2 sliders */
	$("#wpn2AccSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { $("#wpn2Acc").val(ui.value);update_totals(); } });
	$("#wpn2RelSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { $("#wpn2Rel").val(ui.value);update_totals(); } });
	$("#wpn2CritSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { $("#wpn2Crit").val(ui.value);update_totals(); } });
	/* weapon3 sliders */
	$("#wpn3AccSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { $("#wpn3Acc").val(ui.value);update_totals(); } });
	$("#wpn3RelSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { $("#wpn3Rel").val(ui.value);update_totals(); } });
	$("#wpn3CritSlider").slider({ min: 0, max: 8, step: 1, slide: function(event, ui) { $("#wpn3Crit").val(ui.value);update_totals(); } });
	/* armour sliders */
	$("#armAgiSlider").slider({ min: 0, max: 24, step: 1, slide: function(event, ui) { $("#armAgi").val(ui.value);update_totals(); } });
	$("#armEndSlider").slider({ min: 0, max: 24, step: 1, slide: function(event, ui) { $("#armEnd").val(ui.value);update_totals(); } });
});