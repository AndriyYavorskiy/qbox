function O_o(sel){
	var self = {}, el;
	if(typeof sel == 'object'){
		el = sel;
	}else{
		if(sel.substring(0,1) == '#'){
			sel = sel.substring(1,sel.length);
			el = document.getElementById(sel);
		}else if(sel.substring(0,1) == '.'){
			sel = sel.substring(1,sel.length);
			el = document.getElementsByClassName(sel);
		}else{
			el = document.getElementsByTagName(sel);
		}
	}
	self.pinok = function(speed){
		speed = speed || 32;
		var i = 0, direct = true;
		var zoom = function(){
			setTimeout(function(){
				if(el.length){
					for(var u = 0; u < el.length; u++){
						el[u].style.boxShadow = '0 0 '+i*2+'px '+i/2+'px #f55555';
					}
				}else{
					el.style.boxShadow = '0 0 '+i*2+'px '+i/2+'px #f55555';
				}
				if(direct){
					i++;
					if(i<7){
						zoom();
					}else{
						direct = false;
						zoom();
					}
				}else{
					i--;
					if(i>0){
						zoom();
					}else{
						direct = true;
						if(el.length){
							for(var u = 0; u < el.length; u++){
								el[u].style.boxShadow = 'none';
							}
						}else{
							el.style.boxShadow = 'none';
							//zoom();
						}
						
					}
				}
			}, speed);
		}
		zoom();
		return self;
	}
	self.addClass = function(cl){
		if(el.length){
			for(var i = 0; i < el.length; i++){
				el[i].setAttribute('class', el[i].getAttribute('class') + ' ' + cl);
			}
		}else{
			el.setAttribute('class', el.getAttribute('class') + ' ' + cl);
		}
		return self;
	}
	self.removeClass = function(cl){
		if(el.length){
			for(var i = el.length-1; i >= 0; i--){
				el[i].setAttribute('class', el[0].getAttribute('class').replace(cl, ''));
			}
		}else{
			el.setAttribute('class', el.getAttribute('class').replace(cl, ''));
		}
		return self;
	}
	self.event = function(ev, cb){
		if(el.length){
			for(var i=0; i<el.length; i++){
				el[i].addEventListener(ev, cb);
			}
		}else{
			el.addEventListener(ev, cb);
		}
		return self;
	}
	self.click = function(cb){
		if(cb){
			if(el.length){
				for(var i=0; i<el.length; i++){
					el[i].addEventListener('click', cb);
				}
			}else{
				el.addEventListener('click', cb);
			}
		}
		return self;
	}
	self.show = function(){
		if(el.length){
			for(var i=0; i<el.length; i++){
				el[i].style.display = 'block';
			}
		}else{
			el.style.display = 'block';
		}
		return self;
	}
	self.hide = function(){
		if(el.length){
			for(var i=0; i<el.length; i++){
				el[i].style.display = 'none';
			}
		}else{
			el.style.display = 'none';
		}
		return self;
	}
	self.find = function(fin){
		ele = el;
		if(typeof fin === 'object'){
			el = fin;
		}else{
			if(fin.substring(0,1) === '.'){
				fin = fin.substring(1,fin.length);
				el = [];
				if(ele.length){
					for(var i = 0; i < ele.length; i++){
						var finded = ele[i].getElementsByClassName(fin);
						for(var u = 0; u < finded.length; u++){
							el.push(finded[u]);
						}
					}
				}else{
					el = ele.getElementsByClassName(fin);
				}
			}else{
				el = [];
				if(ele.length){
					for(var i = 0; i < ele.length; i++){
						var finded = ele[i].getElementsByTagName(fin);
						for(var u = 0; u < finded.length; u++){
							el.push(finded[u]);
						}
					}
				}else{
					el = ele.getElementsByTagName(fin);
				}
			}
		}
		return self;
	},
	self.some = function(n){
		if(!el[0].ind){
			for(var i = 0; i<el.length; i++){
				el[i].ind = i;
			}
			el = el[n];
		}
		return self;
	}
	self.last = function(){
		el = el[el.length-1];
		return self;
	}
	self.first = function(){
		el = el[0];
		return self;
	}
	self.prev = function(){
		var sibs = el.parentNode.children;
		if(!el.ind){
			for(var i = 0; i<sibs.length; i++){
				sibs[i].ind = i;
			}
		}
		if(el.ind === 0){
			el = sibs[sibs.length - 1]
		}else{
			el = sibs[el.ind - 1];
		}
		return self;
	}
	self.next = function(){
		var sibs = el.parentNode.children;
		if(!el.ind){
			for(var i = 0; i<sibs.length; i++){
				sibs[i].ind = i;
			}
		}
		if(el.ind === sibs.length - 1){
			el = sibs[0]
		}else{
			el = sibs[el.ind + 1];
		}
		return self;
	}
	/*self.tagInd = function(){
		console.log(findels);
		var chils = el.parentNode.getElementsByTagName(el.tagName);
		for (var i = 0; i<chils.length; i++){
			chils[i].ind = i;
		}
		
		return el.ind;
	}*/
	self.ind = function(cl){
		var chils;
		if(cl){
			if(cl.substr(0,1) === '.'){
				chils = el.parentNode.getElementsByClassName(cl.substring(1,cl.length));
			}else{
				chils = el.parentNode.getElementsByTagName(el.tagName);
			}
		}else{
			chils = el.parentNode.children;
		}
		for (var i = 0; i<chils.length; i++){
			chils[i].ind = i;
		}
		return el.ind;
	}
	self.html = function(m){
		if(!m){
			var markup = '';
			if(el.length){
				for (var i = 0; i<el.length; i++){
					markup += el[i].innerHTML;
				}
				return markup;
			}else{
				return el.innerHTML;
			}
		}else{
			if(el.length){
				for (var i = 0; i<el.length; i++){
					el[i].innerHTML = m;
				}
			}else{
				el.innerHTML = m;
			}
			return self;
		}
	}
	self.parent = function(pa){
		if(pa){
			getParentByClass = function(){
				el = el.parentNode;
				console.log(el);
				if(el.getAttribute('class').indexOf(pa.substr(1,pa.length)) < 0){
					console.log('Class ' + pa + ' was not found...');
					getParentByClass();
				}
			}
			getParentByTag = function(){
				el = el.parentNode;
				if(el.tagName.toLowerCase() !== pa){
					getParentByTag();
				}
			}
			if(pa.substr(0,1) === '.'){
				getParentByClass();
			}else{
				getParentByTag();
			}
		}else{
			if(el.length){
				var els = [];
				els.push(el[0].parentNode);
				for (var i = 1; i<el.length; i++){
					if(els[els.length - 1] != el[i].parentNode){
						els.push(el[i].parentNode);
					}
				}
				el = els;
			}else{
				el = el.parentNode;
			}
		}
		return self;
	}
	self.append = function(markup){
		if(el.length){
			for(var i = 0; i < el.length; i++){
				el[i].innerHTML = el[i].innerHTML + markup;
			}
		}else{
			el.innerHTML = el.innerHTML + markup;
		}
		return self;
	}
	self.remove = function(){
		try{
		el.parentNode.removeChild(el);
		}catch(er){
			console.error('No more such nodes! ' + er);
		}
		return self;
	}
	self.getNodes = function(){
		return el;
	}
	self.setNodes = function(nodes){
		el = nodes;
		return self;
	};
	self.each = function(cb){
		if(!el.length){
			return self;
		}
		for(var i = 0; i < el.length; i++){
			cb(el[i]);
		}
		return self;
	}
	self.css = function(key, val){
		eval('el.style.' + key + ' = "' + val + '"');
		return self;
	}
	self.hasClass = function(cl){
		return el.className.indexOf(cl);
	}
	self.toggSibsOf = function(cl){
		var all = el[0].parentNode.children;
		for(var i = 0; i < all.length; i++){
			all[1].setAttribute('class',all[1].className.replace(cl,''));
		}
		el.setAttribute('class', el.getAttribute('class') + ' ' + cl);
	}
	self.attr = function(at){
		return el.getAttribute(at);
	};
	return self;
}

function forEach(ay, cb){
	for(var i = 0; i<ay.length; i++){
		cb(ay[i]);
	}
}
/*
forEach(O_o('tabbox').parent().find('tabbox').parent().getNodes(), function(the){
	O_o(the).find('tabbox').first().show();
});*/
