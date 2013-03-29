/** Init GitCommands **/
function init() { GitCommands.init() }

/** GitCommands Namespace **/
var GitCommands = (function() {
	
	/* globals */
	var el = {
	
			list : document.getElementById('list'),
			search : document.getElementById('search'),
			visual : document.getElementById('visual'),
			dropdown: document.getElementById('dropdown')
			
		},
	template = {
		
			li : '<tr id="{id}" class="li">' +
							'<td>{cmd}</td>' +
							'<td>{desc}</td>' +
						'</tr>',
			li_label : '<tr class="label">' +
									'<td>{cmd}</td>' +
									'<td>{desc}</td>' +
								'</tr>',
			trip : '<div class="arrow {config}"></div>'
			
		},
	li = [ 
			{cmd: 'git init',
			desc: 'set up local git repository in current directory',
			config: ['box posC']},
			{cmd: 'git add &lt;file&gt;',
			desc: 'add file to staging area',
			config: ['right small posA']},
			{cmd: 'git commit -m "Message in present tense"',
			desc: 'commit to the changes you\'ve added to stage',
			config: ['right small posB']},
			{cmd: 'git remote add origin &lt;remote Git file&gt;',
			desc: 'add remote repository to push to',
			config: ['left large posA']},				
			{cmd: 'git push',
			desc: 'push commited changes to remote location (for first push append " -u origin master")',
			config: ['right small posC']},
			{cmd: 'git pull origin &lt;branch&gt;',
			desc: 'pull branch files and replace with files in working directory',
			config: ['left small posC', 'left medium posA']},
			{cmd: 'git config credential.helper cache',
			desc: 'cache password for the next 15 minutes',
			config: ['box posC']},
			{cmd: 'git checkout &lt;branch&gt;',
			desc: 'replace current working directory files with &lt;branch&gt; files',
			config: ['left medium posA']},
			{cmd: 'git branch &lt;name&gt;',
			desc: 'creates branch with &lt;name&gt;',
			config: ['box posC']},
			{cmd: 'git checkout -b &lt;name&gt;',
			desc: 'create branch and check it out',
			config: ['box posC', 'left medium posA']},
			{cmd: 'git push -u origin &lt;branch&gt;',
			desc: 'add local branch to remote repository',
			config: ['box posC']}
		],
	listLen = li.length
	
	/* functions */
	var init = function() {
	
			displayli()
			initEvents()
			
		},
	initEvents = function() {
	
			el.search.onkeyup = function(event) { 
				var q = this.value					
				q = q.replace(/</g, '&lt;')
				q = q.replace(/>/g, '&gt;')
				displayli(q) 
				
				/*
				var toggle = (q) ? 'inherit' : 'none'
				el.clear.style.display = toggle;
				*/
				
				el.visual.innerHTML = ''
			}
			
			el.list.onclick = function(event) {
				var element = event.target.parentElement				
				if (element.getAttribute('class') === 'li')
					drawTrip( element.getAttribute('id') )
			}
			
			el.visual.onclick = function(event) {
				el.visual.style.display = 'none'
				el.dropdown.style.display = 'inherit'
			}
			
			el.dropdown.onclick = function(event) {
				el.visual.style.display = 'inherit'
				el.dropdown.style.display = 'none'
			}
		
		},				
	displayli = function(q) {
			var i = 0, text				
			el.list.innerHTML = template.li_label.supplant({cmd: 'command', desc: 'description'})
			
			for( ; i<listLen; i++) {
				text = li[i].cmd + ' ' + li[i].desc
				li[i].id = i
				
				if (q)
					( text.search(q) >= 0 ) ? el.list.innerHTML += template.li.supplant(li[i]) : null
				else
					el.list.innerHTML += template.li.supplant(li[i])	
			}		
		},
	drawTrip = function(index) {
			var i = 0, len = li[index].config.length
			el.visual.innerHTML = ''
			
			for( ; i<len; i++) {
				el.visual.innerHTML += template.trip.supplant({config : li[index].config[i]})
			}
			
		}
		
	return { init : init }
	
})()

/** Supplant **/
if (!String.prototype.supplant) {
	String.prototype.supplant = function (o) {
		return this.replace(/{([^{}]*)}/g,
			function (a, b) {
				var r = o[b]
				return typeof r === 'string' || typeof r === 'number' ? r : a
			}
		)
	}
}

/* init */
init()