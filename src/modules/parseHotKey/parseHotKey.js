const { parseTerminalPath } = require( '../../utils/parseTerminalPath' );
const { basename, join } = require( 'path' );
const { readJSONSync, writeJSONSync } = require( 'fs-extra' );
const globalConfig = require( '../../../config/globalConfig.json' );
const { readFileSync } = require( 'fs' );
const colors = require( 'colors' );

/**
 * 读取 Aegisub 热键配置文件
 *
 * @return {Object}
 * */
const readHotKeyFile = () => {
	/** @type {string} */
	const hotkeyFilePath = join( globalConfig.aegisubPath, 'hotkey.json' );
	
	// 读取热键文件
	const hotkeyConfig = readJSONSync( hotkeyFilePath );
	
	return hotkeyConfig;
};

/**
 * 读取输入的文件名(不含后缀)
 *
 * @param {string} filename
 * @return {string}
 * */
const readInputFileName = ( filename ) => {
	return basename( filename, '.lua' );
};

/**
 * 读取输入的文件的 script_name
 *
 * @param {string} filename
 * @return {string}
 * */
const readScriptName = ( filename ) => {
	// 获取源文件地址
	const filePath = parseTerminalPath( filename );
	
	// 读取源文件
	const fileContent = readFileSync( filePath, {
		encoding: 'utf8',
		flag: 'r',
	} );
	
	// 获取 script_name 所在的行
	const scriptNameLine = fileContent
		.split( '\n' )
		.find( line => line.match( 'script_name' ) );
	
	// 解析出 script_name 的内容
	const scriptNameMatchList = scriptNameLine.match( /(?<=").*(?=")|(?<=').*(?=')/ );
	if ( !scriptNameMatchList[0] ) {
		throw new Error( '获取不到源文件的 script_name' );
	}
	
	// 返回 script_name
	const scriptName = scriptNameMatchList[0];
	return scriptName;
};

/**
 * 解析输入的配置项字符串.
 *
 * Rules:
 * 1. 首字母大写, 默认顺序为(但是不影响使用):  Ctrl / Alt / Shift
 * 2. 使用 - 连接
 * 3. 字母大写
 *
 * @param {string} originHotKey
 * */
const parseHotKeyString = ( originHotKey ) => {
	let hotkeyList = originHotKey.split( /[+\-]/ );
	
	// 将热键全部首字母大写
	hotkeyList = hotkeyList.map( hotkey => hotkey.slice( 0, 1 ).toUpperCase() + hotkey.slice( 1 ).toLowerCase() );
	
	// 将热键进行排序
	hotkeyList.sort( ( a, b ) => {
		const order = [ 'Ctrl', 'Alt', 'Shift' ];
		const indexA = order.indexOf( a );
		const indexB = order.indexOf( b );
		
		if ( indexA === -1 ) {
			return 1;
		}
		if ( indexB === -1 ) {
			return -1;
		}
		return indexA - indexB;
	} );
	
	// 将热键进行连接
	return hotkeyList.join( '-' );
};

/**
 * 更新配置对象
 * */
const updateHotKeyConfig = ( options ) => {
	const {
		hotkeyConfig,
		baseName,
		scriptName,
		hotKeyString,
	} = options;
	
	hotkeyConfig['Default'][`automation/lua/${ baseName }/${ scriptName }`] = [ hotKeyString ];
	
	return hotkeyConfig;
};

/**
 * 将新配置写入 Hotkey 配置文件中
 * */
const writeHotKeyFile = ( updatedHotKeyConfig ) => {
	/** @type {string} */
	const hotkeyFilePath = join( globalConfig.aegisubPath, 'hotkey.json' );
	
	writeJSONSync( hotkeyFilePath, updatedHotKeyConfig, {
		spaces: '\t',
	} );
};

/**
 * 进行消息提示
 *
 * @param {string} hotKey
 * @param {string} baseName
 * @param {string} scriptName
 * */
const logSuccessMeg = ( hotKey, baseName, scriptName ) => {
	console.log( `热键 ${ hotKey.cyan } 已成功绑定到脚本 ${ `${ baseName }/${ scriptName }`.cyan } 上.` );
};

/**
 * 解析热键配置
 *
 * @param {import('yargs').Arguments<T>} argv
 * */
const parseHotKey = ( argv ) => {
	// 读取 Aegisub 热键配置文件
	const hotkeyConfig = readHotKeyFile();
	// 读取输入的文件名(不含后缀)
	const baseName = readInputFileName( argv.filepath );
	// 读取输入的文件的 script_name
	const scriptName = readScriptName( argv.filepath );
	// 解析输入的配置项字符串.
	const hotKeyString = parseHotKeyString( argv.hotkey || argv.k );
	// 更新配置对象
	const updatedHotKeyConfig = updateHotKeyConfig( {
		hotkeyConfig,
		baseName,
		scriptName,
		hotKeyString,
	} );
	// 写入新配置到配置文件中
	writeHotKeyFile( updatedHotKeyConfig );
	// 输出日志
	logSuccessMeg( hotKeyString, baseName, scriptName );
};

module.exports = {
	parseHotKey,
	readHotKeyFile,
	writeHotKeyFile,
};
