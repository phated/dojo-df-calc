(function($){
    $.fn.characterbuilder = function(options) {
        var defaults = {
            'sliders' : {
                /* identifier : [title, category, minimum, maximum, step] */
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
            },
            'professions' : {
                farmer : {
                    name : 'Farmer'
                },
        		scientist : {
                    name : 'Scientist'
                },
    			doctor : {
                    name : 'Doctor'
                },
    			chef : {
                    name : 'Chef'
                },
    			engineer : {
                    name : 'Engineer'
                },
    			boxer : {
                    name : 'Boxer',
                    sliders : {
                        strength : ['Strength', 'attribute', 45, 100, 5],
                        melee : ['Melee', 'proficiency', 15, 100, 5]
                    }
    			},
    			soldier : {
                    name : 'Soldier',
                    sliders : {
                        strength : ['Strength', 'attribute', 30, 100, 5],
                        accuracy : ['Accuracy', 'attribute', 35, 100, 5],
                        endurance : ['Endurance', 'attribute', 35, 100, 5],
                        reloading : ['Reloading', 'attribute', 35, 100, 5],
                        machinegun : ['Machine Gun', 'proficiency', 10, 100, 5]
                    }
    			},                        
    			police : {
                    name : 'Police Officer',
                    sliders : {
                        accuracy : ['Accuracy', 'attribute', 35, 100, 5],
                        reloading : ['Reloading', 'attribute', 30, 100, 5],
                        pistol : ['Pistol', 'proficiency', 15, 100, 5],
                        shotgun : ['Shotgun', 'proficiency', 10, 100, 5]
                    }
    			},
    			fireman : {
                    name : 'Fireman',
                    sliders : {
                        endurance : ['Endurance', 'attribute', 45, 100, 5],
                        melee : ['Melee', 'proficiency', 15, 100, 5]
                    }
    			},
    			athlete : {
                    name : 'Athlete',
                    sliders : {
                        agility : ['Agility', 'attribute', 50, 100, 5]
                    }
    			},
    			teacher : {
                    name : 'Teacher'
    			},
    			priest : {
                    name : 'Priest'
    			},
    			lawyer : {
                    name : 'Lawyer'
    			},
    			accountant : {
                    name : 'Accountant'
    			},
    			journalist : {
                    name : 'Journalist'
    			},
    			actor : {
                    name : 'Actor'
    			},
    			broker : {
                    name : 'Stock Broker'
    			},
    			architect : {
                    name : 'Architect'
    			},
    			entertainer : {
                    name : 'Entertainer'
    			},
    			student : {
                    name : 'Student',
                    sliders : {
                        strength : ['Strength', 'attribute', 26, 100, 5],
                        agility : ['Agility', 'attribute', 27, 100, 5],
                        endurance : ['Endurance', 'attribute', 27, 100, 5]
                    }
    			}
            },
            'tab-indexes' : [1,2,3,4,5]
	    };
        
        var settings = $.extend(defaults, options);  
        
        var container = $(this);
        
        container.data('attribute-min-total', 150);
        container.data('proficiency-min-total', 10);
        container.data('pre-50', 245);
        
        for(var i in settings.sliders) {
            container.data(i, settings.sliders[i][0]);
            container.data(i + '-value', settings.sliders[i][2]);
            container.data(i + '-min', settings.sliders[i][2]);
            container.data(i + '-max', settings.sliders[i][3]);
            container.data(i + '-step', settings.sliders[i][4]);
        };

        return this.each(function(){
    	    init();
		});
        
        function init() {
            container.html(
                '<div id="cb_remaining">' +
                    'Current Level: <span id="cb_current_level">1</span>' +
                    'Stat Points Available: <span id="cb_stat_avail">0</span>' +
                    'Proficiency Points Available: <span id="cb_prof_avail">0</span>' +
                '</div>' +
                '<div id="cb_calculator"></div>'
            );
            $('#cb_calculator').html(
                '<div id="cb_targets"></div>' +
                '<div id="cb_tabs"></div>' +
                '<div id="cb_totals">' +
                    '<div id="totals_header">Totals</div>' +
                '</div>'
            );
            $('#cb_targets').html(
                '<div>Profession:</div>' +
			    '<select id="profession"></select>' +
			    '<div>Target Level:</div>' +
			    '<input type="text" id="target" value="0"></input>'
            );
            for(var i in settings.professions) {
                $('#profession').append(
                    '<option value="' + i + '">' + settings.professions[i].name + '</option>'
                );
            }
			$('#profession').change(function(){setProfession($(this).val())});
            $('#target').bind('input',function(){setTargetLevel()});
            $('#cb_tabs').html(
                '<ul> \
            		<li><a href="#cb_attribute"><span>Attributes</span></a></li> \
        			<li><a href="#cb_proficiency"><span>Proficiencies</span></a></li> \
        			<li><a href="#cb_weapon_1"><span>Weapon 1</span></a></li> \
        			<li><a href="#cb_weapon_2"><span>Weapon 2</span></a></li> \
        			<li><a href="#cb_weapon_3"><span>Weapon 3</span></a></li> \
        			<li><a href="#cb_armour"><span>Armour</span></a></li> \
        		</ul> \
                <div id="cb_attribute" class="cb-tab-container"></div> \
                <div id="cb_proficiency" class="cb-tab-container"></div> \
                <div id="cb_weapon_1" class="cb-tab-container"></div> \
                <div id="cb_weapon_2" class="cb-tab-container"></div> \
                <div id="cb_weapon_3" class="cb-tab-container"></div> \
                <div id="cb_armour" class="cb-tab-container"></div>'
            ).tabs({ 
                cache: true, 
                load: function() {
                    if (settings.tab-indexes.length == 0) return;
                    var index = settings.tab-indexes.shift();
                    this.tabs('load',index);
                }
            });
            for(var i in settings.sliders) {
                $('#cb_' + settings.sliders[i][1]).append(
                    '<div id="' + i + '" class="slider-container"><div class="slider-title"></div><div class="min-value"></div><div class="cb_slider"></div><div class="max-value"></div><img src="minus.png" class="minus" /><img src="plus.png" class="plus" /><div class="current-value"></div></div>'
                );
                if(settings.sliders[i][1] == 'attribute'){
                    $('#cb_totals').append(
                        '<div id="' + i + '-total" class="cb-totals"><div class="totals-title">' + settings.sliders[i][0] + ':</div><div class="cb-total-value"></div></div>'
                    );
                }
            };
            $('.minus').click(function(){
                var id = $(this).parent().attr('id');
                var min = id + '-min';
                var value = id + '-value';
                if(container.data(value) > container.data(min)){
                    container.data(value, container.data(value)-1);
                    $('#' + id + ' .cb_slider').slider('value', container.data(value));
                    $('#' + id + ' div.current-value').html(container.data(value));
                    setTotals();
                }
            });
            $('.plus').click(function(){
                var id = $(this).parent().attr('id');
                var max = id + '-max';
                var value = id + '-value';
                if(container.data(value) < container.data(max)){
                    container.data(value, container.data(value)+1);
                    $('#' + id + ' .cb_slider').slider('value', container.data(value));
                    $('#' + id + ' div.current-value').html(container.data(value));
                    setTotals();
                }
            });
            $('.cb_slider').each(function(i){
                var id = $(this).parent().attr('id');
                var min = id + '-min';
                var max = id + '-max';
                var step = id + '-step';
                var value = id + '-value';
                var total = id + '-total';
                $('#' + id + ' div.slider-title').html(container.data(id));
                $('#' + id + ' div.min-value').html(container.data(min));
                $('#' + id + ' div.max-value').html(container.data(max));
                $('#' + id + ' div.current-value').html(container.data(value));
                setTotals();
                $(this).slider({
                    min: container.data(min),
                    max: container.data(max),
                    step: container.data(step),
                    slide: function(event, ui){
                        container.data(value, +ui.value);
                        $('#' + id + ' div.current-value').html(container.data(value));
                        setTotals();
                    }
                });
            });
        };
        
        function setTotals() {
            var strength_total = container.data('strength-value');
            var endurance_total = container.data('endurance-value') + container.data('armour_endurance-value');
            var agility_total = container.data('agility-value') + container.data('armour_agility-value');
            var accuracy_total = container.data('accuracy-value') + container.data('weapon_1_accuracy-value') + container.data('weapon_2_accuracy-value') + container.data('weapon_3_accuracy-value');
            var critical_total = container.data('critical-value') + container.data('weapon_1_critical_hit-value') + container.data('weapon_2_critical_hit-value') + container.data('weapon_3_critical_hit-value');
            var reloading_total = container.data('reloading-value') + container.data('weapon_1_reloading-value') + container.data('weapon_2_reloading-value') + container.data('weapon_3_reloading-value');
            var attribute_total = strength_total + endurance_total + agility_total + accuracy_total + critical_total + reloading_total;
            var proficiency_total = container.data('melee-value') + container.data('pistol-value') + container.data('rifle-value') + container.data('shotgun-value') + container.data('machinegun-value') +
                                    container.data('explosive-value');
			var mc_total = container.data('weapon_1_accuracy-value') + container.data('weapon_2_accuracy-value') + container.data('weapon_3_accuracy-value') +
							container.data('weapon_1_critical_hit-value') + container.data('weapon_2_critical_hit-value') + container.data('weapon_3_critical_hit-value') +
							container.data('weapon_1_reloading-value') + container.data('weapon_2_reloading-value') + container.data('weapon_3_reloading-value') +
							container.data('armour_endurance-value') + container.data('armour_agility-value');
            container.data('strength-total', strength_total);
            container.data('endurance-total', endurance_total);
            container.data('agility-total', agility_total);
            container.data('accuracy-total', accuracy_total);
            container.data('critical-total', critical_total);
            container.data('reloading-total', reloading_total);
            container.data('attribute-total', attribute_total);
            container.data('proficiency-total', proficiency_total);
			container.data('mc-total', mc_total);
            $('#strength-total div.cb-total-value').html(container.data('strength-total'));
            $('#endurance-total div.cb-total-value').html(container.data('endurance-total'));
            $('#agility-total div.cb-total-value').html(container.data('agility-total'));
            $('#accuracy-total div.cb-total-value').html(container.data('accuracy-total'));
            $('#critical-total div.cb-total-value').html(container.data('critical-total'));
            $('#reloading-total div.cb-total-value').html(container.data('reloading-total'));
            setCurrentLevel();
            if(container.data('target-level')){
                setAvailablePoints();
            }
        };
        
        function setCurrentLevel() {
            if(
                (container.data('attribute-total') - container.data('attribute-min-total') - container.data('pre-50') - container.data('mc-total')) <= 0 &&
                (container.data('proficiency-total') - container.data('proficiency-min-total') - container.data('pre-50')) <= 0
            ){
                if(
                    (container.data('attribute-total') - container.data('attribute-min-total') - container.data('mc-total'))  >= (container.data('proficiency-total') - container.data('proficiency-min-total'))
                ){
                    container.data('current-level', (((container.data('attribute-total') - container.data('attribute-min-total') - container.data('mc-total'))/5) + 1));
                } else {
                    container.data('current-level', (((container.data('proficiency-total') - container.data('proficiency-min-total'))/5) + 1));
                }
            } else {
                if(
                    ((container.data('attribute-total') - container.data('attribute-min-total') - container.data('mc-total') - container.data('pre-50')))  >= ((container.data('proficiency-total') - container.data('proficiency-min-total') - container.data('pre-50'))/2)
                ){
                    container.data('current-level', (((container.data('attribute-total') - container.data('attribute-min-total') - container.data('mc-total') - container.data('pre-50'))) + 50));
                } else {
                    container.data('current-level', (((container.data('proficiency-total') - container.data('proficiency-min-total') - container.data('pre-50'))/2) + 50));
                }
            }
            $('#cb_current_level').html(container.data('current-level'));
        };
        
        function setTargetLevel() {
            container.data('target-level',$('#target').val());
            setAvailablePoints();
        }
        
        function setAvailablePoints() {
            var min_target = 0;
            var max_target = 200;
            var pre_50 = 50;
            if(container.data('target-level') < min_target){
                $('#target').val(min_target);
            } else if(container.data('target-level') > max_target){
                $('#target').val(max_target);
            } else {
                if(container.data('target-level') <= 0){
                    $('#cb_stat_avail').html(0);
                } else if(container.data('target-level') <= pre_50){
                    $('#cb_stat_avail').html((((container.data('target-level') - 1) * 5) + container.data('attribute-min-total')) - container.data('attribute-total') + container.data('mc-total'));
                    $('#cb_prof_avail').html((((container.data('target-level') - 1) * 5) + container.data('proficiency-min-total')) - container.data('proficiency-total'));
                } else {
                    $('#cb_stat_avail').html((((container.data('target-level') - 50) + container.data('pre-50')) + container.data('attribute-min-total')) - container.data('attribute-total') + container.data('mc-total'));
                    $('#cb_prof_avail').html(((((container.data('target-level') - 50) * 2) + container.data('pre-50')) + container.data('proficiency-min-total')) - container.data('proficiency-total'));
                }
            }
        }
		
		function setProfession(profession) {
			for(var i in settings.sliders) {
				container.data(i + '-value', settings.sliders[i][2]);
				container.data(i + '-min', settings.sliders[i][2]);
				if(settings.professions[profession]['sliders']){
					for(var b in settings.professions[profession]['sliders']){
						container.data(b + '-min', settings.professions[profession]['sliders'][b][2]);
						container.data(b + '-value', settings.professions[profession]['sliders'][b][2]);
					}
				}
				var min = i + '-min';
				var value = i + '-value';
				$('#' + i + ' .cb_slider').slider('option', 'min', container.data(min));
				$('#' + i + ' .cb_slider').slider('option', 'value', container.data(min));
				$('#' + i + ' .min-value').html(container.data(min));
				$('#' + i + ' div.current-value').html(container.data(min));
				setMinimums();
				setTotals();
			};
		}
		
		function setMinimums() {
			container.data('attribute-min-total', 0);
			container.data('proficiency-min-total', 0);
			for(var i in settings.sliders) {
				if(settings.sliders[i][1] == 'attribute') {
					container.data('attribute-min-total', container.data('attribute-min-total') + container.data(i + '-min'));
				} else if(settings.sliders[i][1] == 'proficiency') {
					container.data('proficiency-min-total', container.data('proficiency-min-total') + container.data(i + '-min'));
				}
			}
		}
    };
})(jQuery);