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
const { parseHelp } = require( './modules/parseHelp/parseHelp' );
const { initCommand } = require( './modules/initCommand/initCommand' );
const { parseUninstall } = require( './modules/parseUninstall/parseUninstall' );

( () => {
	let yargsController = yargs( hideBin( process.argv ) );
	
	const yargsParser = chain(
		initCommand,
		parseHelp,
		parseInstall,
		parseUninstall,
	);
	yargsController = yargsParser( yargsController );
	
	yargsController.parse();
} )();
