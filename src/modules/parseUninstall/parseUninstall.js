/**
 * parseUninstall.js
 * created by 2024/5/3
 * @file 卸载脚本
 * @author  Yiero
 * */

const { getTargetFilePath } = require( '../../utils/getTargetFilePath' );
const {
	parseHotKey,
	readHotKeyFile, writeHotKeyFile,
} = require( '../parseHotKey/parseHotKey' );
const { parseTerminalPath } = require( '../../utils/parseTerminalPath' );
const { watchFile, removeSync, readJSONSync } = require( 'fs-extra' );
const { basename } = require( 'path' );

/**
 * 删除热键配置
 *
 * @param {string} filename
 * */
const deleteHotKeyConfig = ( filename ) => {
	// 读取配置文件
	const hotkeyConfig = readHotKeyFile();
	
	// 遍历配置, 查看是否存在对应的配置
	let isExist = false;
	for ( const scriptName in hotkeyConfig['Default'] ) {
		// 如果存在, 则将其删除
		if ( scriptName.includes( `/${ basename( filename, '.lua' ) }/` ) ) {
			isExist = true;
			delete hotkeyConfig['Default'][scriptName];
			break;
		}
	}
	
	// 如果配置存在, 重新写入新配置
	if ( isExist ) {
		writeHotKeyFile( hotkeyConfig );
	}
};

/**
 * 进行消息提示
 *
 * @param {string} baseName
 * */
const logSuccessMeg = ( baseName ) => {
	console.log( `脚本 ${ baseName.cyan.underline } 已卸载.` );
};

/**
 * 卸载脚本
 *
 * @param {import('yargs').Argv<T>} yargsController
 * @return {import('yargs').Argv<T>}
 * */
const parseUninstall = ( yargsController ) => {
	return yargsController.command(
		[ 'ui', 'uninstall', 'remove' ],
		'从 Aegisub 脚本列表中删除脚本',
		( yargs ) => {
			const filename = yargs.argv._[1];
			return yargs
				.check( ( argv ) => {
					const parmas = argv._;
					if ( parmas.length > 2 ) {
						throw new Error( '请输入正确路径...' );
					}
					return true;
				}, false )
				.positional( 'filename', {
					type: 'string',
					default: filename,
				} );
		},
		( argv ) => {
			const filename = getTargetFilePath( argv.filename );
			
			// 删除文件
			removeSync( filename );
			
			// 删除热键配置
			deleteHotKeyConfig( filename );
			
			// 输出日志
			logSuccessMeg( filename );
		},
	);
};

module.exports = {
	parseUninstall,
};
