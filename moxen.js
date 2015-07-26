			function _(){
				var integer = 7;
				alert(integer);
			}
			/*(function(){
				var message = '<div class="message"><div class="head">Head</div><div class="body">Body</div></div>';
				O_o('body').append(message);
				var ms = document.getElementsByClassName('message');
				O_o('.message').last().pinok();
			})();*/
			(function(){
				function awesome(){
					var app = {};
					var message = '<div class="message"><div class="head">Head</div><div class="body">Body</div></div>';
					app.report = function(){
						O_o('body').append(message);
						return app;
					}

					return app;
				}
				//awesome().report();
			})();
			(function(){
				/* this code emmidiatly envoked function make tabs be active */
				O_o('tabbox').hide();
				O_o('tabbox').parent().each(function(the){
					O_o(the).find('tabbox').first().show();
					O_o(the).find('tab').first().addClass('active');
				});
				O_o('tab').click(function(){
					var i = O_o(this).ind('tab');
					O_o(this).parent('block').find('tab').removeClass('active');
					O_o(this).addClass('active');
					O_o(this).parent('block').find('tabbox').hide();
					O_o(this).parent('block').find('tabbox').some(i).show();
				});
			})();
			(function(){
				O_o('.item').click(function(){
					//O_o(this).parent('div').find('.active').removeClass('active');
					//O_o(this).addClass('active');
				});
			})();

			
				route = function(){
					var com = '';
					if(window.location.hash===''){
						window.location.hash = '#' + O_o("page").first().attr('id') +':tabs-ox'
					}
					var hash = window.location.hash;
					if(hash.indexOf(':') > 0){
						com = hash.substr(hash.indexOf(':')+1, hash.length);
						hash = hash.substr(1, hash.indexOf(':')-1);
					}else{
						hash = hash.substring(1, hash.length);
						//console.log(O_o('#'+hash).find('.subnav').find('.active'));
					}
					
					var need = O_o('#'+hash).ind() + 1;
					//console.log(O_o('.nav').find('a').getNodes());
					O_o('.nav').find('.active').removeClass('active');
					O_o('.nav').find('a').some(need).addClass('active');
						
					O_o('page').hide();
					O_o('#'+hash).show();
					

					if(com.length > 0){
						O_o('comp').hide();
						if(O_o('#'+com).getNodes() !== null){
							O_o('#'+com).show();
						}else{
							console.info('Here is no component with such id: ' + com)
						}
						try{
							O_o('#'+hash).find('.subnav').find('.active').removeClass('active');
							O_o('#'+hash).find('.item').some(O_o('#'+com).ind()).addClass('active');
						}catch(er){
							console.info('There are no subnavigation at this page!');
						}
					}else{
						//O_o('comp').first().show();
					}
				}
				O_o(window).event('hashchange', route);
				try{
					//com = O_o('#'+hash).find('comp').first().attr('id');
					//console.log(O_o('#'+hash).find('comp').first().attr('id'));
				}catch(err){
					//com = '';
				}
				route();
				O_o('.nav').find('a').click(function(e){
					//e.preventDefault();
					//O_o(this).parent().parent('.nav').find('.active').removeClass('active'); 
					//O_o(this).addClass('active');
				});
			O_o('trigger').click(function(){
				O_o('disabler').show();
			})
			O_o('close').click(function(){
				O_o(this).parent('disabler').hide();
			})
			
			
			//(function(){
				O_o('.draggable').event('mousedown', function(e){
					e.preventDefault();
					var elem = O_o(this), 
							   OX = O_o(this).parent('.drag-track').left(), 
							   OY = O_o(this).parent('.drag-track').top(),
							   SX = e.clientX - OX - elem.left(),
							   SY = e.clientY - OY - elem.top();
							   X = OX - SX;
							   Y = OY - SX;
							   elem.css('position', 'absolute');
					O_o(document).event('mousemove', onMouseMove);
					O_o(document).event('mouseup', onMouseUp);
					function onMouseMove(ev){
						elem.css('left', ev.clientX - OX - SX + 'px');
						elem.css('top', ev.clientY - OY - SY + 'px');
					}
					function onMouseUp(){
						O_o(document).done('mousemove', onMouseMove);
					}
				});
				
			O_o('.remover').click(function(){
				var parent = O_o(this).parent('mobil'),
				i = parent.getNodes().clientHeight,
				quatro = i / 3;
				parent.css('overflow','hidden');
				function liquidate(height, time, step){
					setTimeout(function(){
						height -= step;
						parent.css('height', height+'px');
						//console.log(height);
						if(height > quatro){
							liquidate(height, time, step);
						}else if(height <= quatro && height >= 1){
							liquidate(height, 100, 1);
						}else if(height < 1){
							//parent.hide();
							return;
						}
					}, time);
				};
				liquidate(i, 24, 3);
			});
			
			
			
			(/* preloader driver */
			function(){O_o('#preload').click(function(){
				var l = 1, e = 80;
				o = O_o(this).parent().find('.gum').first();
				v = O_o(this).parent().find('.gum-track').first().width();
				console.log('S ' + v);
				preload(l, o, v, e);
			})
				
			function preload(i, el, w, t){
				i*=1.2;
				i = i<w ? i : w;
				console.log(i);
				setTimeout(function(){
					el.css('width', i+'px');
					el.html(i > 70 ? parseInt(i / w * 100)+'%' : '...');
					if(i !== w){
						t*=0.98;
						preload(i, el, w, t);
					}
				}, t);
			}})();
				
			