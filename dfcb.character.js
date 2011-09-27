/**
 * @author phated
 */

dojo.declare('dfcb.character', null, {
	profession : null,
	targetLevel : null,
	currentLevel : null,
	strength : ['Strength', 'attribute', 25, 100, 5],
    endurance : ['Endurance', 'attribute', 25, 100, 5],
    agility : ['Agility', 'attribute', 25, 100, 5],
    accuracy : ['Accuracy', 'attribute', 25, 100, 5],
    critical : ['Critical Hit', 'attribute', 25, 100, 5],
    reloading : ['Reloading', 'attribute', 25, 100, 5],
    melee : ['Melee', 'proficiency', 5, 110, 5],
    pistol : ['Pistol', 'proficiency', 5, 110, 5],
    rifle : ['Rifle', 'proficiency', 0, 110, 5],
    shotgun : ['Shotgun', 'proficiency', 0, 110, 5],
    machinegun : ['Machine Gun', 'proficiency', 0, 110, 5],
    explosive : ['Explosive', 'proficiency', 0, 110, 5],
    weapon_1_accuracy : ['Accuracy', 'weapon_1', 0, 8, 1],
    weapon_1_reloading : ['Reloading', 'weapon_1', 0, 8, 1],
    weapon_1_critical_hit : ['Critical Hit', 'weapon_1', 0, 8, 1],
    weapon_2_accuracy : ['Accuracy', 'weapon_2', 0, 8, 1],
    weapon_2_reloading : ['Reloading', 'weapon_2', 0, 8, 1],
    weapon_2_critical_hit : ['Critical Hit', 'weapon_2', 0, 8, 1],
    weapon_3_accuracy : ['Accuracy', 'weapon_3', 0, 8, 1],
    weapon_3_reloading : ['Reloading', 'weapon_3', 0, 8, 1],
    weapon_3_critical_hit : ['Critical Hit', 'weapon_3', 0, 8, 1],
    armour_agility : ['Agility', 'armour', 0, 24, 1],
    armour_endurance : ['Endurance', 'armour', 0, 24, 1]
})
