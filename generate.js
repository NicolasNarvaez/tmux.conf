let fs = require('fs'),
	genconf

fs.readFile('./tmux.genconf', 'utf8', (e,f) => {
	genconf = f
	write()
})

function unbind(commands) {
	if(Array.isArray(commands))
		return commands.map(c => unbind(c))


	return (commands.match(/ -\w*n\w* /))?
		commands.replace(/^\s*bind(-key)*( -\w*)* ((\w+-*)+).*/gim, 'unbind$2 $3')
		: ''
}

function nest_command(commands, exclude_last = false) {
	commands = (Array.isArray(commands))? commands:commands.split(/\r?\n/)
	// console.log('nesting', commands)
	commands = commands.filter( c => (c!='' && !c.match(/^#/))  )
	return commands.map( (c,i) =>
		'\t' + c + (
			( !exclude_last || (exclude_last && i != commands.length-1) )?
			' \\; \\' : '') )
		.join('\n')
}

function write() {
	let file = genconf,
		sections,
		out = ''

	//split sections by #$ tags, then subsplit those in lines
	//and remove empty lines on each
	sections = file.split('#$').filter(c => c.length)
		.map(s => s.split(/\r*?\n/gi).filter(l => l.length) )
		//then convert array to map
		.reduce((o, v, i) => {
			o[ v[0] ] = v
			v.splice(0,1)
			return o
		}, {})


	//set prefix
	out += `unbind ${sections['nest-bind-altern']} \n`
	out += `set -g prefix ${sections['nest-bind-default']} \n`

	//add globals
	out += sections.global.join('\n') + '\n'

	//add nesting
	out += `bind -n ${sections['nest-bind']} \\\n`
	out += nest_command(
		sections['nest-bind-setup']
			.concat(sections['nest'],
			[`send-keys ${sections['unnest-bind']}`],
			[`set -g prefix ${sections['nest-bind-default']}`]
		), true) + '\n'

	out += `bind -n ${sections['unnest-bind']} \\\n`
	out += nest_command(
		sections['unnest-bind-setup']
			.concat(unbind(sections['nest']),
			[`send-keys ${sections['nest-bind']} `],
			[`set -g prefix ${sections['nest-bind-altern']}`]
		), true) + '\n'

	console.log('generated file:', out)
	fs.writeFile("./tmux.conf", out,
		e => {if(e) console.log('error writing file',e)
			else console.log('all ok')})
}
