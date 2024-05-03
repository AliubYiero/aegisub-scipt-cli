const { parseTerminalPath } = require( '../../utils/parseTerminalPath' );
const { join, basename } = require( 'path' );
const { copySync, watchFile, readJSONSync } = require( 'fs-extra' );
const colors = require( 'colors' );
const { getTargetFilePath } = require( '../../utils/getTargetFilePath' );
const { readTargetFileName } = require( '../../utils/readTargetFileName' );
const { parseHotKey } = require( '../parseHotKey/parseHotKey' );

/**
 * @param {import('yargs').Argv<T>} yargsController
 * @return {import('yargs').Argv<T>}
 * */
const parseInstall = ( yargsController ) => {
	/**
	 * 复制文件到其他路径下
	 *
	 * @param {import('yargs').Arguments<T>} argv
	 * */
	const copyFile = ( argv ) => {
		// 获取原始路径
		const filePath = parseTerminalPath( argv.filepath );
		// 获取目标路径
		const targetPath = readTargetFileName( argv );
		
		// 将文件从原始路径拷贝到目标路径
		copySync( filePath, targetPath );
		
		// 提示
		console.log( `
${ `[${ new Date().toLocaleTimeString() }]`.grey } ${ '插件成功安装:'.cyan }
    from ${ '('.grey } ${ filePath.blue.underline } ${ ')'.grey }
    to   ${ '('.grey } ${ targetPath.blue.underline } ${ ')'.grey }
` );
	};
	
	return yargsController.command( [ 'i', 'install' ],
		'将脚本拷贝到 Aegisub 脚本目录下',
		( yargs ) => {
			const filepath = yargs.argv._[1];
			return yargs
				.check( ( argv ) => {
					const parmas = argv._;
					if ( parmas.length > 2 ) {
						throw new Error( '请输入正确路径...' );
					}
					return true;
				}, false )
				.positional( 'filepath', {
					type: 'string',
					default: filepath,
				} );
			
		},
		( argv ) => {
			// 写入文件
			copyFile( argv );
			
			// 如果有热键更改, 进行热键添加
			// 只支持 Shift / Alt / Ctrl + 数字/26位字母 (不支持符号, 小键盘数字...)
			// 只支持, 将脚本名写到 script_name 的脚本; 不支持有子菜单的脚本
			if (
				( argv.hotkey || argv.k )
				&& ( typeof argv.hotkey === 'string' || typeof argv.k === 'string' )
			) {
				parseHotKey( argv );
			}
			
			// 如果有监听, 进行文件监听
			if ( argv.watch || argv.w ) {
				console.log( '开始监听文件更改...'.cyan );
				
				// 获取原始路径
				const filePath = parsePath( argv.filepath );
				
				// 每 1s 查询一次文件更改, 如果文件更改, 则进行复制
				watchFile( filePath,
					{ interval: 1000 },
					() => {copyFile( argv );} );
			}
		} );
};

module.exports = {
	parseInstall,
};
