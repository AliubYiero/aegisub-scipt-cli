/**
 * @todo 解析 help 指令
 *
 * @param {import('yargs').Argv<T>} yargsController
 * @return {import('yargs').Argv<T>}
 * */
function parseHelp( yargsController ) {
	return yargsController;
	// 	return yargsController.epilogue( `aeg [command]
	//
	// Commands:
	//   aeg install / aeg i <filepath> 将脚本拷贝到 Aegisub 脚本目录下
	//
	// Options:
	//   --version  输出当前版本号
	//   --help     输出帮助菜单
	// ` );
}

module.exports = {
	parseHelp,
};
