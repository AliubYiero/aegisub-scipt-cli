/**
 * initCommand.js
 * created by 2024/5/3
 * @file 初始化指令
 * @author  Yiero
 * */

/**
 * 初始化指令.
 *
 * 1. 将命令名设置成 'aeg'
 * 2. 关闭报错后输出帮助信息
 * 3. 设置 \[设置缩写\]: h -> help; v -> version
 *
 * @param {import('yargs').Argv<T>} yargsController
 * @return {import('yargs').Argv<T>}
 * */
function initCommand( yargsController ) {
	return yargsController
		.alias( 'h', 'help' )
		.alias( 'v', 'version' )
		.scriptName( 'aeg' )
		.showHelpOnFail( false );
}

module.exports = {
	initCommand,
};
