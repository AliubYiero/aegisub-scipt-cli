/**
 * 解析 help 指令
 *
 * @return {boolean} 指令是否被执行
 * */
function parseHelp( command ) {
	if ( argv.h || argv.help || !command ) {
		const helpString = `
Command List:
-h -help                         | 输出帮助指令
list                             | 输出当前 Aegisub 的脚本列表
install   <filepath>             | 将脚本拷贝到 Aegisub 脚本目录下
uninstall <filePath>             | 将 Aegisub 脚本删除 (无法通过 load 指令再加载)
load                             | (未实现) 加载 install 过的脚本
unload    <filepath>             | (未实现) 将 Aegisub 脚本卸载 (可以通过 load 指令再加载)
config                           | show aegisub.exe file dir path
config <aegisub-exe-dir-path>    | set aegisub.exe file dir path
`;
		console.log( helpString );
		return true;
	}
	return false;
}
