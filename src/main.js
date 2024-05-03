#!/usr/bin/env node
/**
 * main.js
 * created by 2024/5/2
 * @file 项目入口
 * @author  Yiero
 * */

const yargs = require( 'yargs/yargs' );
const { hideBin } = require( 'yargs/helpers' );
const { chain } = require( 'radash' );
const { parseInstall } = require( './modules/parseInstall/parseInstall' );

( () => {
	let yargsController = yargs( hideBin( process.argv ) );
	
	const yargsParser = chain(
		parseInstall,
		parseInstall,
	);
	yargsController = yargsParser( yargsController );
	
	yargsController.parse();
} )();
