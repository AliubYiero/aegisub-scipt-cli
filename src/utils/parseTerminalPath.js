const { isAbsolute, resolve } = require( 'path' );

/**
 * 解析输入的路径, 将输入地址前面加上输入命令的终端地址
 * @param {string} resolvePath
 * @return {string}
 * */
function parseTerminalPath( resolvePath ) {
	if ( isAbsolute( resolvePath ) ) {
		return resolvePath;
	}
	return resolve( process.cwd(), resolvePath );
}

module.exports = {
	parseTerminalPath,
};
